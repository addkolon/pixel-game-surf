/** @format */
import { useState } from "react";
import surferSprite from "../../../../sprite/surfer.png";

import { settings } from "../../settings";
import { useHandleBoat } from "./useHandleBoat";

export const useHandleSurfer = () => {
  const surferImage = new Image();
  surferImage.src = surferSprite;

  const { boat } = useHandleBoat();

  const [surfer, setSurfer] = useState({
    image: surferImage,

    x: settings.boat.startPositionX,
    y: settings.boat.startPositionY,
    width: 65,
    height: 75,
    frameX: 0,
    animationSpeed: settings.boat.animationSpeed,
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
