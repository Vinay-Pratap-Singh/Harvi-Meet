import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const Stream = () => {
  const videoStreamRef = useRef<HTMLVideoElement | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [doesShowVideo, setDoesShowVideo] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);

  // to get the stream
  useEffect(() => {
    // function to get the stream
    const getMediaStream = async () => {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setStream(newStream);
        if (videoStreamRef.current) {
          videoStreamRef.current.srcObject = newStream;
        }
      } catch (error) {
        toast.error("Oops! failed to load the stream");
      }
    };

    if (doesShowVideo && !stream) {
      getMediaStream();
    } else if (!doesShowVideo && stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      setStream(null);
    }

    return () => {
      if (!doesShowVideo && stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        setStream(null);
      }
    };
  }, [doesShowVideo, stream]);

  return (
    <div
      className={`relative  flex items-center justify-center rounded-2xl w-[35rem] h-96 ${
        doesShowVideo ? "" : "bg-black"
      }`}
    >
      {doesShowVideo ? (
        <video
          ref={videoStreamRef}
          autoPlay
          muted={isMuted}
          className="object-cover w-full h-full"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-full">
          <p className="text-xl font-semibold text-white">Camera is off</p>
        </div>
      )}

      {/* for icons */}
      <div className="absolute flex items-center gap-5 bottom-5">
        {/* mute and unmute */}
        <div
          className="p-3 bg-white rounded-full shadow-sm cursor-pointer shadow-gray-500"
          onClick={() => setIsMuted(!isMuted)}
        >
          <img
            src={
              isMuted ? "./assets/icons/mute.svg" : "./assets/icons/unmute.svg"
            }
            alt="mute and unmute"
            className="w-5"
          />
        </div>

        {/* show or hide video */}
        <div
          className="p-3 bg-white rounded-full shadow-sm cursor-pointer shadow-gray-500"
          onClick={() => setDoesShowVideo(!doesShowVideo)}
        >
          <img
            src={
              doesShowVideo
                ? "./assets/icons/videoOn.svg"
                : "./assets/icons/videoOff.svg"
            }
            alt="mute and unmute"
            className="w-5"
          />
        </div>
      </div>
    </div>
  );
};

export default Stream;
