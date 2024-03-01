import { useState } from "react";

const Video = () => {
  const [showVideo, setShowVideo] = useState(true);

  return (
    <button
      title="Show / hide video"
      onClick={() => setShowVideo(!showVideo)}
      className="relative flex items-center justify-center transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md h-14 w-14"
    >
      {showVideo ? (
        <img className="w-7 h-7" src="/assets/showVideo.svg" alt="show video" />
      ) : (
        <img
          className="w-7 h-7"
          src="/assets/hiddenVideo.svg"
          alt="hide video"
        />
      )}
    </button>
  );
};

export default Video;
