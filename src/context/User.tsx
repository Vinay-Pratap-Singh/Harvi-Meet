import { createContext, useContext, useState } from "react";
import {
  IMessage,
  IRoomData,
  IUserContextData,
  IUserData,
} from "../helper/interface";

const UserContext = createContext<IUserContextData>({
  allUsersData: {},
  userData: { isMeetingOrganiser: false, name: "", peerID: "", roomID: "" },
  allMessages: [],
  setAllMessages: () => {},
  setUserData: () => {},
  setAllUsersData: () => {},
  pinnedUserIndex: null,
  setPinnedUserIndex: () => {},
});

// custom hook to use user context
export const useUserContext = () => useContext(UserContext);

// user data context provider
export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [userData, setUserData] = useState<IUserData>({
    isMeetingOrganiser: false,
    name: "",
    peerID: "",
    roomID: "",
  });
  const [allUsersData, setAllUsersData] = useState<IRoomData>({});
  const [allMessages, setAllMessages] = useState<IMessage[]>([]);
  const [pinnedUserIndex, setPinnedUserIndex] = useState<number | null>(null);

  return (
    <UserContext.Provider
      value={{
        allUsersData,
        userData,
        setUserData,
        setAllUsersData,
        allMessages,
        setAllMessages,
        pinnedUserIndex,
        setPinnedUserIndex,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
