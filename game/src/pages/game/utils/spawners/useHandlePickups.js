/** @format */

import { useState } from "react";

import pickUpPic from "../../../../sprite/pick-up.png";

// import { speed } from "../../../../store/gameplaySlice";
import { settings } from "../../settings";

import { gameSpeed } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";
import { randomMinMax } from "../../../../utils/randomMinMax";
import { obstaclesArray } from "./useHandleObstacles";

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
    if (frame % pickupsSpawnRate === 0) {
      const size = randomMinMax(
        settings.pickups.minimumSize,
        settings.pickups.maximumSize
      );

      let y = randomMinMax(
        settings.background.height,
        settings.canvasHeight - size
      );

      const x = settings.canvasWidth;

      while (
        obstaclesArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0 ||
        pickupsArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0
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
    pickupsArray.forEach((o) => {
      updatePickup(context, o, playerObject);
    });
  };

  return {
    updatePickups,
  };
};
