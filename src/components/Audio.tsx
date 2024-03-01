import { useState } from "react";

const Audio = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <button
      title="Mute / unmute audio"
      onClick={() => setIsMuted(!isMuted)}
      className="relative flex items-center justify-center transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md h-14 w-14"
    >
      {isMuted ? (
        <img className="w-7 h-7" src="/assets/mute.svg" alt="mute" />
      ) : (
        <img className="w-7 h-7" src="/assets/unmute.svg" alt="unmute" />
      )}
    </button>
  );
};

export default Audio;
