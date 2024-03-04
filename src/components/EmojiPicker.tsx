import EmojiPickerBox from "emoji-picker-react";
import { useEffect, useState } from "react";
import SelectedEmoji from "./SelectedEmoji";
import { v4 as uuidv4 } from "uuid";
import { IEmojiData } from "../helper/interface";
import { useSocketContext } from "../context/Socket";
import { useParams } from "react-router-dom";

const EmojiPicker = () => {
  const { roomid: currentRoomID } = useParams();
  const [showEmoji, setShowEmoji] = useState(false);
  const [selectedEmojies, setSelectedEmojies] = useState<IEmojiData[]>([]);
  const socket = useSocketContext();

  // function to handle the emoji click
  const handleEmojiClick = (emoji: any) => {
    const updatedEmojiesData = [
      ...selectedEmojies,
      {
        id: uuidv4(),
        emoji: emoji?.emoji,
        randomFontSize: Math.floor(Math.random() * (80 - 30 + 1)) + 30,
        randomBottom:
          Math.floor(Math.random() * (window.innerHeight - 300)) + 300,
        horizontalMovementDirection: Math.random() < 0.5 ? "left" : "right",
        horizontalMove: Math.floor(Math.random() * 201),
        animationTime: Math.floor(Math.random() * (6 - 3 + 1)) + 3,
      },
    ];
    setSelectedEmojies([...updatedEmojiesData]);
    setShowEmoji(!showEmoji);

    // sending the emoji data to other users
    socket?.emit("newEmojies", { updatedEmojiesData, currentRoomID });
  };

  // for updating the selected emojies when some user selects it
  useEffect(() => {
    if (!socket) return;
    const handleEmojiesUpdate = (updatedEmojiesData: IEmojiData[]) => {
      setSelectedEmojies([...updatedEmojiesData]);
    };
    socket?.on("updatedEmojies", handleEmojiesUpdate);

    return () => {
      socket?.off("updatedEmojies", handleEmojiesUpdate);
    };
  }, [socket]);

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
          onEmojiClick={handleEmojiClick}
        />
      )}

      {/* displaying all the selected emojies */}
      {selectedEmojies.length > 0 &&
        selectedEmojies.map((emojiData: IEmojiData) => {
          return (
            <SelectedEmoji
              key={emojiData?.id}
              data={emojiData}
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
