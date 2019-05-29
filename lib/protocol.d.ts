export type ServerMessage = ToxResponse | ToxEvent;

export type ToxRequest =
    Requests.Info |
    Requests.SetInfo |
    Requests.AddFriend |
    Requests.AddFriendNorequest |
    Requests.SendFriendMessage |
    Requests.DeleteFriend |

    Requests.GetConnectionStatus |
    Requests.GetAddress |
    Requests.GetNospam |
    Requests.SetNospam |
    Requests.GetPublicKey |
    Requests.SetName |
    Requests.GetName |
    Requests.SetStatusMessage |
    Requests.GetStatusMessage |
    Requests.SetStatus |
    Requests.GetStatus |
    Requests.FriendByPublicKey |
    Requests.FriendExists |
    Requests.GetFriendPublicKey |
    Requests.GetFriendLastOnline |
    Requests.GetFriendName |
    Requests.GetFriendStatusMessage |
    Requests.GetFriendStatus |
    Requests.GetFriendConnectionStatus |

    Requests.ControlFile |
    Requests.SeekFile |
    Requests.GetFileId |
    Requests.SendFile |
    Requests.SendFileChunk |

    Requests.SendAvatar |

    Requests.NewConference |
    Requests.DeleteConference |
    Requests.GetPeerList |
    Requests.ConferencePeerCount |
    Requests.GetPeerName |
    Requests.GetPeerPublicKey |
    Requests.IsOwnPeerNumber |
    Requests.InviteToConference |
    Requests.JoinConference |
    Requests.SendConferenceMessage |
    Requests.GetConferenceTitle |
    Requests.SetConferenceTitle |
    Requests.GetConferenceList |
    Requests.GetConferenceType;

export type ToxResponse =
    Responses.Ok |
    Responses.Info |
    Responses.MessageSent |

    Responses.ConnectionStatus |
    Responses.Address |
    Responses.Nospam |
    Responses.PublicKey |
    Responses.Name |
    Responses.StatusMessage |
    Responses.Status |
    Responses.Friend |
    Responses.FriendExists |
    Responses.LastOnline |

    Responses.FileId |
    Responses.FileNumber |
    Responses.FileControlError |
    Responses.FileSeekError |
    Responses.FileGetError |
    Responses.FileSendError |
    Responses.FileSendChunkError |

    Responses.Conference |
    Responses.ConferencePeerList |
    Responses.ConferencePeerCount |
    Responses.ConferencePeerName |
    Responses.ConferencePeerPublicKey |
    Responses.IsOwnPeerNumber |
    Responses.ConferenceTitle |
    Responses.ConferenceList |
    Responses.ConferenceType |

    Responses.AddFriendError |
    Responses.SendFriendMessageError |
    Responses.FriendNotFoundError |
    Responses.ConferenceInviteError |
    Responses.ConferenceJoinError |
    Responses.ConferencePeerQueryError |
    Responses.ConferenceSendError |
    Responses.ConferenceTitleError;

export type ToxEvent =
    Events.SecretKey |
    Events.ConnectionStatus |
    Events.FriendRequest |
    Events.FriendMessage |
    Events.FriendName |
    Events.FriendStatusMessage |
    Events.FriendStatus |
    Events.FriendConnectionStatus |
    Events.FriendTyping |
    Events.FriendReadReceipt |
    Events.FileControlReceipt |
    Events.FileChunkRequest |
    Events.FileReceipt |
    Events.FileChunkReceipt |
    Events.ConferenceInvite |
    Events.ConferenceConnected |
    Events.ConferenceMessage |
    Events.ConferenceTitle |
    Events.ConferencePeerName |
    Events.ConferencePeerListChanged;

export type ConnectionStatus = "None" | "Tcp" | "Udp";
export type UserStatus = "None" | "Away" | "Busy";
export type MessageType = "Normal" | "Action";
export type ConferenceType = "Text" | "Av";
export type FileControl = "Resume" | "Pause" | "Cancel";
export type FileKind = "Data" | "Avatar";

export interface FriendInfo {
    "number": number,
    "public_key": string,
    "name": string,
    "status": UserStatus,
    "status_message": string,
    "last_online": number,
}

export interface PeerInfo {
    "number": number,
    "public_key": string,
    "name": string,
}

export interface ConferenceInfo {
    "number": number,
    "kind": ConferenceType,
    "title": string,
    "peers": PeerInfo[]
}

