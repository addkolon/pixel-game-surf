/** @format */

import { useDispatch, useSelector } from "react-redux";

import boardSprite from "../../../../sprite/board-sprite-2.png";
import boardFoamSprite from "../../../../sprite/board-foam-sprite.png";
import surferSprite from "../../../../sprite/surfer.png";
import boardTrailSprite from "../../../../sprite/foam-trail.png";

import {
  animateBoard,
  animateBoardFoam,
  animateSurfer,
  playerObject,
  popBoardTrail,
  pushBoardTrail,
} from "../../../../store/playerObjectSlice";
import { useHandleMovement } from "./utils/movePlayerObject";
import { settings } from "../../../../config/settings";
import { useEffect } from "react";

export const useHandlePlayerObject = () => {
  const dispatch = useDispatch();
  const { board, boardFoam, surfer, hitbox, boardTrail } =
    useSelector(playerObject);

  const boardImage = new Image();
  boardImage.src = boardSprite;
  const boardFoamImage = new Image();
  boardFoamImage.src = boardFoamSprite;
  const surferImage = new Image();
  surferImage.src = surferSprite;

  const boardTrailImage = new Image();
  boardTrailImage.src = boardTrailSprite;

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

  const drawBoardTrail = (context) => {
    let trailSize = boardTrail[boardTrail.length - 1];

    for (let i = 0; i < boardTrail.length; i++) {
      context.drawImage(
        boardTrailImage,
        0,
        0,
        boardTrail[i].width,
        boardTrail[i].height,
        // boardFoam.x + 15,
        // board.y - board.height / 2,
        boardTrail[i].x,
        boardTrail[i].y + i * 0.7,

        // boardTrail[i].width / 2,
        // boardTrail[i].height / 2
        trailSize.width / 2.5,
        trailSize.height / 2.5
      );

      if (trailSize.width > 0 && trailSize.height > 0)
        trailSize = {
          width: trailSize.width * 0.95,
          height: trailSize.height * 0.95,
        };
    }
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
    drawBoardTrail(context);
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

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("This will be called");
      dispatch(popBoardTrail());
    }, 30);
    return () => clearInterval(interval);
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     console.log("This will be called22222222222");
  //     dispatch(pushBoardTrail());
  //   }, 500);
  //   return () => clearInterval(interval);
  // }, []);

  return {
    drawPlayerObject,
    movePlayerObject,
    playerObjectAnimations,
    hitbox,
  };
};
