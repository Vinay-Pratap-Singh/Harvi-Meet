import { useEffect } from "react";
import { useStreamContext } from "../context/Stream";
import { useSocketContext } from "../context/Socket";
import { useParams } from "react-router-dom";

interface IProps {
  currentPeerID: string;
}

const Video = ({ currentPeerID }: IProps) => {
  const { allStreams, setAllStreams } = useStreamContext();
  const socket = useSocketContext();
  const { roomid: currentRoomID } = useParams();

  const handleBtnClick = () => {
    const newData = { ...allStreams };
    const isPlaying = !newData[currentPeerID]?.isPlaying;
    newData[currentPeerID].isPlaying = isPlaying;
    setAllStreams({ ...newData });

    // sending this data to all the other users
    socket?.emit("changeVideoPlayingOption", {
      peerID: currentPeerID,
      isPlaying,
      currentRoomID,
    });
  };

  useEffect(() => {
    if (!socket) return;
    const handleVideoUpdate = ({
      peerID,
      isPlaying,
    }: {
      peerID: string;
      isPlaying: boolean;
    }) => {
      const newData = { ...allStreams };
      newData[peerID].isPlaying = isPlaying;
      setAllStreams({ ...newData });
    };
    socket.on("updateVideoOption", handleVideoUpdate);

    return () => {
      socket.off("updateVideoOption", handleVideoUpdate);
    };
  }, [socket, allStreams, setAllStreams]);

  return (
    <button
      title="Show / hide video"
      onClick={handleBtnClick}
      className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
    >
      {allStreams[currentPeerID]?.isPlaying ? (
        <img
          className="w-6 h-6"
          src="/assets/footer/showVideo.svg"
          alt="show video"
        />
      ) : (
        <img
          className="w-6 h-6"
          src="/assets/footer/hiddenVideo.svg"
          alt="hide video"
        />
      )}
    </button>
  );
};

export default Video;
