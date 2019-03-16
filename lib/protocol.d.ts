type ServerMessage = ToxResponse | ToxEvent;

type ToxRequest =
    { "request": "Info" } |
    { "request": "AddFriend", "tox_id": String, "message": String} |
    { "request": "AddFriendNorequest", "tox_id": String } |
    {
        "request": "SendFriendMessage",
        "friend": number,
        "kind": MessageType,
        "message": String
    };

type ToxResponse =
    { "response": "Ok" } |
    { "response": "AddFriendError", "error": AddFriendError } |
    { "response": "SendFriendMessageError", "error": SendFriendMessageError };

type ToxEvent =
    { "event": "ConnectionStatus", "status": ConnectionStatus } |
    { "event": "FriendRequest", "public_key": number[], "message": String} |
    { "event": "FriendMessage", "friend": number, "kind": MessageType, "message": String } |
    { "event": "FriendConnectionStatus", "friend": number, "status": ConnectionStatus};

type ConnectionStatus = "None" | "Tcp" | "Udp";
type MessageType = "Normal" | "Action";

type AddFriendError = 
    "TooLong" |
    "NoMessage" |
    "OwnKey" |
    "AlreadySent" |
    "BadChecksum" |
    "SetNewNospam";

type SendFriendMessageError = 
    "NotFound" |
    "NotConnected" |
    "TooLong" |
    "Empty";
