/** @format */

import { useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";
import { obstaclesArray } from "../spawners/useHandleObstacles";

// OLD
// export const useHandleCrashes = () => {
//   const handleCrashes = (boat) => {
//     let hit = false;
//     obstacleArray.forEach((o) => {
//       let boatWidth = boat.frameY === 0 || boat.frameY === 2 ? boat.width : 125;
//       if (
//         boat.x < o.x + o.size &&
//         boat.x + boatWidth > o.x &&
//         boat.y < o.y + o.size &&
//         boat.y + boat.height > o.y
//       ) {
//         o.y = 1000;
//         console.log("hit");
//         hit = true;
//       }
//     });
//     return hit;
//   };

//   return {
//     handleCrashes,
//   };
// };

// NEW
export const useHandleCrash = () => {
  const { hitbox } = useSelector(playerObject);
  // console.log(hitbox);

  const handleCrash = (edges) => {
    let collision = false;
    obstaclesArray.forEach((o) => {
      const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
      if (hit) {
        o.y = 1000;
        collision = true;
        return;
      }
    });
    return collision;
  };

  return {
    handleCrash,
  };
};
