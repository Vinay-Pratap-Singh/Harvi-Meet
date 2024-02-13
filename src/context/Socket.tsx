import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Socket, io } from "socket.io-client";

const SocketContext = createContext<Socket | null>(null);

// custom hook to use socket context
export const useSocketContext = () => useContext(SocketContext);

// socket context provider
const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  // to avoid dual request for socket connection
  const isAlreadyConnected = useRef(false);

  useEffect(() => {
    if (isAlreadyConnected.current) return;
    isAlreadyConnected.current = true;
    const URL =
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_SERVER_URL
        : "http://localhost:5000";
    const connection = io(URL || "http://localhost:5000");
    setSocket(connection);
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
