import { useEffect, useState } from "react";
import Audio from "./Audio";
import EmojiPicker from "./EmojiPicker";
import EndCall from "./EndCall";
import Video from "./Video";
import CopyRoomCode from "./CopyRoomCode";
import Peer from "peerjs";

interface IProps {
  currentPeerID: string;
  showSidebar: {
    showUsers: boolean;
    showMessages: boolean;
  };
  setShowSidebar: React.Dispatch<
    React.SetStateAction<{
      showUsers: boolean;
      showMessages: boolean;
    }>
  >;
  peer: Peer | null;
  mediaStream: MediaStream | null;
  setMediaStream: React.Dispatch<React.SetStateAction<MediaStream | null>>;
}

const Footer = ({
  currentPeerID,
  setShowSidebar,
  showSidebar,
  peer,
  mediaStream,
  setMediaStream,
}: IProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDetailsBoxClosed, setIsDetailsBoxClosed] = useState(false);

  // function to format the time
  const formatTime = (time: any) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

  // function to handle sidebar buttons click (user / messages)
  const handleSidebarClicks = (option: string) => {
    switch (option) {
      case "users": {
        if (showSidebar?.showUsers) {
          setShowSidebar({ showMessages: false, showUsers: false });
          break;
        }
        setShowSidebar({ showMessages: false, showUsers: true });
        break;
      }
      case "messages": {
        if (showSidebar?.showMessages) {
          setShowSidebar({ showMessages: false, showUsers: false });
          break;
        }
        setShowSidebar({ showMessages: true, showUsers: false });
        break;
      }
    }
  };

  // for displaying the current time
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex items-center justify-between px-10 py-4 bg-gray-100">
      {/* displaying the current time */}
      <p className="font-medium">{formatTime(currentTime)}</p>

      {/* for video control button */}
      <div className="relative flex items-center justify-center gap-10">
        <EmojiPicker />
        <Audio currentPeerID={currentPeerID} />
        <Video currentPeerID={currentPeerID} />
        <EndCall
          peer={peer}
          mediaStream={mediaStream}
          setMediaStream={setMediaStream}
        />
      </div>

      {/* for other buttons */}
      <div className="flex items-center justify-center gap-10">
        <button
          title="Get meeting details"
          className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
          onClick={() => setIsDetailsBoxClosed(false)}
        >
          <img
            src="/assets/footer/info.svg"
            alt="get information"
            className="w-6 h-6"
          />
        </button>

        {/* for toggling user details */}
        <button
          type="button"
          title="Get joined users detail"
          className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
          onClick={() => handleSidebarClicks("users")}
        >
          <img
            src="/assets/footer/users.svg"
            alt="users information"
            className="w-6 h-6"
          />
        </button>

        {/* for toggling user's messages */}
        <button
          type="button"
          title="Message everyone"
          className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
          onClick={() => handleSidebarClicks("messages")}
        >
          <img
            src="/assets/footer/message.svg"
            alt="messages"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* for showing the meeting details */}
      {!isDetailsBoxClosed && (
        <CopyRoomCode setIsDetailsBoxClosed={setIsDetailsBoxClosed} />
      )}
    </div>
  );
};

export default Footer;
