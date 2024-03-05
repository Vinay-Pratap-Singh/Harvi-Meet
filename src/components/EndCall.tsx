const EndCall = () => {
  return (
    <button
      title="End Meeting"
      className="relative flex items-center justify-center w-12 h-12 transition-all duration-200 ease-in-out bg-red-500 rounded-full hover:shadow-md"
    >
      <img
        className="w-6 h-6"
        src="/assets/footer/endCall.svg"
        alt="end call"
      />
    </button>
  );
};

export default EndCall;
