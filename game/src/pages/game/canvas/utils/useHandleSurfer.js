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
      boat.x + 30,
      boat.y - 53,
      surfer.width,
      surfer.height
    );
  };

  const surferAnimation = (frame) => {
    if (frame % boat.animationSpeed === 0) {
      if (surfer.frameX < 5) {
        setSurfer((prev) => {
          return {
            ...prev,
            frameX: prev.frameX + 1,
          };
        });
      } else {
        setSurfer((prev) => {
          return {
            ...prev,
            frameX: 0,
          };
        });
      }
    }
  };

  return {
    drawSurfer,
    surferAnimation,
    surfer,
  };
};
