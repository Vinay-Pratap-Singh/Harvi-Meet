import { useEffect, useMemo, useState } from "react";
import Player from "../components/Player";
import useMediaStream from "../hooks/useMediaStream";
import { useSocketContext } from "../context/Socket";
import usePeer from "../hooks/usePeer";

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
    console.log("running inside");
    if (!socket || !mediaStream || !peer) return;
    const handleJoinedRoom = (newUserPeerID: string) => {
      console.log(newUserPeerID);
      if (!peer || !mediaStream) return;
      const call = peer?.call(newUserPeerID, mediaStream);
      call.on("stream", (incomingStream) => {
        console.log("getting the stream of new user", incomingStream);
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
        console.log("answering the stream to new user", incomingStream);

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
    <div className="flex flex-wrap gap-5">
      {Object.keys(allStreams).length > 0 &&
        Object.values(allStreams).map((streamData: any, index) => {
          return <Player key={index} stream={streamData?.stream} />;
        })}
    </div>
  );
};

export default Meet;
