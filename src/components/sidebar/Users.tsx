import { useUserContext } from "../../context/User";

const Users = () => {
  const { allUsersData } = useUserContext();

  return (
    <ul className="h-full rounded-md shadow-md p-5 space-y-3">
      <li className="text-xl font-semibold flex items-center gap-5 justify-center">
        <img className="w-5 h-5" src="/assets/footer/users.svg" alt="users" />
        <p>List of all the joined users</p>
      </li>
      {Object.values(allUsersData).map((data, index) => {
        return (
          <li
            key={data?.peerID}
            className="font-medium flex items-center gap-3"
          >
            <span>{index > 9 ? index + 1 : "0" + (index + 1)}</span>{" "}
            <p>{data?.name} </p>
            {data?.isMeetingOrganiser && (
              <span className="bg-yellow-500 text-white py-1 px-2 rounded-sm text-sm">
                organiser
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Users;