export namespace Requests {
    export interface Request {
        "request": string,
    }

    export interface Info extends Request {
        "request": "Info",
    }

    export interface SetInfo extends Request {
        "request": "SetInfo"
        "nospam": string
        "name": string
        "status": UserStatus
        "status_message": string
        "friends": string[]
    }

    interface GetConnectionStatus extends Request {
        "request": "GetConnectionStatus"
    }

    interface GetAddress extends Request {
        "request": "GetAddress"
    }

    interface GetNospam extends Request {
        "request": "GetNospam"
    }

    interface SetNospam extends Request {
        "request": "SetNospam"
        "nospam": string
    }

    interface GetPublicKey extends Request {
        "request": "GetPublicKey"
    }

    interface SetName extends Request {
        "request": "SetName"
        "name": string
    }

    interface GetName extends Request {
        "request": "GetName"
    }

    interface SetStatusMessage extends Request {
        "request": "SetStatusMessage"
        "message": string
    }

    interface GetStatusMessage extends Request {
        "request": "GetStatusMessage"
    }

    interface SetStatus extends Request {
        "request": "SetStatus"
        "status": UserStatus
    }

    interface GetStatus extends Request {
        "request": "GetStatus"
    }

    interface FriendByPublicKey extends Request {
        "request": "FriendByPublicKey"
        "public_key": string
    }

    interface FriendExists extends Request {
        "request": "FriendExists"
        "friend": number
    }

    interface GetFriendPublicKey extends Request {
        "request": "GetFriendPublicKey"
        "friend": number
    }

    interface GetFriendLastOnline extends Request {
        "request": "GetFriendLastOnline"
        "friend": number
    }

    interface GetFriendName extends Request {
        "request": "GetFriendName"
        "friend": number
    }

    interface GetFriendStatusMessage extends Request {
        "request": "GetFriendStatusMessage"
        "friend": number
    }

    interface GetFriendStatus extends Request {
        "request": "GetFriendStatus"
        "friend": number
    }

    interface GetFriendConnectionStatus extends Request {
        "request": "GetFriendConnectionStatus"
        "friend": number
    }

    export interface AddFriend extends Request {
        "request": "AddFriend",
        "tox_id": string,
        "message": string
    }

    export interface AddFriendNorequest extends Request {
        "request": "AddFriendNorequest",
        "tox_id": string
    }

    export interface SendFriendMessage extends Request {
        "request": "SendFriendMessage",
        "friend": number,
        "kind": MessageType,
        "message": string
    }

    export interface DeleteFriend extends Request {
        "request": "DeleteFriend"
        "friend": number
    }

    export interface ControlFile extends Request {
        "request": "ControlFile"
        "friend": number
        "file_number": number
        "control": FileControl
    }

    export interface SeekFile extends Request {
        "request": "SeekFile"
        "friend": number
        "file_number": number
        "position": number
    }

    export interface GetFileId extends Request {
        "request": "GetFileId"
        "friend": number
        "file_number": number
    }

    export interface SendFile extends Request {
        "request": "SendFile"
        "friend": number
        "kind": FileKind
        "file_size": number
        "file_name": string
    }

    export interface SendFileChunk extends Request {
        "request": "SendFileChunk"
        "friend": number
        "file_number": number
        "position": number
        "data": string
    }

    export interface SendAvatar extends Request {
        "request": "SendAvatar"
        "friend": number
        "file_size": number
        "file_hash": string
    }

    export interface NewConference extends Request {
        "request": "NewConference",
    }

    export interface DeleteConference extends Request {
        "request": "DeleteConference",
        "conference": number,
    }

    export interface GetPeerList extends Request {
        "request": "GetPeerList"
        "conference": number
    }

    export interface ConferencePeerCount extends Request {
        "request": "ConferencePeerCount",
        "conference": number,
    }

    export interface GetPeerName extends Request {
        "request": "GetPeerName",
        "conference": number,
        "peer": number,
    }

    export interface GetPeerPublicKey extends Request {
        "request": "GetPeerPublicKey",
        "conference": number,
        "peer": number,
    }

    export interface IsOwnPeerNumber extends Request {
        "request": "IsOwnPeerNumber",
        "conference": number,
        "peer_number": number,
    }

    export interface InviteToConference extends Request {
        "request": "InviteToConference",
        "friend": number,
        "conference": number,
    }

