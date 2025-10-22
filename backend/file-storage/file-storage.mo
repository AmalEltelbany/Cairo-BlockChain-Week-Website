// backend/file-storage/file-storage.mo
import HashMap "mo:base/HashMap";
import Iter "mo:base/Iter";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Blob "mo:base/Blob";

module {
  // -------- Types --------
  public type File = {
    content    : Blob;
    mimeType   : Text;
    uploadedAt : Time.Time;
  };

  public type Map = HashMap.HashMap<Text, File>;

  // -------- Constructors --------
  public func empty(initialCapacity : Nat) : Map {
    HashMap.HashMap<Text, File>(initialCapacity, Text.equal, Text.hash)
  };

  // -------- CRUD --------
  public func put(m : Map, name : Text, file : File) : () {
    m.put(name, file);
  };

  public func get(m : Map, name : Text) : ?File {
    m.get(name)
  };

  public func delete(m : Map, name : Text) : ?File {
    m.remove(name)
  };

  public func listNames(m : Map) : [Text] {
    Iter.toArray<Text>(Iter.map<(Text, File), Text>(m.entries(), func (kv) { kv.0 }))
  };

  public func entries(m : Map) : [(Text, File)] {
    Iter.toArray(m.entries())
  };

  // -------- Persistence helpers (stable-friendly) --------
  public func freeze(m : Map) : [(Text, File)] {
    entries(m)
  };

  public func thaw(pairs : [(Text, File)], initialCapacity : Nat) : Map {
    let m = empty(initialCapacity);
    for ((k, v) in pairs.vals()) {
      m.put(k, v);
    };
    m
  };
};
