/** @format */

import { useDispatch, useSelector } from "react-redux";
import { settings } from "../../../../config/settings";
import {
  gameScore,
  lostLives,
  updateScore,
} from "../../../../store/gameplaySlice";
import { spawners, updateSpawnersSpeed } from "../../../../store/spawnersSlice";
import { useHandleBNFground } from "../../utils/back&foregrounds/useHandleBNFground";
import { useHandleCrash } from "../../utils/events/useHandleCrash";
import { useHandlePickup } from "../../utils/events/useHandlePickup";
import { useHandlePlayerObject } from "../../utils/playerObject/useHandlePlayerObject";
import { useHandleObstacles } from "../../utils/spawners/useHandleObstacles";
import { useHandlePickups } from "../../utils/spawners/useHandlePickups";
import { useHandleFoam } from "../../utils/wave/useHandleFoam";

export const useFrameUpdates = () => {
  const dispatch = useDispatch();

  const score = useSelector(gameScore);
  const { boom } = useSelector(spawners);

  const { movePlayerObject, drawPlayerObject, playerObjectAnimations } =
    useHandlePlayerObject();
  const { drawFoam, foamAnimation } = useHandleFoam();
  const { updateObstacles } = useHandleObstacles();
  const { updatePickups, pickupAnimations } = useHandlePickups();
  const { handleCrash, drawBoom, boomAnimation } = useHandleCrash();
  const { handlePickup } = useHandlePickup();
  const { updateBackground, updateForeground } = useHandleBNFground();

  const frameUpdates = (canvasRef, frame, keysArray) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

    updateBackground(context);

    if (frame > settings.startGameSpawnDelay * 2 * 10) {
      updatePickups(context, frame);
      pickupAnimations(frame);
      updateObstacles(context, frame);
    }

    drawPlayerObject(context);
    playerObjectAnimations(frame);
    movePlayerObject(keysArray);

    if (boom.length > 0) {
      drawBoom(context);
      boomAnimation(frame);
    }

    drawFoam(context);
    foamAnimation(frame);

    updateForeground(context);

    if (handleCrash()) {
      dispatch(lostLives());
    }

    if (handlePickup()) {
      dispatch(updateScore());

      // SVÅRIGHET ÖKAR PÅ SAVES
      if (
        score % (settings.difficulty.savings.saves * settings.scorePerSave) ===
          0 &&
        settings.difficulty.savings.saves !== 0 &&
        score !== 0
      ) {
        dispatch(updateSpawnersSpeed());
      }
    }
  };

  // SVÅRIGHET ÖKAR PÅ TID START
  // if (frame % (settings.difficulty.timer.seconds * 65) === 0) {
  //   dispatch(updateSpawnersSpeed());
  // }

  return {
    frameUpdates,
  };
};
