import { useEffect, useRef } from "react";
import { IEmojiData } from "../helper/interface";

interface IProps {
  id: string;
  emoji: string;
  selectedEmojies: IEmojiData[];
  setSelectedEmojies: React.Dispatch<React.SetStateAction<IEmojiData[]>>;
}

const SelectedEmoji = ({
  id,
  emoji,
  selectedEmojies,
  setSelectedEmojies,
}: IProps) => {
  const selectedEmojiRef = useRef<null | HTMLDivElement>(null);

  // handling the emoji animation
  useEffect(() => {
    if (selectedEmojiRef.current) {
      const emoji = selectedEmojiRef.current;
      const randomFontSize = Math.floor(Math.random() * (80 - 30 + 1)) + 30;
      const randomBottom =
        Math.floor(Math.random() * (window.innerHeight - 300)) + 300;
      const horizontalMovementDirection =
        Math.random() < 0.5 ? "left" : "right";
      const horizontalMove = Math.floor(Math.random() * 201);
      const animationTime = Math.floor(Math.random() * (6 - 3 + 1)) + 3;

      // adding all the required css properties
      emoji.style.fontSize = `${randomFontSize}px`;
      emoji.style.bottom = `${randomBottom}px`;
      emoji.style[horizontalMovementDirection] = `${horizontalMove}px`;
      emoji.style.animation = `moveEmoji ${animationTime}s forwards`;

      // Define keyframes dynamically based on the dynamic values
      const dynamicKeyframes = `
        from {
          bottom: 100px;
        }
        to {
          bottom: ${randomBottom}px;
        }
      `;

      // Create a style tag and append keyframes to it
      const styleTag = document.createElement("style");
      styleTag.type = "text/css";
      styleTag.innerHTML = `@keyframes moveEmoji { ${dynamicKeyframes} }`;
      document.head.appendChild(styleTag);

      // removing the stylesheet on unmount
      return () => {
        document.head.removeChild(styleTag);
      };
    }
  }, []);

  // function to handle the animation end to remove the emoji from dom
  const handleAnimationEnd = () => {
    const currentEmojiesData = [...selectedEmojies];
    const filteredEmojiesData = currentEmojiesData.filter(
      (emoji: IEmojiData) => {
        return emoji?.id !== id;
      }
    );
    setSelectedEmojies([...filteredEmojiesData]);
  };

  return (
    <div
      ref={selectedEmojiRef}
      onAnimationEnd={handleAnimationEnd}
      className="absolute text-5xl transition-all duration-1000 ease-in-out bottom-20"
    >
      {emoji}
    </div>
  );
};

export default SelectedEmoji;
