/** @format */

import { useState } from "react";
import obstaclePic from "../../../../sprite/Stones.png";
import { settings } from "../../settings";

// import { speed } from "../../../../store/gameplaySlice";
import { speed } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";
import { randomMinMax } from "../../../../utils/randomMinMax";
import { pickupsArray } from "./useHandlePickups";

export const obstaclesArray = [];

export const useHandleObstacles = () => {
  const obstacleImage = new Image();
  obstacleImage.src = obstaclePic;

  const speed = useSelector(speed);

  const [obstaclesSpeed, setObstaclesSpeed] = useState(
    settings.stones.speed * speed
  );
  const [obstaclesSpawnRate, setObstaclesSpawnRate] = useState(
    settings.stones.spawnRate
  );

  const speedModifier = 0.35;

  const drawObstacle = (context, x, y, s) => {
    context.drawImage(obstacleImage, x, y, s, s);
  };

  const updateObstacle = (context, o, playerObject) => {
    if (playerObject.moving) {
      if (
        playerObject.moving === "right" &&
        playerObject.x < settings.canvasWidth - playerObject.width
      ) {
        setObstaclesSpeed(
          settings.obstacles.speedModifier.playerObjectMovement.right *
            speed *
            speedModifier
        );
      }
      if (playerObject.moving === "left") {
        setObstaclesSpeed(
          settings.obstacles.speedModifier.playerObjectMovement.left *
            speed *
            speedModifier
        );
      }
      if (playerObject.moving === "down") {
        setObstaclesSpeed(settings.obstacles.speed * speed * speedModifier);
      }
      if (playerObject.moving === "up") {
        setObstaclesSpeed(settings.obstacles.speed * speed * speedModifier);
      }
    } else {
      setObstaclesSpeed(settings.obstacles.speed * speed * speedModifier);
    }
    o.x = o.x - obstaclesSpeed;
    drawObstacle(context, o.x, o.y, o.size);
  };

  const updateObstacles = (context, frame, playerObject) => {
    if (frame % obstaclesSpawnRate === 0) {
      const size = randomMinMax(
        settings.obstacles.minimumSize,
        settings.obstacles.maximumSize
      );
      let y = randomMinMax(
        settings.background.height,
        settings.canvasHeight - size
      );
      const x = settings.canvasWidth;

      while (
        pickupsArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0 ||
        obstaclesArray.filter((s) => {
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

      if (obstaclesArray.length > 30) {
        obstaclesArray.pop();
      }

      obstaclesArray.unshift({
        x: x,
        y: y,
        size: size,
      });
    }
    obstaclesArray.forEach((o) => {
      updateObstacle(context, o, playerObject);
    });
  };

  return {
    updateObstacles,
  };
};
