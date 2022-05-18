/** @format */

import { useSelector } from "react-redux";
import { spawners } from "../../../../store/spawnersSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";
// import { pickUpsArray } from "../spawners/useHandleSpawners";

export const useHandlePickup = () => {
  const { pickups } = useSelector(spawners);
  const handlePickup = (boatEdges) => {
    let collision = false;
    pickups.forEach((o) => {
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
