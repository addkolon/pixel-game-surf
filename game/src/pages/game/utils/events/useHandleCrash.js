/** @format */

import { useDispatch, useSelector } from "react-redux";
import { playerObject } from "../../../../store/playerObjectSlice";
import {
  animateBoom,
  handleHit,
  spawners,
} from "../../../../store/spawnersSlice";
import { checkIfHit } from "../../../../utils/checkIfHit";

import boomSprite from "../../../../sprite/Boom.png";
import { settings } from "../../settings";

export const useHandleCrash = () => {
  const dispatch = useDispatch();
  const { obstacles, boom } = useSelector(spawners);
  const { hitbox } = useSelector(playerObject);

  const boomImage = new Image();
  boomImage.src = boomSprite;

  const drawBoom = (context) => {
    for (let i = 0; i < boom.length; i++) {
      context.drawImage(
        boomImage,
        boom[i].frameX * boom[i].width,
        boom[i].frameY * boom[i].height,
        boom[i].width,
        boom[i].height,
        boom[i].x,
        boom[i].y,
        boom[i].width,
        boom[i].height
      );
    }
  };

  const boomAnimation = (frame) => {
    if (frame % settings.obstacles.boomAnimationSpeed === 0) {
      dispatch(animateBoom());
    }
  };

  const handleCrash = () => {
    let collision = false;
    obstacles.forEach((o, i) => {
      const hit = checkIfHit(hitbox, o.x, o.y, o.size, o.size);
      if (hit) {
        dispatch(handleHit({ arr: "obstacles", data: { obj: o, index: i } }));
        collision = true;
        return;
      }
    });
    return collision;
  };

  return {
    handleCrash,
    drawBoom,
    boomAnimation,
  };
};
