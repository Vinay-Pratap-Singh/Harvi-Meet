import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useMediaStream = () => {
  const navigate = useNavigate();
  const [mediaStream, setMediaStream] = useState<null | MediaStream>(null);
  const isMediaStream = useRef(false);

  const getMediaStream = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      setMediaStream(stream);
      isMediaStream.current = true;
    } catch (error) {
      console.log(error, "check error");
      toast.error("Failed to get the stream");
      navigate("/");
    }
  };

  // getting the media stream
  useEffect(() => {
    if (isMediaStream.current) return;
    getMediaStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
      setMediaStream(null);
    };
  }, [navigate, mediaStream]);

  return { mediaStream, setMediaStream };
};

export default useMediaStream;
