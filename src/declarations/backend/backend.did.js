export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const File = IDL.Record({
    'content' : IDL.Vec(IDL.Nat8),
    'mimeType' : IDL.Text,
    'uploadedAt' : Time,
  });
  const Data = IDL.Record({
    'id' : IDL.Nat,
    'content' : IDL.Text,
    'metadata' : IDL.Text,
  });
  const UserProfile = IDL.Record({ 'name' : IDL.Text });
  const StreamingCallbackToken = IDL.Record({
    'key' : IDL.Text,
    'index' : IDL.Nat,
    'content_encoding' : IDL.Text,
  });
  const StreamingCallbackHttpResponse = IDL.Record({
    'token' : IDL.Opt(StreamingCallbackToken),
    'body' : IDL.Vec(IDL.Nat8),
  });
  const HeaderField = IDL.Tuple(IDL.Text, IDL.Text);
  const HttpRequest = IDL.Record({
    'url' : IDL.Text,
    'method' : IDL.Text,
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'certificate_version' : IDL.Opt(IDL.Nat16),
  });
  const StreamingStrategy = IDL.Variant({
    'Callback' : IDL.Record({
      'token' : StreamingCallbackToken,
      'callback' : IDL.Func(
          [StreamingCallbackToken],
          [StreamingCallbackHttpResponse],
          [],
        ),
    }),
  });
  const HttpResponse = IDL.Record({
    'body' : IDL.Vec(IDL.Nat8),
    'headers' : IDL.Vec(HeaderField),
    'upgrade' : IDL.Bool,
    'streaming_strategy' : IDL.Opt(StreamingStrategy),
    'status_code' : IDL.Nat16,
  });
  return IDL.Service({
    'createData' : IDL.Func([IDL.Text, IDL.Text], [IDL.Nat], []),
    'deleteData' : IDL.Func([IDL.Nat], [], []),
    'deleteFile' : IDL.Func([IDL.Text], [], []),
    'fileDelete' : IDL.Func([IDL.Text], [], []),
    'fileList' : IDL.Func([], [IDL.Vec(IDL.Tuple(IDL.Text, File))], ['query']),
    'fileUpload' : IDL.Func([IDL.Text, IDL.Text, IDL.Vec(IDL.Nat8)], [], []),
    'getAdminPrincipal' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getAllData' : IDL.Func([], [IDL.Vec(Data)], ['query']),
    'getData' : IDL.Func([IDL.Nat], [IDL.Opt(Data)], ['query']),
    'getUserProfile' : IDL.Func([], [IDL.Opt(UserProfile)], ['query']),
    'httpStreamingCallback' : IDL.Func(
        [StreamingCallbackToken],
        [StreamingCallbackHttpResponse],
        ['query'],
      ),
    'http_request' : IDL.Func([HttpRequest], [HttpResponse], ['query']),
    'initializeAuth' : IDL.Func([], [], []),
    'isCurrentUserAdmin' : IDL.Func([], [IDL.Bool], ['query']),
    'saveUserProfile' : IDL.Func([UserProfile], [], []),
    'transferAdmin' : IDL.Func([IDL.Principal], [], []),
    'updateData' : IDL.Func([IDL.Nat, IDL.Text, IDL.Text], [], []),
  });
};
export const init = ({ IDL }) => { return []; };
