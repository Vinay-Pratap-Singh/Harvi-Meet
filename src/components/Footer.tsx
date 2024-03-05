import { useEffect, useState } from "react";
import Audio from "./Audio";
import EmojiPicker from "./EmojiPicker";
import EndCall from "./EndCall";
import Video from "./Video";
import CopyRoomCode from "./CopyRoomCode";

const Footer = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDetailsBoxClosed, setIsDetailsBoxClosed] = useState(false);

  const formatTime = (time: any) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    const formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
  };

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
        <Audio />
        <Video />
        <EndCall />
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
        <button
          title="Get joined users detail"
          className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
        >
          <img
            src="/assets/footer/users.svg"
            alt="users information"
            className="w-6 h-6"
          />
        </button>
        <button
          title="Message everyone"
          className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
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
