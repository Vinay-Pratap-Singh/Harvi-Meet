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
