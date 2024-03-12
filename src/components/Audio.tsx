import { useEffect } from "react";
import { useStreamContext } from "../context/Stream";
import { useSocketContext } from "../context/Socket";
import { useParams } from "react-router-dom";

interface IProps {
  currentPeerID: string;
}

const Audio = ({ currentPeerID }: IProps) => {
  const { allStreams, setAllStreams } = useStreamContext();
  const socket = useSocketContext();
  const { roomid: currentRoomID } = useParams();

  const handleBtnClick = () => {
    const newData = { ...allStreams };

    const isMuted = !newData[currentPeerID]?.isMuted;
    newData[currentPeerID].isMuted = isMuted;
    setAllStreams({ ...newData });

    // sending this data to all the other users
    socket?.emit("changeMicOption", {
      peerID: currentPeerID,
      isMuted,
      currentRoomID,
    });
  };

  useEffect(() => {
    if (!socket) return;
    const handleMicUpdate = ({
      peerID,
      isMuted,
    }: {
      peerID: string;
      isMuted: boolean;
    }) => {
      const newData = { ...allStreams };
      newData[peerID].isMuted = isMuted;
      setAllStreams({ ...newData });
    };
    socket.on("updateMicOption", handleMicUpdate);

    return () => {
      socket.off("updateMicOption", handleMicUpdate);
    };
  }, [socket, allStreams, setAllStreams]);

  return (
    <button
      title="Mute / unmute audio"
      onClick={handleBtnClick}
      className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
    >
      {!allStreams[currentPeerID]?.isMuted ? (
        <img className="w-6 h-6" src="/assets/footer/mute.svg" alt="mute" />
      ) : (
        <img className="w-6 h-6" src="/assets/footer/unmute.svg" alt="unmute" />
      )}
    </button>
  );
};

export default Audio;
