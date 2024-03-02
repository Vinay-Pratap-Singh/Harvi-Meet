import EmojiPickerBox from "emoji-picker-react";
import { useState } from "react";
import SelectedEmoji from "./SelectedEmoji";
import { v4 as uuidv4 } from "uuid";
import { IEmojiData } from "../helper/interface";

const EmojiPicker = () => {
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmojies, setSelectedEmojies] = useState<IEmojiData[]>([]);

  return (
    <div
      title="Choose emoji"
      className="relative flex items-center justify-center transition-all duration-200 ease-in-out bg-gray-200 rounded-full hover:shadow-md h-14 w-14"
    >
      {showEmoji && (
        <EmojiPickerBox
          style={{
            position: "absolute",
            bottom: "80px",
            transform: "translateX(-50%,0)",
            zIndex: 9999,
          }}
          onEmojiClick={(emoji) => {
            setSelectedEmojies([
              ...selectedEmojies,
              { id: uuidv4(), emoji: emoji?.emoji },
            ]);
            setShowEmoji(!showEmoji);
          }}
        />
      )}

      {/* displaying all the selected emojies */}
      {selectedEmojies.length > 0 &&
        selectedEmojies.map((emojiData: IEmojiData) => {
          return (
            <SelectedEmoji
              id={emojiData?.id}
              key={emojiData?.id}
              emoji={emojiData?.emoji}
              selectedEmojies={selectedEmojies}
              setSelectedEmojies={setSelectedEmojies}
            />
          );
        })}

      <img
        onClick={() => setShowEmoji(!showEmoji)}
        className="cursor-pointer w-7 h-7"
        src="/assets/emoji.svg"
        alt="emoji"
      />
    </div>
  );
};

export default EmojiPicker;
