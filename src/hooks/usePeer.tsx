import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";

const usePeer = () => {
  const [peer, setPeer] = useState<null | Peer>(null);
  const [currentPeerID, setCurrentPeerID] = useState("");
  const isPeer = useRef(false);

  // creating the peer
  useEffect(() => {
    if (isPeer.current) return;
    const myPeer = new Peer();
    setPeer(myPeer);
    isPeer.current = true;
    myPeer.on("open", (id: string) => {
      setCurrentPeerID(id);
    });

    return () => {
      peer && peer.destroy();
    };
  }, [peer]);

  return { peer, currentPeerID };
};

export default usePeer;