    export interface JoinConference extends Request {
        "request": "JoinConference",
        "friend": number,
        "cookie": string,
    }

    export interface SendConferenceMessage extends Request {
        "request": "SendConferenceMessage",
        "conference": number,
        "kind": MessageType,
        "message": string,
    }

    export interface GetConferenceTitle extends Request {
        "request": "GetConferenceTitle",
        "conference": number,
    }

    export interface SetConferenceTitle extends Request {
        "request": "SetConferenceTitle",
        "conference": number,
        "title": string,
    }

    export interface GetConferenceList extends Request {
        "request": "GetConferenceList",
    }

    export interface GetConferenceType extends Request {
        "request": "GetConferenceType",
        "conference": number,
    }
}

export namespace Responses {
    export interface Response {
        "response": string,
    }

    export interface Ok extends Response {
        "response": "Ok"
    }

    export interface MessageSent extends Response {
        "response": "MessageSent",
        "message_id": number
    }

    export interface Info extends Response {
        "response": "Info",
        "tox_id": string,
        "name": string,
        "status": UserStatus,
        "status_message": string
        "friends": FriendInfo[],
    }

    export interface ConnectionStatus extends Response {
        "response": "ConnectionStatus"
        "status": ConnectionStatus
    }

    export interface Address extends Response {
        "response": "Address"
        "address": string
    }

    export interface Nospam extends Response {
        "response": "Nospam"
        "nospam": string
    }

    export interface PublicKey extends Response {
        "response": "PublicKey"
        "public_key": string
    }

    export interface Name extends Response {
        "response": "Name"
        "name": string
    }

    export interface StatusMessage extends Response {
        "response": "StatusMessage"
        "status": string
    }

    export interface Status extends Response {
        "response": "Status"
        "status": UserStatus
    }

    export interface Friend extends Response {
        "response": "Friend"
        "friend": number
    }

    export interface FriendExists extends Response {
        "response": "FriendExists"
        "exists": boolean
    }

    export interface LastOnline extends Response {
        "response": "LastOnline"
        "last_online": number
    }

    export interface FileId extends Response {
        "response": "FileId"
        "id": string
    }

    export interface FileNumber extends Response {
        "response": "FileNumber"
        "file_number": number
    }

    export interface FileControlError extends Response {
        "response": "FileControlError"
        "error": FileControlError
    }

    export interface FileSeekError extends Response {
        "response": "FileSeekError"
        "error": FileSeekError
    }

    export interface FileGetError extends Response {
        "response": "FileGetError"
        "error": FileGetError
    }

    export interface FileSendError extends Response {
        "response": "FileSendError"
        "error": FileSendError
    }

    export interface FileSendChunkError extends Response {
        "response": "FileSendChunkError"
        "error": FileSendChunkError
    }

    export interface Conference extends Response {
        "response": "Conference",
        "conference": number
    }

    export interface ConferencePeerList extends Response {
        "response": "ConferencePeerList"
        "peers": PeerInfo[]
    }

    export interface ConferencePeerCount extends Response {
        "response": "ConferencePeerCount",
        "count": number
    }

    export interface ConferencePeerName extends Response {
        "response": "ConferencePeerName",
        "name": string
    }

    export interface ConferencePeerPublicKey extends Response {
        "response": "ConferencePeerPublicKey",
        "public_key": string,
    }

    export interface IsOwnPeerNumber extends Response {
        "response": "IsOwnPeerNumber",
        "is_own": boolean,
    }

    export interface ConferenceTitle extends Response {
        "response": "ConferenceTitle",
        "title": string,
    }

    export interface ConferenceList extends Response {
        "response": "ConferenceList"
        "conferences": ConferenceInfo[]
    }

    export interface ConferenceType extends Response {
        "response": "ConferenceType",
        "kind": ConferenceType
    }

    export interface AddFriendError extends Response {
        "response": "AddFriendError",
        "error": Errors.AddFriendError
    }

    export interface SendFriendMessageError extends Response {
        "response": "SendFriendMessageError",
        "error": Errors.SendFriendMessageError
    }

    export interface FriendNotFoundError extends Response {
        "response": "FriendNotFoundError"
    }

    export interface ConferenceInviteError extends Response {
        "response": "ConferenceInviteError",
        "error": Errors.ConferenceInviteError
    }

    export interface ConferenceJoinError extends Response {
        "response": "ConferenceJoinError",
        "error": Errors.ConferenceJoinError
    }

