/** @format */

import { useState } from "react";
// import obstaclePic from "../../../../sprite/Stones.png";
import obstaclePic from "../../../../sprite/stones-sprite.png";
import { settings } from "../../settings";

// import { speed } from "../../../../store/gameplaySlice";
import { gameSpeed } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";
import { randomMinMax } from "../../../../utils/randomMinMax";
import { pickupsArray } from "./useHandlePickups";
import { failSpawnPosition } from "./utils/failSpawnPosition";
import { playerObject } from "../../../../store/playerObjectSlice";

export const obstaclesArray = [];

export const useHandleObstacles = () => {
  const { board } = useSelector(playerObject);
  const obstacleImage = new Image();
  obstacleImage.src = obstaclePic;
  const speed = useSelector(gameSpeed);

  const [obstaclesSpeed, setObstaclesSpeed] = useState(
    settings.obstacles.speed * speed
  );

  // not sure if this actually will be modified, so state seems unnecessary
  const obstaclesSpawnRate = settings.obstacles.spawnRate;
  // const [obstaclesSpawnRate, setObstaclesSpawnRate] = useState(
  //   settings.obstacles.spawnRate
  // );

  const speedModifier = 0.35;

  const drawObstacle = (context, x, y, s, frame) => {
    context.drawImage(obstacleImage, 0, frame * 24, 24, 24, x, y, s, s);
  };

  const updateObstacle = (context, o, playerObject) => {
    switch (board.moving) {
      case "right":
        setObstaclesSpeed(
          settings.obstacles.speedModifier.playerObjectMovement.right *
            speed *
            speedModifier
        );
        break;

      case "left":
        setObstaclesSpeed(
          settings.obstacles.speedModifier.playerObjectMovement.left *
            speed *
            speedModifier
        );
        break;

      default:
        setObstaclesSpeed(settings.obstacles.speed * speed * speedModifier);
        break;
    }
    o.x = o.x - obstaclesSpeed;
    drawObstacle(context, o.x, o.y, o.size, o.frame);
  };

  const updateObstacles = (context, frame, playerObject) => {
    const timeToSpawn = frame % obstaclesSpawnRate === 0;
    if (timeToSpawn) {
      const size = randomMinMax(
        settings.obstacles.minimumSize,
        settings.obstacles.maximumSize
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

      if (obstaclesArray.length > 30) {
        obstaclesArray.pop();
      }

      obstaclesArray.unshift({
        x: x,
        y: y,
        size: size,
        frame: Math.floor(Math.random() * 3),
      });
    }

    for (let i = 0; i < obstaclesArray.length; i++) {
      updateObstacle(context, obstaclesArray[i], playerObject);
    }
  };

  return {
    updateObstacles,
  };
};
