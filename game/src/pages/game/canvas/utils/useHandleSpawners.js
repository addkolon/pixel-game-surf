/** @format */

import { useState } from "react";
import obstaclePic from "../../../../sprite/Stones.png";
import pickUpPic from "../../../../sprite/Person.png";
import { settings } from "../../settings";

import { speed } from "../../../../store/gameplaySlice";
import { useSelector } from "react-redux";

export const obstacleArray = [];
export const pickUpsArray = [];
export const useHandleSpawners = () => {
  const speed = useSelector((state) => state.gameplay.speed);
  const obstacle = new Image();
  obstacle.src = obstaclePic;
  const pickUp = new Image();
  pickUp.src = pickUpPic;
  const speedModifier = 0.35;
  const [obstaclesSpeed, setObstaclesSpeed] = useState(
    settings.stones.speed * speed
  );
  const [obstaclesSpawnRate, setObstaclesSpawnRate] = useState(
    settings.stones.spawnRate
  );

  const [pickUpsSpeed, setPickUpsSpeed] = useState(
    settings.drowningPeople.speed * speed
  );
  const [pickUpsSpawnRate, setPickUpsSpawnRate] = useState(
    settings.drowningPeople.spawnRate
  );

  const drawObstacle = (context, x, y, s) => {
    context.drawImage(obstacle, x, y, s, s);
  };

  const updateObstacle = (context, o, boat) => {
    if (boat.moving) {
      if (
        boat.moving === "right" &&
        boat.x < settings.canvasWidth - boat.width
      ) {
        setObstaclesSpeed(
          settings.stones.speedModifier.boatMovement.right *
            speed *
            speedModifier
        );
      }
      if (boat.moving === "left") {
        setObstaclesSpeed(
          settings.stones.speedModifier.boatMovement.left *
            speed *
            speedModifier
        );
      }
      if (boat.moving === "down") {
        setObstaclesSpeed(settings.stones.speed * speed * speedModifier);
      }
      if (boat.moving === "up") {
        setObstaclesSpeed(settings.stones.speed * speed * speedModifier);
      }
    } else {
      setObstaclesSpeed(settings.stones.speed * speed * speedModifier);
    }
    o.x = o.x - obstaclesSpeed;
    drawObstacle(context, o.x, o.y, o.size);
  };

  const drawPickUp = (context, x, y, s) => {
    context.drawImage(pickUp, x, y, s, s);
  };

  const updatePickUp = (context, o, boat) => {
    if (boat.moving) {
      if (
        boat.moving === "right" &&
        boat.x < settings.canvasWidth - boat.width
      ) {
        setPickUpsSpeed(
          settings.drowningPeople.speedModifier.boatMovement.right *
            speed *
            speedModifier
        );
      }
      if (boat.moving === "left") {
        setPickUpsSpeed(
          settings.drowningPeople.speedModifier.boatMovement.left *
            speed *
            speedModifier
        );
      }
      if (boat.moving === "down") {
        setPickUpsSpeed(settings.drowningPeople.speed * speed * speedModifier);
      }
      if (boat.moving === "up") {
        setPickUpsSpeed(settings.drowningPeople.speed * speed * speedModifier);
      }
    } else {
      setPickUpsSpeed(settings.drowningPeople.speed * speed * speedModifier);
    }
    o.x = o.x - pickUpsSpeed;
    drawPickUp(context, o.x, o.y, o.size);
  };

  const updateObstacles = (context, frame, boat) => {
    if (frame % obstaclesSpawnRate === 0) {
      const random = (min, max) =>
        Math.floor(Math.random() * (max - min)) + min;

      let y =
        Math.random() *
          (settings.canvasHeight - settings.background.height - 50) +
        settings.background.height;
      let x = settings.canvasWidth;
      let size = random(
        settings.stones.minimumSize,
        settings.stones.maximumSize
      );

      while (
        pickUpsArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0 ||
        obstacleArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0
      ) {
        y =
          Math.random() *
            (settings.canvasHeight - settings.background.height - 100) +
          settings.background.height;
      }

      if (obstacleArray.length > 30) {
        obstacleArray.pop();
      }

      obstacleArray.unshift({
        x: x,
        y: y,
        size: size,
      });
    }
    obstacleArray.forEach((o) => {
      updateObstacle(context, o, boat);
    });
  };

  const updatePickups = (context, frame, boat) => {
    if (frame % pickUpsSpawnRate === 0) {
      const random = (min, max) =>
        Math.floor(Math.random() * (max - min)) + min;
      let y =
        Math.random() *
          (settings.canvasHeight - settings.background.height - 50) +
        settings.background.height;
      let x = settings.canvasWidth;
      let size = random(
        settings.drowningPeople.minimumSize,
        settings.drowningPeople.maximumSize
      );

      while (
        obstacleArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0 ||
        pickUpsArray.filter((s) => {
          return (
            x < s.x + s.size &&
            x + s.size > s.x &&
            y < s.y + s.size &&
            y + s.size > s.y
          );
        }).length > 0
      ) {
        y =
          Math.random() *
            (settings.canvasHeight - settings.background.height - 100) +
          settings.background.height;
      }

      if (pickUpsArray.length > 30) {
        pickUpsArray.pop();
      }

      pickUpsArray.unshift({
        x: x,
        y: y,
        size: size,
      });
    }
    pickUpsArray.forEach((o) => {
      updatePickUp(context, o, boat);
    });
  };

  return {
    updateObstacles,
    updatePickups,
  };
};
