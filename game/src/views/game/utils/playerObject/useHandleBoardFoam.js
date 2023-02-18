/** @format */

import { useState } from "react";
import boardFoamSprite from "../../../../sprite/board-foam-sprite.png";
import { settings } from "../../settings";

 const useHandleBoardFoam = () => {
  const boardFoamImage = new Image();
  boardFoamImage.src = boardFoamSprite;

  // frame width 351

  const [boardFoam, setBoardFoam] = useState({
    image: foamImage,
    x: 0,
    y: 60,
    // width: 275,
    // height: 175,
    width: 84,
    height: 39,
    frameX: 0,
    frameY: 0,
    animationSpeed: settings.boat.animationSpeed,
  });

  const drawBoardFoam = (context) => {
    context.drawImage(
      boardFoam.image,
      boardFoam.frameX * boardFoam.width,
      boardFoam.frameY * boardFoam.height,
      boardFoam.width,
      boardFoam.height,
      boardFoam.x,
      boardFoam.y,
      boardFoam.width,
      boardFoam.height
    );
  };

  const boardFoamAnimation = (frame) => {
    if (frame % settings.boardFoam.animationSpeed === 0) {
      setBoardFoam((prev) => {
        return {
          ...prev,
          frameX: prev.frameX < 5 ? prev.frameX + 1 : 0,
        };
      });
    }
  };
  return {
    boardFoam,
    drawBoardFoam,
    boardFoamAnimation,
  };
};
