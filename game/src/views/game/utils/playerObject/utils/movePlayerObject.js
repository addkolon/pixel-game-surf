/** @format */

import { useDispatch, useSelector } from "react-redux";
import { settings } from "../../../../../config/settings";
import { move, playerObject } from "../../../../../store/playerObjectSlice";
import { useHandleFoam } from "../../wave/useHandleFoam";

export const useHandleMovement = () => {
 const dispatch = useDispatch();
 const { board } = useSelector(playerObject);
 const { foam } = useHandleFoam();


 const movePlayerObject = (keysArray) => {
  // if (keysArray.length !== 0) {
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
      dispatch(move("rightUp"));
     } else if (!check1()) {
      dispatch(move("up"));
     }
    }
   }

    //  test
    if (board.speedUp > 0 && !keysArray.includes("ArrowUp")) {
      console.log(board.speedUp);
      // if (board.y > settings.background.height) dispatch(move("slowup"));
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
      console.log('on can');
     if (!check1() && check2()) {
      dispatch(move("rightUpslow"));
     } else if (!check1()) {
      dispatch(move("slowup"));
     }
    } else {
      dispatch(move('na'))
    }
    }
    if (board.speedDown > 0 && !keysArray.includes("ArrowDown")) {
      if (board.y < settings.canvasHeight - board.height - 30) {
        dispatch(move("slowdown"));
       }else {
        dispatch(move('na'))
      }
    }
  if (board.speedRight > 0 && !keysArray.includes("ArrowRight")) {
    console.log('trigger slowright');
    if (board.x < settings.canvasWidth - board.width) {
      dispatch(move("slowright"));
    } else {
      dispatch(move('na'))
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
      dispatch(move("slowleft"));
     } else {
      dispatch(move("leftDown"));
     }
    } else {
      dispatch(move('na'))
    }
  }

  // --


   if (keysArray.includes("ArrowDown")) {
    if (board.y < settings.canvasHeight - board.height - 30) {
     dispatch(move("down"));
    }
   }

   if (keysArray.includes("ArrowRight")) {
    if (board.x < settings.canvasWidth - board.width) {
      console.log('triogger right');
     dispatch(move("right"));
    }
   }

  //  test
  // if (board.speedRight > 0 && !keysArray.includes("ArrowRight")) {
  //   dispatch(move("slowright"));
  // }
  // if (board.speedLeft > 0 && !keysArray.includes("ArrowLeft")) {
  //   dispatch(move("slowleft"));
  // }
  // if (board.speedUp > 0 && !keysArray.includes("ArrowUp")) {
  //   dispatch(move("slowup"));
  // }
  // if (board.speedDown > 0 && !keysArray.includes("ArrowDown")) {
  //   dispatch(move("slowdown"));
  // }
  // --

   if (keysArray.includes("ArrowLeft")) {
    const onCanvas = board.x > 0;

    const check1 = () => {
     return board.y < settings.background.height + 64 &&
      board.x < foam.width - 50
      ? true
      : false;
    };

    if (onCanvas) {
      console.log('canvas');
     if (!check1()) {
      console.log('trigger left');
      dispatch(move("left"));
     } else {
      console.log('trigger left down');
      dispatch(move("leftDown"));
     }
    } else {
      console.log('not on canvas');
      dispatch(move('na'))
    }
   }
  // }
 };
 return {
  movePlayerObject,
 };
};
