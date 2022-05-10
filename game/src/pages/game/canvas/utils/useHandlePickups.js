/** @format */

import { checkIfHit } from "../../../../utils/checkIfHit";
import { pickUpsArray } from "./useHandleSpawners";

export const useHandlePickups = () => {
  const handlePickups = (boatEdges) => {
    let collision = false;
    pickUpsArray.forEach((o) => {
      const hit = checkIfHit(boatEdges, o.x, o.y, o.size, o.size);
      if (hit) {
        o.y = 1000;
        collision = true;
        return;
      }
    });
    return collision;
  };

  return {
    handlePickups,
  };
};
