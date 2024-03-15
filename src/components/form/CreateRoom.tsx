import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useUserContext } from "../../context/User";

interface IFormInput {
  name: string;
}

const CreateRoom = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormInput>({ defaultValues: { name: "" } });
  const navigate = useNavigate();
  const { setUserData } = useUserContext();

  // function to handle form submission
  const handleFormSubmission: SubmitHandler<IFormInput> = (data) => {
    setUserData({ isMeetingOrganiser: true, name: data?.name });
    const newRoomId = uuidv4();
    navigate(`/${newRoomId}`);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmission)}
      className="flex flex-col gap-5 w-full"
    >
      {/* for user's name */}
      <div className="w-full space-y-1">
        <input
          autoFocus
          placeholder="Enter your name"
          className={`w-full p-2 border-2 rounded-md  ${
            errors?.name
              ? "focus-within:outline-red-500"
              : "focus-within:outline-blue-600"
          }`}
          {...register("name", {
            required: { value: true, message: "Please enter your name" },
            minLength: {
              value: 3,
              message: "Please enter a valid name",
            },
          })}
        />
        {/* for displaying the error */}
        {errors?.name && (
          <p className="text-sm text-red-500">* {errors?.name?.message}</p>
        )}
      </div>

      {/* button to create a room */}
      <button
        disabled={isSubmitting}
        type="submit"
        className="py-2 font-medium text-white transition-all duration-300 ease-in-out bg-blue-600 border-2 border-blue-600 rounded-md hover:border-blue-500 hover:bg-blue-500"
      >
        {isSubmitting ? "Submitting ..." : "Submit"}
      </button>
    </form>
  );
};

export default CreateRoom;
