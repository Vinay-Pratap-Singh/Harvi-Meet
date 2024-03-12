import { useEffect, useMemo, useState } from "react";
import useMediaStream from "../hooks/useMediaStream";
import { useSocketContext } from "../context/Socket";
import usePeer from "../hooks/usePeer";
import ReactPlayer from "react-player";
import Footer from "../components/Footer";
import { useStreamContext } from "../context/Stream";
import Messages from "../components/sidebar/Messages";
import Users from "../components/sidebar/Users";

const Meet = () => {
  const { mediaStream } = useMediaStream();
  const socket = useSocketContext();
  const { peer, currentPeerID } = usePeer();
  const { allStreams, setAllStreams } = useStreamContext();
  const [showSidebar, setShowSidebar] = useState({
    showUsers: false,
    showMessages: false,
  });

  // for setting the first user to all streams
  useMemo(() => {
    if (!mediaStream || !peer || !currentPeerID) return;

    setAllStreams((prev) => {
      return {
        ...prev,
        [currentPeerID]: {
          peerID: currentPeerID,
          name: localStorage.getItem("name") || "",
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

    const handleJoinedRoom = ({
      peerID: newUserPeerID,
      name,
    }: {
      peerID: string;
      name: string;
    }) => {
      if (!peer || !mediaStream) return;
      const call = peer?.call(newUserPeerID, mediaStream);
      call.on("stream", (incomingStream) => {
        setAllStreams((prev) => {
          return {
            ...prev,
            [newUserPeerID]: {
              peerID: newUserPeerID,
              name,
              isOrganizer: true,
              isMuted: true,
              isPlaying: true,
              stream: incomingStream,
            },
          };
        });
      });
    };
    socket.on("joinedRoom", handleJoinedRoom);

    return () => {
      socket.off("joinedRoom", handleJoinedRoom);
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
              name: localStorage.getItem("name") || "",
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
    <div className="relative flex flex-col gap-5 h-screen">
      <div className="flex items-center justify-center gap-5 h-full">
        {/* for all the joined users video */}
        <div className="h-full flex flex-wrap items-center justify-center gap-5 p-5 overflow-hidden">
          {Object.values(allStreams).length > 0 &&
            Object.values(allStreams).map((streamData) => {
              return (
                <div
                  className={`relative ${
                    Object.keys(allStreams).length === 1 ? "h-full" : "h-1/2"
                  }`}
                >
                  <ReactPlayer
                    key={streamData?.peerID}
                    url={streamData?.stream}
                    muted={streamData?.isMuted}
                    playing={streamData?.isPlaying}
                    stopOnUnmount
                    width="100%"
                    height="100%"
                  />

                  {/* to show mic option */}
                  <div className="absolute right-5 top-5 flex items-center justify-center w-8 h-8 transition-all duration-200 ease-in-out bg-gray-200 rounded-full">
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

        {/* for user details / messaging sidebar */}
        <div
          className={`${
            showSidebar?.showMessages === true ||
            showSidebar?.showUsers === true
              ? "w-96"
              : "hidden"
          }`}
        >
          {showSidebar?.showMessages === true ? (
            <Messages />
          ) : showSidebar?.showUsers ? (
            <Users />
          ) : null}
        </div>
      </div>

      {/* for button controls */}
      <Footer
        currentPeerID={currentPeerID}
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
      />
    </div>
  );
};

export default Meet;
