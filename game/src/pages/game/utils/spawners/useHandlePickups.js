/** @format */

import { useState } from "react";

import pickUpPic from "../../../../sprite/pick-up1.png";

// import { speed } from "../../../../store/gameplaySlice";
import { settings } from "../../settings";

import { gameSpeed } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";
import { randomMinMax } from "../../../../utils/randomMinMax";
import { obstaclesArray } from "./useHandleObstacles";
import { failSpawnPosition } from "./utils/failSpawnPosition";

export const pickupsArray = [];

export const useHandlePickups = () => {
  const pickupImage = new Image();
  pickupImage.src = pickUpPic;

  const speed = useSelector(gameSpeed);

  const [pickupsSpeed, setPickupsSpeed] = useState(
    settings.pickups.speed * speed
  );
  const [pickupsSpawnRate, setPickupsSpawnRate] = useState(
    settings.pickups.spawnRate
  );

  const speedModifier = 0.35;

  const drawPickup = (context, x, y, s) => {
    context.drawImage(pickupImage, x, y, s, s);
  };

  const updatePickup = (context, o, playerObject) => {
    if (playerObject.moving) {
      if (playerObject.moving === "down" || playerObject.moving === "up") {
        setPickupsSpeed(settings.pickups.speed * speed * speedModifier);
      } else {
        if (
          playerObject.moving === "right" &&
          playerObject.x < settings.canvasWidth - playerObject.width
        ) {
          setPickupsSpeed(
            settings.pickups.speedModifier.playerObjectMovement.right *
              speed *
              speedModifier
          );
        }
        if (playerObject.moving === "left") {
          setPickupsSpeed(
            settings.pickups.speedModifier.playerObjectMovement.left *
              speed *
              speedModifier
          );
        }
      }
    } else {
      setPickupsSpeed(settings.pickups.speed * speed * speedModifier);
    }
    o.x = o.x - pickupsSpeed;
    drawPickup(context, o.x, o.y, o.size);
  };

  const updatePickups = (context, frame, playerObject) => {
    const timeToSpawn = frame % pickupsSpawnRate === 0;
    if (timeToSpawn) {
      const size = randomMinMax(
        settings.pickups.minimumSize,
        settings.pickups.maximumSize
      );
      const x = settings.canvasWidth;
      let y = randomMinMax(
        settings.background.height,
        settings.canvasHeight - size
      );

      while (
        failSpawnPosition(pickupsArray, x, y) ||
        failSpawnPosition(obstaclesArray, x, y)
      ) {
        y = randomMinMax(
          settings.background.height,
          settings.canvasHeight - size
        );
      }

      if (pickupsArray.length > 30) {
        pickupsArray.pop();
      }

      pickupsArray.unshift({
        x: x,
        y: y,
        size: size,
      });
    }

    for (let i = 0; i < pickupsArray.length; i++) {
      updatePickup(context, pickupsArray[i], playerObject);
    }
  };

  return {
    updatePickups,
  };
};
