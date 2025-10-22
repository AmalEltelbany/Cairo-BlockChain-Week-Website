import AdminSystem "auth-single-user/management";
import Map "mo:base/OrderedMap";
import Nat "mo:base/Nat";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import FileStorage "file-storage/file-storage";
import Blob "mo:base/Blob";
import Time "mo:base/Time";
import Trie "mo:base/Trie";

persistent actor {

  // -----------------------
  // Admin / Auth
  // -----------------------
  let adminState = AdminSystem.initState();

  public shared ({ caller }) func initializeAuth() : async () {
    AdminSystem.initializeAuth(adminState, caller);
  };

  public query ({ caller }) func isCurrentUserAdmin() : async Bool {
    AdminSystem.isCurrentUserAdmin(adminState, caller);
  };

  public query func getAdminPrincipal() : async ?Principal {
    AdminSystem.getAdminPrincipal(adminState);
  };

  public shared ({ caller }) func transferAdmin(newAdmin : Principal) : async () {
    AdminSystem.transferAdmin(adminState, caller, newAdmin);
  };

  // -----------------------
  // User Profiles
  // -----------------------
  public type UserProfile = { name : Text };

  // LEGACY stable vars (re-added to satisfy upgrade compatibility)
  var _greeting : Text = "Hello";
  var profiles : Trie.Trie<Text, UserProfile> = Trie.empty();

  // helper for legacy Trie keying by caller principal as Text
  func keyOf(p : Principal) : Trie.Key<Text> {
    let t = Principal.toText(p);
    { key = t; hash = Text.hash(t) };
  };

  // New structure (ordered map keyed by Principal)
  transient let principalMap = Map.Make<Principal>(Principal.compare);
  var userProfiles = principalMap.empty<UserProfile>();

  public query ({ caller }) func getUserProfile() : async ?UserProfile {
    switch (principalMap.get(userProfiles, caller)) {
      case (?u) ?u;
      case null Trie.get(profiles, keyOf(caller), Text.equal);
    }
  };

  public shared ({ caller }) func saveUserProfile(profile : UserProfile) : async () {
    // write to new structure
    userProfiles := principalMap.put(userProfiles, caller, profile);
    // keep legacy Trie in sync (so older frontends remain fine)
    let (t, _) = Trie.put(profiles, keyOf(caller), Text.equal, profile);
    profiles := t;
  };

  // -----------------------
  // Example Data Model (admin-gated)
  // -----------------------
  type Data = { id : Nat; content : Text; metadata : Text };

  transient let dataMap = Map.Make<Nat>(Nat.compare);
  var data = dataMap.empty<Data>();
  var nextId : Nat = 0;

  public shared ({ caller }) func createData(content : Text, metadata : Text) : async Nat {
    if (not AdminSystem.isCurrentUserAdmin(adminState, caller)) Debug.trap("Unauthorized: Only admin can create data");
    let id = nextId; nextId += 1;
    data := dataMap.put(data, id, { id; content; metadata });
    id
  };

  public shared ({ caller }) func updateData(id : Nat, content : Text, metadata : Text) : async () {
    if (not AdminSystem.isCurrentUserAdmin(adminState, caller)) Debug.trap("Unauthorized: Only admin can update data");
    switch (dataMap.get(data, id)) {
      case null { Debug.trap("Not found") };
      case (?_) { data := dataMap.put(data, id, { id; content; metadata }) };
    };
  };

  public shared ({ caller }) func deleteData(id : Nat) : async () {
    if (not AdminSystem.isCurrentUserAdmin(adminState, caller)) Debug.trap("Unauthorized: Only admin can delete data");
    var rebuilt = dataMap.empty<Data>();
    for ((k, v) in dataMap.entries(data)) { if (k != id) { rebuilt := dataMap.put(rebuilt, k, v) } };
    data := rebuilt;
  };

  public query ({ caller }) func getData(id : Nat) : async ?Data {
    if (not AdminSystem.isCurrentUserAdmin(adminState, caller)) Debug.trap("Unauthorized: Only admin can view data");
    dataMap.get(data, id)
  };

  public query ({ caller }) func getAllData() : async [Data] {
    if (not AdminSystem.isCurrentUserAdmin(adminState, caller)) Debug.trap("Unauthorized: Only admin can view data");
    Iter.toArray(dataMap.vals(data))
  };

  // -----------------------
  // File Storage (freeze/thaw for upgrades)
  // -----------------------
  // Persistable snapshot (stable type)
  var filesStable : [(Text, FileStorage.File)] = [];
  // Non-stable map used at runtime
  transient var storage : FileStorage.Map = FileStorage.thaw(filesStable, 128);

  system func preupgrade() { filesStable := FileStorage.freeze(storage) };
  system func postupgrade() { storage := FileStorage.thaw(filesStable, 128) };

  public query func fileList() : async [(Text, FileStorage.File)] {
    FileStorage.entries(storage)
  };

  public func fileUpload(path : Text, mimeType : Text, content : Blob) : async () {
    FileStorage.put(storage, path, { content; mimeType; uploadedAt = Time.now() })
  };

  public func fileDelete(path : Text) : async () { ignore FileStorage.delete(storage, path) };
  // Back-compat alias if old UI called `deleteFile`
  public func deleteFile(path : Text) : async () { ignore FileStorage.delete(storage, path) };

  // -----------------------
  // Minimal HTTP (optional)
  // -----------------------
  type HeaderField = (Text, Text);
  type StreamingCallbackToken = { key : Text; index : Nat; content_encoding : Text };
  type StreamingStrategy = { #Callback : { token : StreamingCallbackToken; callback : shared (StreamingCallbackToken) -> async StreamingCallbackHttpResponse } };
  type HttpRequest = { method : Text; url : Text; headers : [HeaderField]; body : Blob; certificate_version : ?Nat16 };
  type HttpResponse = { status_code : Nat16; headers : [HeaderField]; body : Blob; streaming_strategy : ?StreamingStrategy; upgrade : Bool };
  type StreamingCallbackHttpResponse = { body : Blob; token : ?StreamingCallbackToken };

  public query func http_request(req : HttpRequest) : async HttpResponse {
    let key = req.url; // store & fetch with matching keys like "/logo.png"
    switch (FileStorage.get(storage, key)) {
      case (?f) { { status_code = 200; headers = [("Content-Type", f.mimeType)]; body = f.content; streaming_strategy = null; upgrade = false } };
      case (null) { { status_code = 404; headers = [("Content-Type", "text/plain")]; body = Text.encodeUtf8("Not Found: " # key); streaming_strategy = null; upgrade = false } };
    }
  };

  public query func httpStreamingCallback(_t : StreamingCallbackToken) : async StreamingCallbackHttpResponse {
    { body = Blob.fromArray([]); token = null }
  };
}
