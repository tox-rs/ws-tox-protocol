use serde::{Serialize, Deserialize};
use base64::STANDARD;
use base64_serde::base64_serde_type;

use std::convert::TryFrom;

base64_serde_type!(Base64, STANDARD);

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

    GetConnectionStatus,
    GetAddress,
    GetNospam,
    SetNospam { nospam: String },
    GetPublicKey,
    SetName { name: String },
    GetName,
    SetStatusMessage { message: String },
    GetStatusMessage,
    SetStatus { status: UserStatus },
    GetStatus,
    FriendByPublicKey { public_key: String },
    FriendExists { friend: u32 },
    GetFriendPublicKey { friend: u32 },
    GetFriendLastOnline { friend: u32 },
    GetFriendName { friend: u32 },
    GetFriendStatusMessage { friend: u32 },
    GetFriendStatus { friend: u32 },
    GetFriendConnectionStatus { friend: u32 },

    NewConference,
    DeleteConference { conference: u32 },
    ConferencePeerCount { conference: u32, },
    GetPeerName { conference: u32, peer: u32 },
    GetPeerPublicKey { conference: u32, peer: u32 },
    IsOwnPeerNumber { conference: u32, peer_number: u32 },
    InviteToConference { friend: u32, conference: u32 },
    JoinConference { friend: u32, cookie: Vec<u8> },
    SendConferenceMessage { conference: u32, kind: MessageType, message: String },
    GetConferenceTitle { conference: u32, },
    SetConferenceTitle { conference: u32, title: String },
    GetChatList,
    GetConferenceType { conference: u32 },
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(tag = "response")]
pub enum Response {
    Ok,
    MessageSent {
        message_id: u32,
    },
    Info {
        tox_id: String,
        name: String,
        status: UserStatus,
        status_message: String,
        friends: Vec<Friend>
    },

    ConnectionStatus { status: ConnectionStatus },
    Address { address: String },
    Nospam { nospam: String },
    PublicKey { public_key: String },
    Name { name: String },
    StatusMessage { status: String },
    Status { status: UserStatus },
    Friend { friend: u32 },
    FriendExists { exists: bool },
    LastOnline { last_online: u64 },

    Conference { conference: u32 },
    ConferencePeerCount { count: u32 },
    ConferencePeerName { name: String },
    ConferencePeerPublicKey { public_key: String },
    IsOwnPeerNumber { is_own: bool, },
    ConferenceTitle { title: String, },
    ChatList { list: Vec<u32> },
    ConferenceType { kind: ConferenceType },

    AddFriendError { error: AddFriendError },
    SendFriendMessageError { error: SendFriendMessageError },
    FriendNotFoundError,
    ConferenceInviteError { error: ConferenceInviteError },
    ConferenceJoinError { error: ConferenceJoinError },
    ConferencePeerQueryError { error: ConferencePeerQueryError },
    ConferenceSendError { error: ConferenceSendError },
    ConferenceTitleError { error: ConferenceTitleError },
}

#[derive(Serialize, Deserialize, Clone, Debug)]
#[serde(tag = "event")]
pub enum Event {
    ConnectionStatus { status: ConnectionStatus },
    FriendRequest { public_key: [u8; 32], message: String },
    FriendMessage { friend: u32, kind: MessageType, message: String },
    FriendName { friend: u32, name: String },
    FriendStatusMessage { friend: u32, status: String },
    FriendStatus { friend: u32, status: UserStatus },
    FriendConnectionStatus { friend: u32, status: ConnectionStatus },
    FriendTyping { friend: u32, is_typing: bool },
    FriendReadReceipt { friend: u32, message_id: u32 },

    ConferenceInvite {
        friend: u32,
        kind: ConferenceType,
        #[serde(with = "Base64")]
        cookie: Vec<u8>,
    },
    ConferenceConnected {
        conference: u32
    },
    ConferenceMessage {
        conference: u32,
        peer: u32,
        kind: MessageType,
        message: String,
    },
    ConferenceTitle {
        conference: u32,
        peer: u32,
        title: String,
    },
    ConferencePeerName {
        conference: u32,
        peer: u32,
        name: String,
    },
    ConferencePeerListChanged {
        conference: u32
    },
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
            E::FriendName(friend, ref name) =>
                Event::FriendName {
                    friend,
                    name: name.clone()
                },
            E::FriendStatusMessage(friend, ref status) =>
                Event::FriendStatusMessage {
                    friend,
                    status: status.clone()
                },
            E::FriendConnectionStatus(friend, status) =>
                Event::FriendConnectionStatus {
                    friend,
                    status: status.into(),
                },
            E::FriendTyping(friend, is_typing) =>
                Event::FriendTyping {
                    friend,
                    is_typing,
                },
            E::FriendReadReceipt { friend, message_id } =>
                Event::FriendReadReceipt {
                    friend,
                    message_id,
                },

