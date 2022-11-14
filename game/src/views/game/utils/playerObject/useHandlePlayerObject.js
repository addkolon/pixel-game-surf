/** @format */

import boardSprite from "../../../../sprite/board-sprite.png";
import boardFoamSprite from "../../../../sprite/board-foam-sprite.png";
import surferSprite from "../../../../sprite/surfer.png";

import {
 animateBoard,
 animateBoardFoam,
 animateSurfer,
 playerObject,
} from "../../../../store/playerObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { updateSpeed } from "../../../../store/gameplaySlice";
import { useHandleMovement } from "./utils/movePlayerObject";
import { settings } from "../../../../config/settings";

export const useHandlePlayerObject = () => {
 const dispatch = useDispatch();
 const { board, boardFoam, surfer, hitbox } = useSelector(playerObject);
 // images
 const boardImage = new Image();
 boardImage.src = boardSprite;
 const boardFoamImage = new Image();
 boardFoamImage.src = boardFoamSprite;
 const surferImage = new Image();
 surferImage.src = surferSprite;

 const { movePlayerObject } = useHandleMovement();

 const drawBoard = (context) => {
  context.drawImage(
   boardImage,
   board.frameX * board.width,
   board.frameY * board.height,
   board.width,
   board.height,
   board.x,
   board.y,
   board.width,
   board.height
  );
 };

 const drawBoardFoam = (context) => {
  context.drawImage(
   boardFoamImage,
   boardFoam.frameX * boardFoam.width,
   boardFoam.frameY * boardFoam.height,
   boardFoam.width,
   boardFoam.height,
   boardFoam.x,
   board.y - settings.boardFoam.alignmentY,
   boardFoam.width,
   boardFoam.height
  );
 };

 const drawSurfer = (context) => {
  context.drawImage(
   surferImage,
   surfer.frameX * surfer.width,
   surfer.frameY * surfer.height,
   surfer.width,
   surfer.height,
   surfer.x,
   board.y - settings.surfer.alignmentOnBoardY,
   surfer.width,
   surfer.height
  );
 };

 const drawPlayerObject = (context) => {
  drawBoard(context);
  drawBoardFoam(context);
  drawSurfer(context);
 };

 const playerObjectAnimations = (frame) => {
  if (frame % settings.board.animationSpeed === 0) {
   dispatch(animateBoard());
  }
  if (frame % settings.boardFoam.animationSpeed === 0) {
   dispatch(animateBoardFoam());
  }
  if (frame % settings.surfer.animationSpeed === 0) {
   dispatch(animateSurfer());
  }
 };

 return {
  drawPlayerObject,
  movePlayerObject,
  playerObjectAnimations,
  hitbox,
 };
};
