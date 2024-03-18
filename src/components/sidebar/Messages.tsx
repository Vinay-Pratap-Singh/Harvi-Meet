import { SubmitHandler, useForm } from "react-hook-form";
import { useSocketContext } from "../../context/Socket";
import { useUserContext } from "../../context/User";

interface IFormInput {
  message: string;
}

const Messages = () => {
  const {
    formState: { isSubmitting },
    handleSubmit,
    register,
    resetField,
  } = useForm<IFormInput>({ defaultValues: { message: "" } });
  const { userData, allMessages } = useUserContext();
  const socket = useSocketContext();

  // to handle form state
  const handleFormSubmission: SubmitHandler<IFormInput> = (data) => {
    if (!data?.message) return;
    // sending the message to all other users
    socket?.emit("sendMessage", {
      roomID: userData?.roomID,
      senderName: userData?.name,
      message: data?.message,
    });
    resetField("message");
  };

  return (
    <div className="h-full w-full flex flex-col gap-5 rounded-md shadow-md p-5">
      {/* for rendering all messages */}
      <div className="h-full space-y-5 overflow-hidden">
        <h1 className="font-semibold text-center text-xl">
          All user's message
        </h1>

        <div className=" overflow-y-scroll h-full space-y-5 customScrollbar pb-20">
          {allMessages.length === 0 ? (
            <p>No messages ...</p>
          ) : (
            allMessages.map((message) => {
              return (
                <div
                  key={message?.message + message?.senderName}
                  className="flex flex-col"
                >
                  <p className="text-xs font-medium bg-yellow-500 text-white rounded-md w-fit px-2">
                    {message?.senderName}
                  </p>
                  <p>{message?.message}</p>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* to send the message */}
      <form
        onSubmit={handleSubmit(handleFormSubmission)}
        className="w-full flex items-center gap-5 self-end"
      >
        <input
          className="w-full px-2 py-1 border-2 border-black rounded-md"
          type="text"
          placeholder="Type a message ..."
          {...register("message")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-gray-300 py-2 px-4 hover:bg-gray-200 rounded-sm transition-all duration-200 ease-in-out"
        >
          <img src="/assets/send.svg" alt="send" className="w-5 h-5" />
        </button>
      </form>
    </div>
  );
};

export default Messages;
