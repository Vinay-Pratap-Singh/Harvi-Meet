const EndCall = () => {
  return (
    <button
      title="End Meeting"
      className="relative flex items-center justify-center transition-all duration-200 ease-in-out bg-red-500 rounded-full hover:shadow-md h-14 w-14"
    >
      <img className="w-7 h-7" src="/assets/endCall.svg" alt="end call" />
    </button>
  );
};

export default EndCall;
