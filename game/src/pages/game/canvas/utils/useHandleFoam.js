/** @format */

import { useState } from "react";
import foamSprite from "../../../../sprite/foam.png";
import { settings } from "../../settings";

export const useHandleFoam = () => {
  const foamImage = new Image();
  foamImage.src = foamSprite;

  const [foam, setFoam] = useState({
    image: foamImage,
    x: 0,
    y: 60,
    width: 275,
    height: 175,
    frameX: 0,
    frameY: 0,
    animationSpeed: settings.boat.animationSpeed,
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
  return {
    drawFoam,
  };
};
