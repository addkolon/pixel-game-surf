/** @format */

// /** @format */
// import { useDispatch, useSelector } from "react-redux";
// import boardFoamSprite from "../../../../sprite/board-foam-sprite.png";
// import { board, boardFoam1 } from "../../../../store/playerObjectSlice";
// import { settings } from "../../settings";
// export const useHandleBoardFoam = () => {
//   const dispatch = useDispatch();
//   const boardFoam = useSelector(boardFoam1);
//   const playerObject = useSelector(board);

//   const boardFoamImage = new Image();
//   boardFoamImage.src = boardFoamSprite;

//   const drawBoardFoam = (context, boat) => {
//     context.drawImage(
//       boardFoamImage,
//       boardFoam.frameX * boardFoam.width,
//       boardFoam.frameY * boardFoam.height,
//       boardFoam.width,
//       boardFoam.height,
//       playerObject.x - settings.boardFoam.alignmentX,
//       playerObject.y - settings.boardFoam.alignmentY,
//       boardFoam.width,
//       boardFoam.height
//     );
//   };
//   // const boardFoamAnimation = (frame) => {
//   //   if (frame % settings.boardFoam.animationSpeed === 0) {
//   // dispatch(animateBoard());
//   //   }
//   // };
//   return {
//     boardFoam,
//     drawBoardFoam,
//     // boardFoamAnimation,
//   };
// };
