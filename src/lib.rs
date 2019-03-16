use serde::{Serialize, Deserialize};

use std::convert::TryFrom;

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum ServerMessage {
    Response(Response),
    Event(Event),
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(tag = "request")]
pub enum Request {
    Info,
    AddFriend { tox_id: String, message: String },
    AddFriendNorequest { tox_id: String },
    SendFriendMessage { friend: u32, kind: MessageType, message: String },
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(tag = "response")]
pub enum Response {
    Ok,
    AddFriendError { error: AddFriendError },
    SendFriendMessageError { error: SendFriendMessageError },
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(tag = "event")]
pub enum Event {
    ConnectionStatus { status: ConnectionStatus },
    FriendRequest { public_key: [u8; 32], message: String },
    FriendMessage { friend: u32, kind: MessageType, message: String },
    FriendConnectionStatus { friend: u32, status: ConnectionStatus },
}

impl Event {
    #[cfg(not(target_arch = "wasm32"))]
    pub fn from_tox_event(event: &rstox::core::Event) -> Option<Self> {
        use rstox::core::Event as E;

        Some(match *event {
            E::ConnectionStatus(c) =>
                Event::ConnectionStatus { status: c.into() },
            E::FriendRequest(ref pk, ref msg) =>
                Event::FriendRequest {
                    public_key: pk.raw.clone(),
                    message: msg.clone()
                },
            E::FriendMessage(friend, kind, ref msg) =>
                Event::FriendMessage {
                    friend,
                    kind: kind.into(),
                    message: msg.clone(),
                },
            E::FriendConnectionStatus(friend, status) =>
                Event::FriendConnectionStatus {
                    friend,
                    status: status.into(),
                },
            _ => return None,
        })
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum ConnectionStatus {
    None,
    Tcp,
    Udp,
}

#[cfg(not(target_arch = "wasm32"))]
impl From<rstox::core::Connection> for ConnectionStatus {
    fn from(conn: rstox::core::Connection) -> ConnectionStatus {
        use rstox::core::Connection as C;

        match conn {
            C::None => ConnectionStatus::None,
            C::Tcp => ConnectionStatus::Tcp,
            C::Udp => ConnectionStatus::Udp,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum MessageType {
    Normal,
    Action,
}

#[cfg(not(target_arch = "wasm32"))]
impl From<rstox::core::MessageType> for MessageType {
    fn from(ty: rstox::core::MessageType) -> MessageType {
        use rstox::core::MessageType as M;

        match ty {
            M::Normal => MessageType::Normal,
            M::Action => MessageType::Action,
        }
    }
}

#[cfg(not(target_arch = "wasm32"))]
impl From<MessageType> for rstox::core::MessageType {
    fn from(ty: MessageType) -> rstox::core::MessageType {
        use rstox::core::MessageType as M;

        match ty {
            MessageType::Normal => M::Normal,
            MessageType::Action => M::Action,
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum AddFriendError {
    TooLong,
    NoMessage,
    OwnKey,
    AlreadySent,
    BadChecksum,
    SetNewNospam,
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::FriendAddError> for AddFriendError {
    type Error = ();

    fn try_from(error: rstox::core::errors::FriendAddError) -> Result<AddFriendError, ()> {
        use rstox::core::errors::FriendAddError as E;

        match error {
            E::TooLong => Ok(AddFriendError::TooLong),
            E::NoMessage => Ok(AddFriendError::NoMessage),
            E::OwnKey => Ok(AddFriendError::OwnKey),
            E::AlreadySent => Ok(AddFriendError::AlreadySent),
            E::BadChecksum => Ok(AddFriendError::BadChecksum),
            E::SetNewNospam => Ok(AddFriendError::SetNewNospam),
            _ => Err(())
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum SendFriendMessageError {
    NotFound,
    NotConnected,
    TooLong,
    Empty,
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::FriendSendMessageError> for SendFriendMessageError {
    type Error = ();

    fn try_from(error: rstox::core::errors::FriendSendMessageError) -> Result<SendFriendMessageError, ()> {
        use rstox::core::errors::FriendSendMessageError as E;

        match error {
            E::NotFound => Ok(SendFriendMessageError::NotFound),
            E::NotConnected => Ok(SendFriendMessageError::NotConnected),
            E::TooLong => Ok(SendFriendMessageError::TooLong),
            E::Empty => Ok(SendFriendMessageError::Empty),
            _ => Err(())
        }
    }
}