    export interface ConferencePeerQueryError extends Response {
        "response": "ConferencePeerQueryError",
        "error": Errors.ConferencePeerQueryError
    }

    export interface ConferenceSendError extends Response {
        "response": "ConferenceSendError",
        "error": Errors.ConferenceSendError
    }

    export interface ConferenceTitleError extends Response {
        "response": "ConferenceTitleError",
        "error": Errors.ConferenceTitleError
    }
}

export namespace Events {
    export interface Event {
        "event": string
    }

    export interface SecretKey extends Event {
        "event": "SecretKey"
        "secret_key": string
    }

    export interface ConnectionStatus extends Event {
        "event": "ConnectionStatus",
        "status": ConnectionStatus
    }

    export interface FriendRequest extends Event {
        "event": "FriendRequest",
        "public_key": number[],
        "message": string
    }

    export interface FriendMessage extends Event {
        "event": "FriendMessage",
        "friend": number,
        "kind": MessageType,
        "message": string
    }

    export interface FriendName extends Event {
        "event": "FriendName",
        "friend": number,
        "name": string
    }

    export interface FriendStatusMessage extends Event {
        "event": "FriendStatusMessage",
        "friend": number,
        "status": string
    }

    export interface FriendStatus extends Event {
        "event": "FriendStatus",
        "friend": number,
        "status": UserStatus
    }

    export interface FriendConnectionStatus extends Event {
        "event": "FriendConnectionStatus",
        "friend": number,
        "status": ConnectionStatus
    }

    export interface FriendTyping extends Event {
        "event": "FriendTyping",
        "friend": number,
        "is_typing": boolean
    }

    export interface FriendReadReceipt extends Event {
        "event": "FriendReadReceipt",
        "friend": number,
        "message_id": number
    }

    export interface FileControlReceipt extends Event {
        "event": "FileControlReceipt"
        "friend": number
        "file_number": number
        "control": FileControl
    }

    export interface FileChunkRequest extends Event {
        "event": "FileChunkRequest"
        "friend": number
        "file_number": number
        "position": number
        "length": number
    }

    export interface FileReceipt extends Event {
        "event": "FileReceipt"
        "friend": number
        "file_number": number
        "kind": number
        "file_size": number
        "file_name": string
    }

    export interface FileChunkReceipt extends Event {
        "event": "FileChunkReceipt"
        "friend": number
        "file_number": number
        "position": number
        "data": string
    }

    export interface ConferenceInvite extends Event {
        "event": "ConferenceInvite",
        "friend": number,
        "kind": ConferenceType,
        "cookie": string,
    }

    export interface ConferenceConnected extends Event {
        "event": "ConferenceConnected",
        "conference": number
    }

    export interface ConferenceMessage extends Event {
        "event": "ConferenceMessage",
        "conference": number,
        "peer": number,
        "kind": MessageType,
        "message": string,
    }

    export interface ConferenceTitle extends Event {
        "event": "ConferenceTitle",
        "conference": number,
        "peer": number,
        "title": string,
    }

    export interface ConferencePeerName extends Event {
        "event": "ConferencePeerName",
        "conference": number,
        "peer": number,
        "name": string,
    }

    export interface ConferencePeerListChanged extends Event {
        "event": "ConferencePeerListChanged",
        "conference": number
    }
}

export namespace Errors {
    export type AddFriendError =
        "TooLong" |
        "NoMessage" |
        "OwnKey" |
        "AlreadySent" |
        "BadChecksum" |
        "SetNewNospam";

    export type SendFriendMessageError =
        "NotFound" |
        "NotConnected" |
        "TooLong" |
        "Empty";

    export type ConferenceInviteError =
        "ConferenceNotFound" |
        "FailSend" |
        "NoConnection";

    export type ConferenceJoinError =
        "InvalidLength" |
        "WrongType" |
        "FriendNotFound" |
        "Duplicate" |
        "InitFail" |
        "FailSend";

    export type ConferencePeerQueryError =
        "ConferenceNotFound" |
        "PeerNotFound" |
        "PeerQueryNoConnection";

    export type ConferenceSendError =
        "ConferenceNotFound" |
        "TooLong" |
        "NoConnection" |
        "FailSend";

    export type ConferenceTitleError =
        "ConferenceNotFound" |
        "InvalidLength" |
        "FailSend";
}
