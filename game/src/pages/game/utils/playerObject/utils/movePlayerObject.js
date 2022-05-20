/** @format */

import { useDispatch, useSelector } from "react-redux";
import { move, playerObject } from "../../../../../store/playerObjectSlice";
import { settings } from "../../../settings";
import { useHandleFoam } from "../../useHandleFoam";

export const useHandleMovement = () => {
  const dispatch = useDispatch();
  const { board } = useSelector(playerObject);
  const { foam } = useHandleFoam();

  const movePlayerObject = (keysArray) => {
    if (keysArray.length !== 0) {
      if (keysArray.includes("ArrowUp")) {
        const onCanvas = board.y > settings.background.height;

        const check1 = () => {
          return board.x + settings.surfer.alignmentOnBoardX <
            foam.width - 30 && board.y < settings.background.height + 65
            ? true
            : false;
        };
        const check2 = () => {
          return board.x + settings.surfer.alignmentOnBoardX >
            foam.width - 33 &&
            board.x < foam.width - 1 &&
            board.y < settings.background.height + 80
            ? true
            : false;
        };

        if (onCanvas) {
          if (!check1() && check2()) {
            dispatch(move("rightUp"));
          } else if (!check1()) {
            dispatch(move("up"));
          }
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

        const check1 = () => {
          return board.y < settings.background.height + 64 &&
            board.x < foam.width - 50
            ? true
            : false;
        };

        if (onCanvas) {
          if (!check1()) {
            dispatch(move("left"));
          } else {
            dispatch(move("leftDown"));
          }
        }
      }
    }
  };
  return {
    movePlayerObject,
  };
};
