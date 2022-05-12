/** @format */

import { useState } from "react";
import foamSprite from "../../../sprite/foam-sprite.png";
import { settings } from "../settings";

export const useHandleFoam = () => {
  const foamImage = new Image();
  foamImage.src = foamSprite;

  // frame width 351

  const [foam, setFoam] = useState({
    image: foamImage,
    x: 0,
    y: 60,
    width: 300,
    height: 205,
    frameX: 0,
    frameY: 0,
    animationSpeed: settings.foam.animationSpeed,
  });

  const drawFoam = (context) => {
    context.drawImage(
      foam.image,
      foam.frameX * foam.width,
      foam.frameY * foam.height,
      foam.width,
      foam.height,
      foam.x,
      foam.y,
      foam.width,
      foam.height
    );
  };

  const foamAnimation = (frame) => {
    if (frame % settings.foam.animationSpeed === 0) {
      setFoam((prev) => {
        return {
          ...prev,
          frameX: prev.frameX < 5 ? prev.frameX + 1 : 0,
        };
      });
    }
  };
  return {
    foam,
    drawFoam,
    foamAnimation,
  };
};
