import Peer from "peerjs";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSocketContext } from "../context/Socket";

const usePeer = () => {
  const socket = useSocketContext();
  const [peer, setPeer] = useState<null | Peer>(null);
  const [currentPeerID, setCurrentPeerID] = useState("");
  const { roomid: currentRoomID } = useParams();
  const isPeer = useRef(false);

  // creating the peer
  useMemo(() => {
    if (isPeer.current || !socket || !currentRoomID) return;

    const myPeer = new Peer();
    setPeer(myPeer);
    isPeer.current = true;
    myPeer.on("open", (id: string) => {
      setCurrentPeerID(id);
      // joining the room
      socket?.emit("join-room", { currentRoomID, peerID: id });
    });

    return () => {
      peer && peer.destroy();
    };
  }, [peer, currentRoomID, socket]);

  return { peer, currentPeerID };
};

export default usePeer;
