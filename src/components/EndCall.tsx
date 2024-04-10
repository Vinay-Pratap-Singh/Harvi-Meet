import { useNavigate } from "react-router-dom";
import { useStreamContext } from "../context/Stream";
import { useUserContext } from "../context/User";
import Peer from "peerjs";

interface IProps {
  peer: Peer | null;
  mediaStream: MediaStream | null;
  setMediaStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}

const EndCall = ({ peer, mediaStream, setMediaStream }: IProps) => {
  const navigate = useNavigate();
  const { setAllStreams } = useStreamContext();
  const { setAllMessages, setAllUsersData, setUserData, userData } =
    useUserContext();

  const handleEndCall = () => {
    (mediaStream as MediaStream).getTracks().map((track) => track.stop());
    setAllStreams({});
    setAllMessages([]);
    setAllUsersData({});
    setUserData({
      isMeetingOrganiser: false,
      name: userData?.name,
      peerID: "",
      roomID: "",
    });
    setMediaStream(null);
    peer && peer.destroy();
    navigate("/");
  };

  return (
    <button
      title="End Meeting"
      className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-red-500 rounded-full hover:shadow-md"
      onClick={handleEndCall}
    >
      <img
        className="w-6 h-6"
        src="/assets/footer/endCall.svg"
        alt="end call"
      />
    </button>
  );
};

export default EndCall;
