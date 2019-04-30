export type ServerMessage = ToxResponse | ToxEvent;

export type ToxRequest =
    Requests.Info |
    Requests.AddFriend |
    Requests.AddFriendNorequest |
    Requests.SendFriendMessage |
    Requests.NewConference |
    Requests.DeleteConference |
    Requests.ConferencePeerCount |
    Requests.GetPeerName |
    Requests.GetPeerPublicKey |
    Requests.IsOwnPeerNumber |
    Requests.InviteToConference |
    Requests.JoinConference |
    Requests.SendConferenceMessage |
    Requests.GetConferenceTitle |
    Requests.SetConferenceTitle |
    Requests.GetChatList |
    Requests.GetConferenceType;

export type ToxResponse =
    Responses.Ok |
    Responses.Info |
    Responses.AddFriendError |
    Responses.SendFriendMessageError;

export type ToxEvent =
    Events.ConnectionStatus |
    Events.FriendRequest |
    Events.FriendMessage |
    Events.FriendName |
    Events.FriendStatusMessage |
    Events.FriendStatus |
    Events.FriendConnectionStatus |
    Events.FriendTyping |
    Events.FriendReadReceipt;

export type ConnectionStatus = "None" | "Tcp" | "Udp";
export type UserStatus = "None" | "Away" | "Busy";
export type MessageType = "Normal" | "Action";
export type ConferenceType = "Text" | "Av";

export interface Friend {
    "number": number,
    "public_key": string,
    "name": string,
    "status": UserStatus,
    "status_message": string,
    "last_online": number,
}

export namespace Requests {
    export interface Request {
        "request": string,
    }

    export interface Info extends Request {
        "request": "Info",
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

    export interface NewConference extends Request {
        "request": "NewConference",
    }

    export interface DeleteConference extends Request {
        "request": "DeleteConference",
        "conference": number,
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

    export interface GetChatList extends Request {
        "request": "GetChatList",
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
        "friends": Friend[],
    }

    export interface AddFriendError extends Response {
        "response": "AddFriendError",
        "error": Errors.AddFriendError
    }

    export interface SendFriendMessageError extends Response {
        "response": "SendFriendMessageError",
        "error": Errors.SendFriendMessageError
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
