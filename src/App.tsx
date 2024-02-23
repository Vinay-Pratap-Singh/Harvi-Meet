import { SubmitHandler, useForm } from "react-hook-form";

interface IFormInput {
  roomId: string;
}

const App = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({ defaultValues: { roomId: "" } });

  // function to handle form submission
  const handleFormSubmission: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      {/* form container */}
      <form
        onSubmit={handleSubmit(handleFormSubmission)}
        className="flex flex-col gap-5 p-5 rounded-md shadow-md min-w-96"
      >
        <h1 className="text-xl font-medium text-center">
          Connect with your loved one
        </h1>

        {/* for input box and error */}
        <div className="w-full space-y-1">
          <input
            autoFocus
            placeholder="Enter the room id"
            className={`w-full px-2 py-1 border-2 rounded-md  ${
              errors?.roomId
                ? "focus-within:outline-red-500"
                : "focus-within:outline-blue-500"
            }`}
            {...register("roomId", {
              required: { value: true, message: "Please enter the room id" },
              minLength: { value: 5, message: "Please enter a valid room id" },
            })}
          />
          {/* for displaying the error */}
          {errors?.roomId && (
            <p className="text-sm text-red-500">* {errors?.roomId?.message}</p>
          )}
        </div>

        {/* button to create a room */}
        <button
          disabled={isSubmitting}
          type="submit"
          className="py-2 font-medium text-white transition-all duration-300 ease-in-out bg-blue-600 border-2 border-blue-600 rounded-md hover:border-blue-500 hover:bg-blue-500"
        >
          Join a room
        </button>

        {/* for seprator */}
        <div className="flex items-center gap-2">
          {/* for line */}
          <div className="w-full h-[2px] bg-black" />
          <p className="font-medium">OR</p>
          {/* for line */}
          <div className="w-full h-[2px] bg-black" />
        </div>

        {/* button to create a room */}
        <button
          disabled={isSubmitting}
          type="button"
          className="py-2 font-medium text-blue-500 transition-all duration-300 ease-in-out border-2 border-blue-600 rounded-md hover:text-white hover:bg-blue-600"
        >
          Create a room
        </button>
      </form>
    </div>
  );
};

export default App;
