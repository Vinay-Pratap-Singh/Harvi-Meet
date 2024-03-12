import { useEffect, useMemo } from "react";
import useMediaStream from "../hooks/useMediaStream";
import { useSocketContext } from "../context/Socket";
import usePeer from "../hooks/usePeer";
import ReactPlayer from "react-player";
import Footer from "../components/Footer";
import { useStreamContext } from "../context/Stream";

const Meet = () => {
  const { mediaStream } = useMediaStream();
  const socket = useSocketContext();
  const { peer, currentPeerID } = usePeer();
  const { allStreams, setAllStreams } = useStreamContext();

  // for setting the first user to all streams
  useMemo(() => {
    if (!mediaStream || !peer || !currentPeerID) return;

    setAllStreams((prev) => {
      return {
        ...prev,
        [currentPeerID]: {
          peerID: currentPeerID,
          isMuted: true,
          isPlaying: true,
          stream: mediaStream,
        },
      };
    });
  }, [mediaStream, peer, currentPeerID, setAllStreams]);

  // for listening to new user
  useEffect(() => {
    if (!socket || !mediaStream || !peer) return;
    const handleJoinedRoom = (newUserPeerID: string) => {
      if (!peer || !mediaStream) return;
      const call = peer?.call(newUserPeerID, mediaStream);
      call.on("stream", (incomingStream) => {
        setAllStreams((prev) => {
          return {
            ...prev,
            [newUserPeerID]: {
              peerID: newUserPeerID,
              isMuted: true,
              isPlaying: true,
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
  }, [socket, mediaStream, peer, setAllStreams]);

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
              peerID: callerID,
              isMuted: true,
              isPlaying: true,
              stream: incomingStream,
            },
          };
        });
      });
    });
  }, [mediaStream, peer, setAllStreams]);

  return (
    <div className="relative flex flex-col h-screen gap-5 overflow-hidden">
      {/* for all the joined users video */}
      <div
        className="grid h-full gap-5 overflow-hidden"
        style={{
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        }}
      >
        {Object.values(allStreams).length > 0 &&
          Object.values(allStreams).map((streamData) => {
            return (
              <div className="relative w-fit h-fit bg-red-50">
                <ReactPlayer
                  key={streamData?.peerID}
                  url={streamData?.stream}
                  muted={streamData?.isMuted}
                  playing={streamData?.isPlaying}
                  stopOnUnmount
                />

                {/* to show mic option */}
                <div className="absolute left-5 top-5 flex items-center justify-center w-8 h-8 transition-all duration-200 ease-in-out bg-gray-200 rounded-full">
                  {!streamData.isMuted ? (
                    <img
                      className="w-4 h-4 "
                      src="/assets/footer/mute.svg"
                      alt="mute"
                    />
                  ) : (
                    <img
                      className="w-4 h-4 "
                      src="/assets/footer/unmute.svg"
                      alt="unmute"
                    />
                  )}
                </div>
              </div>
            );
          })}
      </div>

      {/* for button controls */}
      <Footer currentPeerID={currentPeerID} />
    </div>
  );
};

export default Meet;
