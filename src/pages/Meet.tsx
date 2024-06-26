import { useEffect, useMemo, useRef, useState } from "react";
import useMediaStream from "../hooks/useMediaStream";
import { useSocketContext } from "../context/Socket";
import usePeer from "../hooks/usePeer";
import ReactPlayer from "react-player";
import Footer from "../components/Footer";
import { useStreamContext } from "../context/Stream";
import Messages from "../components/sidebar/Messages";
import Users from "../components/sidebar/Users";
import { useParams } from "react-router-dom";
import { useUserContext } from "../context/User";
import { IRoomData } from "../helper/interface";

const Meet = () => {
  const { mediaStream, setMediaStream } = useMediaStream();
  const socket = useSocketContext();
  const { peer, currentPeerID } = usePeer();
  const { allStreams, setAllStreams } = useStreamContext();
  const [showSidebar, setShowSidebar] = useState({
    showUsers: false,
    showMessages: false,
  });
  const { roomid } = useParams();
  const { setAllUsersData } = useUserContext();
  const {
    setUserData,
    userData,
    allMessages,
    setAllMessages,
    setPinnedUserIndex,
  } = useUserContext();
  const isUserDataUpdated = useRef(false);

  // for setting the first user to all streams
  useMemo(() => {
    if (!mediaStream || !peer || !currentPeerID || !socket) return;

    // adding the current stream
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

    // for pinned video preview
    setPinnedUserIndex(0);
  }, [
    mediaStream,
    peer,
    currentPeerID,
    setAllStreams,
    socket,
    setPinnedUserIndex,
  ]);

  // for sending the user data to server and local context
  useMemo(() => {
    if (
      !socket ||
      !currentPeerID ||
      !roomid ||
      !userData ||
      isUserDataUpdated.current
    )
      return;

    // sending the user data to server
    socket?.emit("addUserData", {
      peerID: currentPeerID,
      roomID: roomid,
      isMeetingOrganiser: userData?.isMeetingOrganiser,
      name: userData?.name,
    });

    // updating the user data
    setUserData({ ...userData, peerID: currentPeerID, roomID: roomid || "" });
    isUserDataUpdated.current = true;
  }, [currentPeerID, roomid, setUserData, socket, userData]);

  // for listening to new user
  useEffect(() => {
    if (!socket || !mediaStream || !peer) return;

    // function to check new joined user
    const handleJoinedRoom = ({
      peerID: newUserPeerID,
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
              isOrganizer: true,
              isMuted: true,
              isPlaying: true,
              stream: incomingStream,
            },
          };
        });
      });
    };

    const handleUserData = (data: IRoomData) => {
      setAllUsersData(data);
    };

    const handleMessage = ({
      senderName,
      message,
    }: {
      senderName: string;
      message: string;
    }) => {
      setAllMessages([...allMessages, { senderName, message }]);
    };

    socket.on("joinedRoom", handleJoinedRoom);
    socket.on("allUsersData", handleUserData);
    socket.on("receiveMessage", handleMessage);

    return () => {
      socket.off("joinedRoom", handleJoinedRoom);
      socket.off("allUsersData", handleUserData);
      socket.off("receiveMessage", handleMessage);
    };
  }, [
    socket,
    mediaStream,
    peer,
    setAllStreams,
    setAllUsersData,
    allMessages,
    setAllMessages,
  ]);

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
    <div className="relative flex flex-col gap-5 h-screen pt-5">
      <div className="flex items-center justify-center w-full h-full gap-5">
        {/* for all the joined users video */}
        <div className="h-full flex justify-between gap-5">
          <ReactPlayer
            key={Object.values(allStreams)[0]?.peerID}
            url={Object.values(allStreams)[0]?.stream}
            muted={Object.values(allStreams)[0]?.isMuted}
            playing={Object.values(allStreams)[0]?.isPlaying}
            stopOnUnmount
            width="100%"
            height="100%"
          />

          <div className="w-96 h-full rounded-md shadow-md p-5">
            {Object.values(allStreams).length > 0 &&
              Object.values(allStreams).map((streamData) => {
                return (
                  <div
                    key={streamData?.peerID}
                    className="relative w-full bg-red-500"
                  >
                    {streamData?.isPlaying ? (
                      <ReactPlayer
                        key={streamData?.peerID}
                        url={streamData?.stream}
                        muted={streamData?.isMuted}
                        playing={streamData?.isPlaying}
                        stopOnUnmount
                        width="100%"
                        height="100%"
                      />
                    ) : (
                      <div className="h-full w-full">Video off hai</div>
                    )}

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
        </div>

        {/* for user details / messaging sidebar */}
        <div
          className={`${
            showSidebar?.showMessages === true ||
            showSidebar?.showUsers === true
              ? "w-96 h-full"
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
        peer={peer}
        mediaStream={mediaStream}
        setMediaStream={setMediaStream}
      />
    </div>
  );
};

export default Meet;
