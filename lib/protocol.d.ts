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
    Events.FriendConnectionStatus;

export type ConnectionStatus = "None" | "Tcp" | "Udp";
export type MessageType = "Normal" | "Action";

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

    export interface Info extends Response {
        "response": "Info",
        "name": string,
        "tox_id": string
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
        event: string
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

    export interface FriendConnectionStatus extends Event {
        "event": "FriendConnectionStatus",
        "friend": number,
        "status": ConnectionStatus
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
