/** @format */

// CV:
// app: new profile pic .com

/** @format */

import pickupPic from "../../../../sprite/pick-up1.png";
import { settings } from "../../settings";

import { useDispatch, useSelector } from "react-redux";
import {
  movePickups,
  spawners,
  spawnPickup,
} from "../../../../store/spawnersSlice";

export const useHandlePickups = () => {
  const dispatch = useDispatch();
  const { pickups } = useSelector(spawners);

  const pickupImage = new Image();
  pickupImage.src = pickupPic;

  // not sure if this actually will be modified, so state seems unnecessary
  const pickupsSpawnRate = settings.pickups.spawnRate;

  const drawPickup = (context, o) => {
    context.drawImage(
      pickupImage,
      0,
      o.frame * 24,
      24,
      24,
      o.x,
      o.y,
      o.size,
      o.size
    );
  };

  const updatePickups = (context, frame) => {
    const timeToSpawn = frame % pickupsSpawnRate === 0;
    if (timeToSpawn) {
      dispatch(spawnPickup());
    }
    dispatch(movePickups());

    for (let i = 0; i < pickups.length; i++) {
      drawPickup(context, pickups[i]);
    }
  };

  return {
    updatePickups,
  };
};
