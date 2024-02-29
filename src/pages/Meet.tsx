import { useMemo, useState } from "react";
import Player from "../components/Player";
import useMediaStream from "../hooks/useMediaStream";
import { useSocketContext } from "../context/Socket";
import usePeer from "../hooks/usePeer";
import EmojiPicker from "../components/EmojiPicker";

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
    <div className="flex flex-col h-screen gap-5">
      <div className="flex flex-wrap h-full gap-5 bg-green-500">
        {Object.keys(allStreams).length > 0 &&
          Object.values(allStreams).map((streamData: any, index) => {
            return <Player key={index} stream={streamData?.stream} />;
          })}
      </div>

      {/* adding the control buttons */}
      <div className="relative flex items-center justify-center w-full h-20 gap-10 bg-gray-200">
        <EmojiPicker />
        <button>Mute / Unmute</button>
        <button>Show / Hide Video</button>
        <button>ok</button>
      </div>
    </div>
  );
};

export default Meet;
