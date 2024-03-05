import { useState } from "react";

const Audio = () => {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <button
      title="Mute / unmute audio"
      onClick={() => setIsMuted(!isMuted)}
      className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
    >
      {isMuted ? (
        <img className="w-6 h-6" src="/assets/footer/mute.svg" alt="mute" />
      ) : (
        <img className="w-6 h-6" src="/assets/footer/unmute.svg" alt="unmute" />
      )}
    </button>
  );
};

export default Audio;
