/** @format */

// CV:
// app: new profile pic .com

/** @format */

import pickupPic from "../../../../sprite/pick-up.png";
import { settings } from "../../settings";

import { useDispatch, useSelector } from "react-redux";
import {
  animatePickups,
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
      o.frameX * 24,
      o.frameY * 24,
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

  const pickupAnimations = (frame) => {
    if (frame % settings.pickups.animationSpeed === 0) {
      dispatch(animatePickups());
    }
  };

  return {
    updatePickups,
    pickupAnimations,
  };
};
