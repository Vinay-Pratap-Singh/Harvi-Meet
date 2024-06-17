import { useUserContext } from "../../context/User";

const Users = () => {
  const { allUsersData } = useUserContext();

  return (
    <ul className="h-full w-full rounded-md shadow-md p-5 space-y-3 overflow-y-scroll customScrollbar pb-20">
      {Object.values(allUsersData).map((data, index) => {
        return (
          <li
            key={data?.peerID}
            className="font-medium flex items-center gap-3 relative"
          >
            <div className="absolute bottom-2 left-2 bg-gray-100 rounded-md px-2 py-1">
              <p>{data?.name} </p>
              {data?.isMeetingOrganiser && (
                <span className="bg-yellow-500 text-white py-1 px-2 rounded-sm text-sm">
                  organiser
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

export default Users;
