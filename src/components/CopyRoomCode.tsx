import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

interface IProps {
  setIsDetailsBoxClosed: React.Dispatch<React.SetStateAction<boolean>>;
}

const CopyRoomCode = ({ setIsDetailsBoxClosed }: IProps) => {
  const { roomid: currentRoomID } = useParams();

  // function to handle copy code
  const copyToClipboard = async () => {
    try {
      if (currentRoomID) {
        await navigator.clipboard.writeText(currentRoomID);
        toast.success("Room code copied successfully");
      } else {
        toast.error("Failed to get any room code");
      }
    } catch (error) {
      toast.error("Failed to copy the code");
    }
  };

  // function to send code to whatsapp
  const sendToWhatsapp = () => {
    if (currentRoomID) {
      const message = "Use this room code to join the meeting: ";
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(
        message + currentRoomID
      )}`;
      window.open(whatsappUrl);
    } else {
      toast.error("Failed to get any room code");
    }
  };

  return (
    <div className="absolute p-4 space-y-5 bg-white rounded-md shadow-md bottom-40 left-10 w-96">
      <div className="flex items-center gap-5">
        <div>
          <p className="text-lg font-medium">
            Copy the room code and share with your loved one
          </p>
          <p>{currentRoomID}</p>
        </div>
        <button
          className="self-start"
          onClick={() => setIsDetailsBoxClosed(true)}
        >
          <img
            src="/assets/social/close.svg"
            alt="close button"
            className="w-10 h-10"
          />
        </button>
      </div>

      {/* buttons for different platform */}
      <div className="flex items-center justify-center gap-5">
        {/* copy code */}
        <button
          title="Copy room code"
          onClick={copyToClipboard}
          className="p-4 transition-all duration-200 ease-in-out bg-gray-100 rounded-full hover:bg-gray-50"
        >
          <img
            src="/assets/social/copy.svg"
            alt="copy code"
            className="w-6 h-6"
          />
        </button>

        {/* whatsapp */}
        <button
          title="Send code on whatsapp"
          onClick={sendToWhatsapp}
          className="p-4 transition-all duration-200 ease-in-out bg-gray-100 rounded-full hover:bg-gray-50"
        >
          <img
            src="/assets/social/whatsapp.svg"
            alt="send code to whatsapp"
            className="w-6 h-6"
          />
        </button>
      </div>
    </div>
  );
};

export default CopyRoomCode;
