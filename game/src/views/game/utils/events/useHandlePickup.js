/** @format */

import { useDispatch, useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import { handleHit, spawners } from "../../../../store/spawnersSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";
import { useSounds } from "../sounds/useSounds";
import { pickup } from "../../../../store/soundSlice";

export const useHandlePickup = () => {
 const dispatch = useDispatch();
 const { hitbox } = useSelector(playerObject);
 const { pickups } = useSelector(spawners);

 const  pickupSound  = useSelector(pickup);

 const { playPickupSound } = useSounds();

 const handlePickup = () => {
  let collision = false;
  pickups.forEach((o, i) => {
   const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
   if (hit) {
    if (pickupSound.enabled) {
        playPickupSound();
    }
    dispatch(handleHit({ index: i, arr: "pickups" }));
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
