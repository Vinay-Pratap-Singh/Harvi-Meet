import { useMemo, useRef } from "react";

const Player = ({ stream }: { stream: MediaStream }) => {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  useMemo(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
      console.log("setting");
    }
  }, [stream]);

  return (
    <div className="border-2 border-red-500 w-96">
      <video ref={videoRef} muted autoPlay className="object-cover" />
    </div>
  );
};

export default Player;
