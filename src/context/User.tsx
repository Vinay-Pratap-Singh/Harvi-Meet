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

  return (
    <UserContext.Provider
      value={{
        allUsersData,
        userData,
        setUserData,
        setAllUsersData,
        allMessages,
        setAllMessages,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
