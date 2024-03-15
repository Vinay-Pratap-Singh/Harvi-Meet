import { createContext, useContext, useState } from "react";
import { IRoomData, IUserContextData, IUserData } from "../helper/interface";

const UserContext = createContext<IUserContextData>({
  allUsersData: {},
  userData: { isMeetingOrganiser: false, name: "" },
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
  });
  const [allUsersData, setAllUsersData] = useState<IRoomData>({});

  return (
    <UserContext.Provider
      value={{ allUsersData, userData, setUserData, setAllUsersData }}
    >
      {children}
    </UserContext.Provider>
  );
};
