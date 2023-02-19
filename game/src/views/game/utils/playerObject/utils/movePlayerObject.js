/** @format */

import { useDispatch, useSelector } from "react-redux";
import { settings } from "../../../../../config/settings";
import { move, playerObject } from "../../../../../store/playerObjectSlice";
import { useHandleFoam } from "../../wave/useHandleFoam";

import { lives as sliceLives } from "../../../../../store/gameplaySlice";

export const useHandleMovement = () => {
  const dispatch = useDispatch();
  const { board } = useSelector(playerObject);

  const lives = useSelector(sliceLives);

  const Yframe = settings.lives - lives.length;

  const { foam } = useHandleFoam();

  const movePlayerObject = (keysArray) => {
    if (keysArray.includes("ArrowUp")) {
      const onCanvas = board.y > settings.background.height;

      const check1 = () => {
        return board.x + settings.surfer.alignmentOnBoardX < foam.width - 30 &&
          board.y < settings.background.height + 65
          ? true
          : false;
      };
      const check2 = () => {
        return board.x + settings.surfer.alignmentOnBoardX > foam.width - 33 &&
          board.x < foam.width - 1 &&
          board.y < settings.background.height + 80
          ? true
          : false;
      };

      if (onCanvas) {
        if (!check1() && check2()) {
          dispatch(
            move({
              direction: "rightUp",
              reset: false,
              lives: Yframe,
            })
          );
        } else if (!check1()) {
          dispatch(move({ direction: "up", reset: false, lives: Yframe }));
        }
      }
    }

    if (keysArray.includes("ArrowDown")) {
      if (board.y < settings.canvasHeight - board.height - 30) {
        dispatch(move({ direction: "down", reset: false, lives: Yframe }));
      }
    }

    if (keysArray.includes("ArrowRight")) {
      if (board.x < settings.canvasWidth - board.width) {
        dispatch(move({ direction: "right", reset: false, lives: Yframe }));
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
          dispatch(move({ direction: "left", reset: false, lives: Yframe }));
        } else {
          dispatch(
            move({
              direction: "leftDown",
              reset: false,
              lives: Yframe,
            })
          );
        }
      } else {
        dispatch(move({ direction: "left", reset: true, lives: Yframe }));
      }
    }

    if (board.speedUp > 0 && !keysArray.includes("ArrowUp")) {
      const onCanvas = board.y > settings.background.height;

      const check1 = () => {
        return board.x + settings.surfer.alignmentOnBoardX < foam.width - 30 &&
          board.y < settings.background.height + 65
          ? true
          : false;
      };
      const check2 = () => {
        return board.x + settings.surfer.alignmentOnBoardX > foam.width - 33 &&
          board.x < foam.width - 1 &&
          board.y < settings.background.height + 80
          ? true
          : false;
      };

      if (onCanvas) {
        if (!check1() && check2()) {
          dispatch(
            move({
              direction: "rightUpslow",
              reset: false,
              lives: Yframe,
            })
          );
        } else if (!check1()) {
          dispatch(move({ direction: "slowup", reset: false, lives: Yframe }));
        } else if (check1()) {
          dispatch(move({ direction: "up", reset: true, lives: Yframe }));
        }
      } else {
        dispatch(move({ direction: "up", reset: true, lives: Yframe }));
      }
    }

    if (board.speedDown > 0 && !keysArray.includes("ArrowDown")) {
      if (board.y < settings.canvasHeight - board.height - 30) {
        dispatch(move({ direction: "slowdown", reset: false, lives: Yframe }));
      } else {
        dispatch(move({ direction: "down", reset: true, lives: Yframe }));
      }
    }
    if (board.speedRight > 0 && !keysArray.includes("ArrowRight")) {
      if (board.x < settings.canvasWidth - board.width) {
        dispatch(
          move({
            direction: "slowright",
            reset: false,
            lives: Yframe,
          })
        );
      } else {
        dispatch(move({ direction: "right", reset: true, lives: Yframe }));
      }
    }
    if (board.speedLeft > 0 && !keysArray.includes("ArrowLeft")) {
      const onCanvas = board.x > 0;

      const check1 = () => {
        return board.y < settings.background.height + 64 &&
          board.x < foam.width - 50
          ? true
          : false;
      };

      if (onCanvas) {
        if (!check1()) {
          dispatch(
            move({
              direction: "slowleft",
              reset: false,
              lives: Yframe,
            })
          );
        } else {
          dispatch(
            move({
              direction: "slowleftDown",
              reset: false,
              lives: Yframe,
            })
          );
        }
      } else {
        dispatch(move({ direction: "left", reset: true, lives: Yframe }));
      }
    }
  };
  return {
    movePlayerObject,
  };
};
