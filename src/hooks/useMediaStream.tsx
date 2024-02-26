import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useMediaStream = () => {
  const navigate = useNavigate();
  const [mediaStream, setMediaStream] = useState<null | MediaStream>(null);
  const isMediaStream = useRef(false);

  // getting the media stream
  useEffect(() => {
    if (isMediaStream.current) return;
    try {
      (async () => {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true,
        });
        setMediaStream(stream);
        isMediaStream.current = true;
      })();
    } catch (error) {
      toast.error("Failed to get the stream");
      navigate("/");
    }
  }, [navigate]);

  return { mediaStream };
};

export default useMediaStream;
