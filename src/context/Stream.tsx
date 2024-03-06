import { createContext, useContext, useState } from "react";
import { IStreamData } from "../helper/interface";

// Define the type for the context value
interface StreamContextType {
  allStreams: { [callerID: string]: IStreamData };
  setAllStreams: React.Dispatch<
    React.SetStateAction<{ [callerID: string]: IStreamData }>
  >;
}

const StreamContext = createContext<StreamContextType>({
  allStreams: {},
  setAllStreams: () => {},
});

// custom hook to use the stream context
export const useStreamContext = () => useContext(StreamContext);

const StreamContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [allStreams, setAllStreams] = useState<{
    [callerID: string]: IStreamData;
  }>({});

  return (
    <StreamContext.Provider value={{ allStreams, setAllStreams }}>
      {children}
    </StreamContext.Provider>
  );
};

export default StreamContextProvider;
