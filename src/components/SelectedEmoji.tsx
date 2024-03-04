// @ts-nocheck

import { useEffect, useRef } from "react";
import { IEmojiData } from "../helper/interface";

interface IProps {
  data: IEmojiData;
  selectedEmojies: IEmojiData[];
  setSelectedEmojies: React.Dispatch<React.SetStateAction<IEmojiData[]>>;
}

const SelectedEmoji = ({
  data,
  selectedEmojies,
  setSelectedEmojies,
}: IProps) => {
  const selectedEmojiRef = useRef<null | HTMLDivElement>(null);

  // handling the emoji animation
  useEffect(() => {
    if (!selectedEmojiRef.current) return;
    const emoji = selectedEmojiRef.current;

    // adding all the required css properties
    emoji.style.fontSize = `${data?.randomFontSize}px`;
    emoji.style.bottom = `${data?.randomBottom}px`;
    emoji.style[data.horizontalMovementDirection] = `${data?.horizontalMove}px`;
    emoji.style.animation = `moveEmoji ${data?.animationTime}s forwards`;

    // Define keyframes dynamically based on the dynamic values
    const dynamicKeyframes = `
        from {
          bottom: 100px;
        }
        to {
          bottom: ${data?.randomBottom}px;
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
  }, [
    data?.animationTime,
    data?.horizontalMove,
    data.horizontalMovementDirection,
    data?.randomBottom,
    data?.randomFontSize,
  ]);

  // function to handle the animation end to remove the emoji from dom
  const handleAnimationEnd = () => {
    const currentEmojiesData = [...selectedEmojies];
    const filteredEmojiesData = currentEmojiesData.filter(
      (emoji: IEmojiData) => {
        return emoji?.id !== data?.id;
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
      {data?.emoji}
    </div>
  );
};

export default SelectedEmoji;
