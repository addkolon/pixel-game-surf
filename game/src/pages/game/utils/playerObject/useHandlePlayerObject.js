/** @format */

import { useState } from "react";

import boardSprite from "../../../../sprite/board-sprite.png";
import boardFoamSprite from "../../../../sprite/board-foam-sprite.png";
import surferSprite from "../../../../sprite/surfer.png";

// import { useHandleBackground } from "../useHandleBackground";

import { settings } from "../../settings";
import { useHandleFoam } from "../useHandleFoam";

import {
  animateBoard,
  animateSurfer,
  move,
  playerObject,
} from "../../../../store/playerObjectSlice";
import { useDispatch, useSelector } from "react-redux";
import { gameSpeed, updateSpeed } from "../../../../store/gameplaySlice";

export const useHandlePlayerObject = () => {
  const dispatch = useDispatch();
  const { board, boardFoam, surfer, hitbox } = useSelector(playerObject);
  const { speed } = useSelector(gameSpeed);
  // images
  const boardImage = new Image();
  boardImage.src = boardSprite;
  const boardFoamImage = new Image();
  boardFoamImage.src = boardFoamSprite;
  const surferImage = new Image();
  surferImage.src = surferSprite;

  const { foam } = useHandleFoam();

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
      board.x - settings.boardFoam.alignmentX,
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
      board.x + settings.surfer.alignmentOnBoardX,
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

  const movePlayerObject = (keysArray) => {
    if (keysArray.length !== 0) {
      if (keysArray.includes("ArrowUp")) {
        const onCanvas = board.y > settings.background.height;

        // huvud under foam
        const check1 = () => {
          return board.x + settings.surfer.alignmentOnBoardX + 5 < foam.width &&
            board.y < settings.background.height + 65
            ? true
            : false;
        };

        // huvud över men bräda under foam
        const check2 = () => {
          return board.y < settings.background.height + 15 &&
            board.x < foam.width
            ? true
            : false;
        };

        if (onCanvas && !check1() && !check2()) {
          dispatch(move("up"));
        }
      }

      if (keysArray.includes("ArrowDown")) {
        if (board.y < settings.canvasHeight - board.height) {
          dispatch(move("down"));
        }
      }

      if (keysArray.includes("ArrowRight")) {
        if (board.x < settings.canvasWidth - board.width) {
          dispatch(move("right"));
        }
      }

      if (keysArray.includes("ArrowLeft")) {
        const onCanvas = board.x > 0;

        // board over foam
        const check1 = () => {
          return board.y < settings.background.height + 20 &&
            board.x < foam.width + 5
            ? true
            : false;
        };

        // board under foam but surfer over
        const check2 = () => {
          return board.y < settings.background.height + 64 &&
            board.x < foam.width - 30
            ? true
            : false;
        };

        if (onCanvas && !check1() && !check2()) {
          dispatch(move("left"));
        }
      }
    }
    // else {
    //   dispatch(updateSpeed(0));
    // }
  };

  const playerObjectAnimations = (frame) => {
    if (frame % settings.board.animationSpeed === 0) {
      dispatch(animateBoard());
    }
    // if (frame % settings.boardFoam.animationSpeed === 0) {
    //   dispatch(animateBoardFoam());
    // }
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
