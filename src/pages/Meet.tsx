import Player from "../components/Player";
import useMediaStream from "../hooks/useMediaStream";

const Meet = () => {
  const { mediaStream } = useMediaStream();
  return (
    <div className="flex flex-wrap gap-5">
      {mediaStream && <Player stream={mediaStream} />}
    </div>
  );
};

export default Meet;
