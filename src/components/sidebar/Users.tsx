import { useUserContext } from "../../context/User";

const Users = () => {
  const { allUsersData } = useUserContext();

  return (
    <ul className="h-full rounded-md shadow-md p-5 space-y-3">
      <li className="text-xl font-semibold text-center">
        List of all the joined users
      </li>
      {Object.values(allUsersData).map((data) => {
        return <li key={data?.peerID}>{data?.name}</li>;
      })}
    </ul>
  );
};

export default Users;
