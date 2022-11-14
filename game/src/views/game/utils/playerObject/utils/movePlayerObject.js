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
      dispatch(move({direction: "rightUp", reset: false}));
     } else if (!check1()) {
      dispatch(move({direction: "up", reset: false}));
     } 
    //  else if (check1()) {
    //   dispatch(move("na"))
    //  }
    } 
   }

    //  test
    if (board.speedUp > 0 && !keysArray.includes("ArrowUp")) {
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
     if (!check1() && check2()) {
      dispatch(move({direction: "rightUpslow", reset: false}));
     } else if (!check1()) {
      dispatch(move({direction: "slowup", reset: false}));
     } else if (check1()) {
      dispatch(move({direction: "up", reset: true}))
     }
    } else {
      dispatch(move({direction: "up", reset: true}))
    }
    }
    if (board.speedDown > 0 && !keysArray.includes("ArrowDown")) {
      if (board.y < settings.canvasHeight - board.height - 30) {
        dispatch(move({direction: "slowdown", reset: false}));
       }else {
        dispatch(move({direction: 'down', reset: true}))
      }
    }
  if (board.speedRight > 0 && !keysArray.includes("ArrowRight")) {
    console.log('trigger slowright');
    if (board.x < settings.canvasWidth - board.width) {
      dispatch(move({direction: "slowright", reset: false}));
    } else {
      dispatch(move({direction: 'right', reset: true}))
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
      dispatch(move({direction: "slowleft", reset: false}));
     } else {
      dispatch(move({direction: "slowleftDown", reset: false}));
     }
    } else {
      dispatch(move({direction: 'left', reset: true}))
    }
  }

  // --


   if (keysArray.includes("ArrowDown")) {
    if (board.y < settings.canvasHeight - board.height - 30) {
     dispatch(move({direction: "down", reset: false}));
    }
   }

   if (keysArray.includes("ArrowRight")) {
    if (board.x < settings.canvasWidth - board.width) {
     dispatch(move({direction: "right", reset: false}));
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
     if (!check1()) {
      dispatch(move({direction: "left", reset: false}));
     } else {
      dispatch(move({direction: "leftDown", reset: false}));
     }
    } else {
      dispatch(move({direction: "left", reset: true}))
    }
   }
  // }
 };
 return {
  movePlayerObject,
 };
};
