type ServerMessage = ToxResponse | ToxEvent;

type ToxRequest =
    { "request": "Info" } |
    { "request": "AddFriend", "tox_id": string, "message": string} |
    { "request": "AddFriendNorequest", "tox_id": string } |
    {
        "request": "SendFriendMessage",
        "friend": number,
        "kind": MessageType,
        "message": string
    };

type ToxResponse =
    { "response": "Ok" } |
    { "response": "AddFriendError", "error": AddFriendError } |
    { "response": "SendFriendMessageError", "error": SendFriendMessageError };

type ToxEvent =
    { "event": "ConnectionStatus", "status": ConnectionStatus } |
    { "event": "FriendRequest", "public_key": number[], "message": string} |
    { "event": "FriendMessage", "friend": number, "kind": MessageType, "message": string } |
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
