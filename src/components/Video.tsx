import { useState } from "react";

const Video = () => {
  const [showVideo, setShowVideo] = useState(true);

  return (
    <button
      title="Show / hide video"
      onClick={() => setShowVideo(!showVideo)}
      className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md"
    >
      {showVideo ? (
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
