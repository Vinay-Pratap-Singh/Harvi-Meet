import EmojiPickerBox from "emoji-picker-react";
import { useState } from "react";

const EmojiPicker = () => {
  const [showEmoji, setShowEmoji] = useState(true);
  return (
    <div className="relative border-2 border-red-500 w-fit">
      <EmojiPickerBox
        open={showEmoji}
        style={{ position: "absolute", bottom: "50px" }}
      />
      <button onClick={() => setShowEmoji(!showEmoji)}>😍 Emoji</button>
    </div>
  );
};

export default EmojiPicker;
