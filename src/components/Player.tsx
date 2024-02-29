import ReactPlayer from "react-player";

const Player = ({ stream }: { stream: MediaStream }) => {
  return (
    <div className="border-2 border-red-500">
      <ReactPlayer url={stream} muted playing stopOnUnmount />
    </div>
  );
};

export default Player;
