import { useNavigate } from "react-router-dom";
import { useStreamContext } from "../context/Stream";
import { useUserContext } from "../context/User";

const EndCall = () => {
  const navigate = useNavigate();
  const { setAllStreams } = useStreamContext();
  const { setAllMessages, setAllUsersData, setUserData, userData } =
    useUserContext();

  const handleEndCall = () => {
    setAllStreams({});
    setAllMessages([]);
    setAllUsersData({});
    setUserData({
      isMeetingOrganiser: false,
      name: userData?.name,
      peerID: "",
      roomID: "",
    });
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
