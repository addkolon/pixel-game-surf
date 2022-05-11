/** @format */
import { useState } from "react";
import surferSprite from "../../../../sprite/surfer.png";

import { settings } from "../../settings";
import { useHandlePlayerObject } from "./useHandlePlayerObject";

export const useHandleSurfer = () => {
  const surferImage = new Image();
  surferImage.src = surferSprite;

  const { playerObject } = useHandlePlayerObject();

  const [surfer, setSurfer] = useState({
    image: surferImage,

    x: settings.playerObject.startPositionX,
    y: settings.playerObject.startPositionY,
    width: 65,
    height: 75,
    frameX: 0,
    animationSpeed: settings.surfer.animationSpeed,
  });

  const drawSurfer = (context, boat) => {
    // draw surfer
    context.drawImage(
      surferImage,
      surfer.frameX * surfer.width,
      0,
      surfer.width,
      surfer.height,
      boat.x + settings.surfer.alignmentOnBoardX,
      boat.y - settings.surfer.alignmentOnBoardY,
      surfer.width,
      surfer.height
    );
  };

  const surferAnimation = (frame) => {
    if (frame % settings.surfer.animationSpeed === 0) {
      setSurfer((prev) => {
        return {
          ...prev,
          frameX: prev.frameX < 5 ? prev.frameX + 1 : 0,
        };
      });
    }
  };

  return {
    drawSurfer,
    surferAnimation,
    surfer,
  };
};
