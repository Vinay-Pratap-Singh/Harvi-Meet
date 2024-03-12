import { useState } from "react";
import CreateRoom from "./components/form/CreateRoom";
import JoinRoom from "./components/form/JoinRoom";

const App = () => {
  const [isCreatingRoom, setIsCreatingRoom] = useState(true);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* container for creating and joining the room */}
      <div className="min-w-96 flex flex-col gap-5 p-5 rounded-md shadow-md">
        <h1 className="text-xl font-medium text-center">
          Connect with your loved one
        </h1>

        {/* toggle buttons */}
        <div className="flex items-center gap-5">
          <button
            type="button"
            className={`w-full rounded-md py-2 font-medium transition-all duration-300 ease-in-out border-2 border-blue-600 ${
              isCreatingRoom
                ? "text-white bg-blue-600 hover:border-blue-500 hover:bg-blue-500"
                : "border-blue-600"
            }`}
            onClick={() => setIsCreatingRoom(true)}
          >
            Create Room
          </button>
          <button
            type="button"
            className={`w-full rounded-md py-2 font-medium transition-all duration-300 ease-in-out border-2 border-blue-600 ${
              !isCreatingRoom
                ? "text-white bg-blue-600 hover:border-blue-500 hover:bg-blue-500"
                : "border-blue-600"
            }`}
            onClick={() => setIsCreatingRoom(false)}
          >
            Join Room
          </button>
        </div>

        {/* seprator */}
        <div className="w-full h-[2px] bg-gray-100" />

        {isCreatingRoom ? <CreateRoom /> : <JoinRoom />}
      </div>
    </div>
  );
};

export default App;
