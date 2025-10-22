import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Data { 'id' : bigint, 'content' : string, 'metadata' : string }
export interface File {
  'content' : Uint8Array | number[],
  'mimeType' : string,
  'uploadedAt' : Time,
}
export type HeaderField = [string, string];
export interface HttpRequest {
  'url' : string,
  'method' : string,
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'certificate_version' : [] | [number],
}
export interface HttpResponse {
  'body' : Uint8Array | number[],
  'headers' : Array<HeaderField>,
  'upgrade' : boolean,
  'streaming_strategy' : [] | [StreamingStrategy],
  'status_code' : number,
}
export interface StreamingCallbackHttpResponse {
  'token' : [] | [StreamingCallbackToken],
  'body' : Uint8Array | number[],
}
export interface StreamingCallbackToken {
  'key' : string,
  'index' : bigint,
  'content_encoding' : string,
}
export type StreamingStrategy = {
    'Callback' : {
      'token' : StreamingCallbackToken,
      'callback' : [Principal, string],
    }
  };
export type Time = bigint;
export interface UserProfile { 'name' : string }
export interface _SERVICE {
  'createData' : ActorMethod<[string, string], bigint>,
  'deleteData' : ActorMethod<[bigint], undefined>,
  'deleteFile' : ActorMethod<[string], undefined>,
  'fileDelete' : ActorMethod<[string], undefined>,
  'fileList' : ActorMethod<[], Array<[string, File]>>,
  'fileUpload' : ActorMethod<
    [string, string, Uint8Array | number[]],
    undefined
  >,
  'getAdminPrincipal' : ActorMethod<[], [] | [Principal]>,
  'getAllData' : ActorMethod<[], Array<Data>>,
  'getData' : ActorMethod<[bigint], [] | [Data]>,
  'getUserProfile' : ActorMethod<[], [] | [UserProfile]>,
  'httpStreamingCallback' : ActorMethod<
    [StreamingCallbackToken],
    StreamingCallbackHttpResponse
  >,
  'http_request' : ActorMethod<[HttpRequest], HttpResponse>,
  'initializeAuth' : ActorMethod<[], undefined>,
  'isCurrentUserAdmin' : ActorMethod<[], boolean>,
  'saveUserProfile' : ActorMethod<[UserProfile], undefined>,
  'transferAdmin' : ActorMethod<[Principal], undefined>,
  'updateData' : ActorMethod<[bigint, string, string], undefined>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
