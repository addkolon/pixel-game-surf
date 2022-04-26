/** @format */

import { pickUpsArray } from "./useHandleSpawners";

export const useHandlePickups = () => {
  const handlePickups = (boat) => {
    let hit = false;
    pickUpsArray.forEach((o) => {
      let boatWidth = boat.frameY === 0 || boat.frameY === 2 ? boat.width : 125;
      if (
        boat.x < o.x + o.size &&
        boat.x + boatWidth > o.x &&
        boat.y < o.y + o.size &&
        boat.y + boat.height > o.y
      ) {
        o.y = 1000;
        hit = true;
      }
    });
    return hit;
  };

  return {
    handlePickups,
  };
};
