/** @format */
import { useState } from "react";
import boardFoamSprite from "../../../../sprite/board-foam-sprite.png";
import { settings } from "../../settings";
export const useHandleBoardFoam = () => {
  const boardFoamImage = new Image();
  boardFoamImage.src = boardFoamSprite;
  // frame width 351
  const [boardFoam, setBoardFoam] = useState({
    image: boardFoamImage,
    // x: 0,
    // y: 60,

    x: settings.playerObject.startPositionX,
    y: settings.playerObject.startPositionY,

    // width: 275,
    // height: 175,
    width: 84,
    height: 39,
    frameX: 0,
    frameY: 0,
    animationSpeed: settings.boardFoam.animationSpeed,
  });
  const drawBoardFoam = (context, boat) => {
    context.drawImage(
      boardFoam.image,
      boardFoam.frameX * boardFoam.width,
      //   boardFoam.frameY * boardFoam.height,
      0,
      boardFoam.width,
      boardFoam.height,
      //   boardFoam.x,
      //   boardFoam.y,
      boat.x - 40,
      boat.y - 17,

      boardFoam.width,
      boardFoam.height
    );
  };
  //   const boardFoamAnimation = (frame) => {
  //     if (frame % settings.boardFoam.animationSpeed === 0) {
  //       setBoardFoam((prev) => {
  //         return {
  //           ...prev,
  //           frameX: prev.frameX < 5 ? prev.frameX + 1 : 0,
  //         };
  //       });
  //     }
  //   };
  return {
    boardFoam,
    drawBoardFoam,
    // boardFoamAnimation,
  };
};
