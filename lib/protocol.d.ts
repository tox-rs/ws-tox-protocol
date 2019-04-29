export type ServerMessage = ToxResponse | ToxEvent;

export type ToxRequest =
    Requests.Info |
    Requests.AddFriend |
    Requests.AddFriendNorequest |
    Requests.SendFriendMessage;

export type ToxResponse =
    Responses.Ok |
    Responses.Info |
    Responses.AddFriendError |
    Responses.SendFriendMessage;

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

    export interface SendFriendMessage extends Response {
        "response": "SendFriendMessageError",
        "error": Errors.SendFriendMessageError
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
}