            E::ConferenceInvite { friend, kind, ref cookie } =>
                Event::ConferenceInvite {
                    friend,
                    kind: kind.into(),
                    cookie: cookie.clone().into_bytes(),
                },
            E::ConferenceConnected { conference } =>
                Event::ConferenceConnected {
                    conference
                },
            E::ConferenceMessage { conference, peer, kind, ref message } =>
                Event::ConferenceMessage {
                    conference,
                    peer,
                    kind: kind.into(),
                    message: message.clone()
                },
            E::ConferenceTitle { conference, peer, ref title } =>
                Event::ConferenceTitle {
                    conference,
                    peer,
                    title: title.clone()
                },
            E::ConferencePeerName { conference, peer, ref name } =>
                Event::ConferencePeerName {
                    conference,
                    peer,
                    name: name.clone()
                },
            E::ConferencePeerListChanged { conference } =>
                Event::ConferencePeerListChanged {
                    conference
                },
            _ => return None,
        })
    }
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Friend {
    pub number: u32,
    pub public_key: String,
    pub name: String,
    pub status: UserStatus,
    pub status_message: String,
    pub last_online: u64,
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

#[derive(Serialize, Deserialize, Clone, Debug)]
pub enum UserStatus {
    None,
    Away,
    Busy,
}

#[cfg(not(target_arch = "wasm32"))]
impl From<rstox::core::UserStatus> for UserStatus {
    fn from(status: rstox::core::UserStatus) -> UserStatus {
        use rstox::core::UserStatus as S;

        match status {
            S::None => UserStatus::None,
            S::Away => UserStatus::Away,
            S::Busy => UserStatus::Busy,
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
pub enum ConferenceType {
    Text,
    Av,
}

#[cfg(not(target_arch = "wasm32"))]
impl From<rstox::core::ConferenceType> for ConferenceType {
    fn from(ty: rstox::core::ConferenceType) -> ConferenceType {
        use rstox::core::ConferenceType as C;

        match ty {
            C::Text => ConferenceType::Text,
            C::Av => ConferenceType::Av,
        }
    }
}


#[cfg(not(target_arch = "wasm32"))]
impl From<ConferenceType> for rstox::core::ConferenceType {
    fn from(ty: ConferenceType) -> rstox::core::ConferenceType {
        use rstox::core::ConferenceType as C;

        match ty {
            ConferenceType::Text => C::Text,
            ConferenceType::Av => C::Av,
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

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum ConferenceInviteError {
    ConferenceNotFound,
    FailSend,
    NoConnection
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::ConferenceInviteError> for ConferenceInviteError {
    type Error = ();

    fn try_from(
        error: rstox::core::errors::ConferenceInviteError
    ) -> Result<ConferenceInviteError, ()> {
        use rstox::core::errors::ConferenceInviteError as E;

        match error {
            E::ConferenceNotFound => Ok(ConferenceInviteError::ConferenceNotFound),
            E::FailSend => Ok(ConferenceInviteError::FailSend),
            E::NoConnection => Ok(ConferenceInviteError::NoConnection),
            _ => Err(())
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum ConferenceJoinError {
    InvalidLength,
    WrongType,
    FriendNotFound,
    Duplicate,
    InitFail,
    FailSend,
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::ConferenceJoinError> for ConferenceJoinError {
    type Error = ();

    fn try_from(
        error: rstox::core::errors::ConferenceJoinError
    ) -> Result<ConferenceJoinError, ()> {
        use rstox::core::errors::ConferenceJoinError as E;

        match error {
            E::InvalidLength => Ok(ConferenceJoinError::InvalidLength),
            E::WrongType => Ok(ConferenceJoinError::WrongType),
            E::FriendNotFound => Ok(ConferenceJoinError::FriendNotFound),
            E::Duplicate => Ok(ConferenceJoinError::Duplicate),
            E::InitFail => Ok(ConferenceJoinError::InitFail),
            E::FailSend => Ok(ConferenceJoinError::FailSend),
            _ => Err(())
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum ConferencePeerQueryError {
    ConferenceNotFound,
    PeerNotFound,
    PeerQueryNoConnection,
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::ConferencePeerQueryError> for ConferencePeerQueryError {
    type Error = ();

    fn try_from(
        error: rstox::core::errors::ConferencePeerQueryError
    ) -> Result<ConferencePeerQueryError, ()> {
        use rstox::core::errors::ConferencePeerQueryError as E;

        match error {
            E::ConferenceNotFound => Ok(ConferencePeerQueryError::ConferenceNotFound),
            E::PeerNotFound => Ok(ConferencePeerQueryError::PeerNotFound),
            E::PeerQueryNoConnection => Ok(ConferencePeerQueryError::PeerQueryNoConnection),
            _ => Err(())
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum ConferenceSendError {
    ConferenceNotFound,
    TooLong,
    NoConnection,
    FailSend,
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::ConferenceSendError> for ConferenceSendError {
    type Error = ();

    fn try_from(
        error: rstox::core::errors::ConferenceSendError
    ) -> Result<ConferenceSendError, ()> {
        use rstox::core::errors::ConferenceSendError as E;

        match error {
            E::ConferenceNotFound => Ok(ConferenceSendError::ConferenceNotFound),
            E::TooLong => Ok(ConferenceSendError::TooLong),
            E::NoConnection => Ok(ConferenceSendError::NoConnection),
            E::FailSend => Ok(ConferenceSendError::FailSend),
            _ => Err(())
        }
    }
}

#[derive(Serialize, Deserialize, Clone, Copy, Debug)]
pub enum ConferenceTitleError {
    ConferenceNotFound,
    InvalidLength,
    FailSend,
}

#[cfg(not(target_arch = "wasm32"))]
impl TryFrom<rstox::core::errors::ConferenceTitleError> for ConferenceTitleError {
    type Error = ();

    fn try_from(
        error: rstox::core::errors::ConferenceTitleError
    ) -> Result<ConferenceTitleError, ()> {
        use rstox::core::errors::ConferenceTitleError as E;

        match error {
            E::ConferenceNotFound => Ok(ConferenceTitleError::ConferenceNotFound),
            E::InvalidLength => Ok(ConferenceTitleError::InvalidLength),
            E::FailSend => Ok(ConferenceTitleError::FailSend),
            _ => Err(())
        }
    }
}
