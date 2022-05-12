/** @format */

// /** @format */
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import surferSprite from "../../../../sprite/surfer.png";
// import {
//   animateSurfer,
//   board,
//   surfer1,
// } from "../../../../store/playerObjectSlice";

// import { settings } from "../../settings";
// import { useHandlePlayerObject } from "./useHandlePlayerObject";

// export const useHandleSurfer = () => {
//   const dispatch = useDispatch();

//   const surfer = useSelector(surfer1);
//   const playerObject = useSelector(board);

//   const surferImage = new Image();
//   surferImage.src = surferSprite;

//   const drawSurfer = (context) => {
//     context.drawImage(
//       surferImage,
//       surfer.frameX * surfer.width,
//       surfer.frameY * surfer.height,
//       surfer.width,
//       surfer.height,
//       playerObject.x + settings.surfer.alignmentOnBoardX,
//       playerObject.y - settings.surfer.alignmentOnBoardY,
//       surfer.width,
//       surfer.height
//     );
//   };

//   const surferAnimation = (frame) => {
//     if (frame % settings.surfer.animationSpeed === 0) {
//       dispatch(animateSurfer());
//     }
//   };

//   return {
//     drawSurfer,
//     surferAnimation,
//     surfer,
//   };
// };
