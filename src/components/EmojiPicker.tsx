import EmojiPickerBox from "emoji-picker-react";
import { useState } from "react";

const EmojiPicker = () => {
  const [showEmoji, setShowEmoji] = useState(false);

  return (
    <button
      title="Choose emoji"
      className="relative flex items-center justify-center transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md h-14 w-14"
      onClick={() => setShowEmoji(!showEmoji)}
    >
      {showEmoji && (
        <EmojiPickerBox
          style={{
            position: "absolute",
            bottom: "80px",
            transform: "translateX(-50%,0)",
            zIndex: 9999,
          }}
        />
      )}
      <img className="w-7 h-7" src="/assets/emoji.svg" alt="emoji" />
    </button>
  );
};

export default EmojiPicker;
