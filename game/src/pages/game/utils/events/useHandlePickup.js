/** @format */

import { checkIfHit } from "../../../../utils/checkIfHit";
// import { pickUpsArray } from "../spawners/useHandleSpawners";
import { pickupsArray } from "../spawners/useHandlePickups";

export const useHandlePickup = () => {
  const handlePickup = (boatEdges) => {
    let collision = false;
    pickupsArray.forEach((o) => {
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
    handlePickup,
  };
};
