import { useEffect, useRef } from "react";
import Stream from "./components/Stream";
import { useSocketContext } from "./context/Socket";

const App = () => {
  const socket = useSocketContext();
  const streamsContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleNewStream = (newStream: MediaStream) => {
      console.log("data coming", newStream);
      const newVideo = document.createElement("video");
      newVideo.srcObject = newStream;
      streamsContainerRef.current &&
        streamsContainerRef.current.appendChild(newVideo);
      console.log(newVideo, newStream);
    };
    socket.on("newStream", handleNewStream);

    return () => {
      socket.off("newStream", handleNewStream);
    };
  }, [socket]);

  return (
    <div
      ref={streamsContainerRef}
      className="flex items-center w-screen h-screen gap-20 p-10"
    >
      <Stream />
    </div>
  );
};

export default App;
