/** @format */

import { useDispatch, useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import { handleHit, spawners } from "../../../../store/spawnersSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";
import { useSounds } from "../sounds/useSounds";
import { pickup } from "../../../../store/soundSlice";

export const useHandlePickup = () => {
  const dispatch = useDispatch();
  const { pickups } = useSelector(spawners);
  const { hitbox } = useSelector(playerObject);

  const pickupSound = useSelector(pickup);

  const { playPickupSound } = useSounds();

  const handlePickup = () => {
    let collision = false;

    for (let i = 0; i < pickups.length; i++) {
      const o = pickups[i];
      const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
      if (hit) {
        if (pickupSound.enabled) {
          playPickupSound();
        }
        dispatch(handleHit({ index: i, arr: "pickups" }));
        collision = true;
      }
    }
    return collision;
  };

  return {
    handlePickup,
  };
};
