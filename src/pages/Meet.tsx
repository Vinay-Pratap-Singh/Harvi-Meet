import { useMemo, useState } from "react";
import useMediaStream from "../hooks/useMediaStream";
import { useSocketContext } from "../context/Socket";
import usePeer from "../hooks/usePeer";
import EmojiPicker from "../components/EmojiPicker";
import Audio from "../components/Audio";
import Video from "../components/Video";
import EndCall from "../components/EndCall";
import ReactPlayer from "react-player";

const Meet = () => {
  const { mediaStream } = useMediaStream();
  const socket = useSocketContext();
  const { peer, currentPeerID } = usePeer();
  const [allStreams, setAllStreams] = useState({});

  // for setting the first user to all streams
  useMemo(() => {
    if (!mediaStream || !peer || !currentPeerID) return;
    setAllStreams((prev) => {
      return {
        ...prev,
        [currentPeerID]: {
          stream: mediaStream,
        },
      };
    });
  }, [mediaStream, currentPeerID, peer]);

  // for listening to new user
  useMemo(() => {
    if (!socket || !mediaStream || !peer) return;
    const handleJoinedRoom = (newUserPeerID: string) => {
      if (!peer || !mediaStream) return;
      const call = peer?.call(newUserPeerID, mediaStream);
      call.on("stream", (incomingStream) => {
        setAllStreams((prev) => {
          return {
            ...prev,
            [newUserPeerID]: {
              stream: incomingStream,
            },
          };
        });
      });
    };
    socket.on("joined-room", handleJoinedRoom);

    return () => {
      socket.off("joined-room", handleJoinedRoom);
    };
  }, [socket, mediaStream, peer]);

  // for answering the coming call
  useMemo(() => {
    if (!mediaStream || !peer) return;
    peer?.on("call", (call) => {
      call.answer(mediaStream);
      const { peer: callerID } = call;
      call.on("stream", (incomingStream) => {
        setAllStreams((prev) => {
          return {
            ...prev,
            [callerID]: {
              stream: incomingStream,
            },
          };
        });
      });
    });
  }, [mediaStream, peer]);

  return (
    <div className="flex flex-col h-screen gap-5 overflow-hidden">
      <div
        className="grid h-full gap-5 overflow-hidden"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {Object.keys(allStreams).length > 0 &&
          Object.values(allStreams).map((streamData: any, index) => {
            return (
              <div
                className="object-cover w-full h-full border-2 border-red-500"
                key={index}
              >
                <ReactPlayer
                  url={streamData?.stream}
                  muted
                  playing
                  stopOnUnmount
                />
              </div>
            );
          })}
      </div>

      {/* adding the control buttons */}
      <div className="relative flex items-center justify-center w-full gap-10 h-28 bg-gray-50">
        <EmojiPicker />
        <Audio />
        <Video />
        <EndCall />
      </div>
    </div>
  );
};

export default Meet;
