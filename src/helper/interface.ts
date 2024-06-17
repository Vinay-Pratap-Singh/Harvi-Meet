// interface for each emoji data
export interface IEmojiData {
  emoji: string;
  id: string;
  randomFontSize: number;
  randomBottom: number;
  horizontalMovementDirection: string;
  horizontalMove: number;
  animationTime: number;
}

// interface for stream data
export interface IStreamData {
  peerID: string;
  stream: MediaStream;
  isMuted: boolean;
  isPlaying: boolean;
}

// interface for user data
export interface IUserData {
  name: string;
  isMeetingOrganiser: boolean;
  peerID: string;
  roomID: string;
}

// for all joined user data
interface IAllUserData {
  peerID: string;
  name: string;
  isMeetingOrganiser: boolean;
}

export interface IRoomData {
  [peerID: string]: IAllUserData;
}

export interface IJoinedUsersData {
  [roomID: string]: IRoomData;
}

export interface IMessage {
  message: string;
  senderName: string;
}

// for user data context
export interface IUserContextData {
  userData: IUserData;
  allUsersData: IRoomData;
  allMessages: IMessage[];
  setAllMessages: React.Dispatch<React.SetStateAction<IMessage[]>>;
  setUserData: React.Dispatch<React.SetStateAction<IUserData>>;
  setAllUsersData: React.Dispatch<React.SetStateAction<IRoomData>>;
  pinnedUserIndex: number | null;
  setPinnedUserIndex: React.Dispatch<React.SetStateAction<number | null>>;
}
