/** @format */

import { useState } from "react";
import boat3 from "../../../../sprite/board-sprite.png";
import surfer from "../../../../sprite/surfer.png";
import { useHandleBackground } from "./useHandleBackground";

import { settings } from "../../settings";

export const useHandleBoat = () => {
  // const boatAnimationSpeed = 10;
  const surfer1 = new Image();
  surfer1.src = surfer;
  const boatP = new Image();
  boatP.src = boat3;

  const [boat, setBoat] = useState({
    image: boatP,
    x: settings.boat.startPositionX,
    y: settings.boat.startPositionY,
    width: 134,
    height: 42,
    frameX: 0,
    frameY: 0,
    speed: settings.boat.speed,
    moving: false,
    animationSpeed: settings.boat.animationSpeed,
  });

  const { mainBackgroundHeight } = useHandleBackground();

  const drawBoat = (context) => {
    context.drawImage(
      boat.image,
      boat.frameX * boat.width,
      boat.frameY * boat.height,
      boat.width,
      boat.height,
      boat.x,
      boat.y,
      boat.width,
      boat.height
    );

    // draw surfer
    // TILLFÄLLIG LÖSNING
    context.drawImage(
      surfer1,
      0,
      0,
      390 / 6,
      75,
      boat.x + boat.width / 4,
      boat.y - boat.width / 2.5,
      390 / 6,
      75
    );
  };

  const moveBoat = (keysArray, frame) => {
    if (keysArray.length !== 0) {
      if (keysArray.includes("ArrowUp")) {
        if (
          // (boat.y > settings.background.height - 30)
          boat.y >
          settings.background.height + 25
        ) {
          setBoat((prev) => {
            return {
              ...prev,
              y: prev.y - boat.speed,
              frameY: 0,
              moving: "up",
            };
          });
        } else {
          setBoat((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }

      if (keysArray.includes("ArrowDown")) {
        if (
          // (boat.y < settings.canvasHeight - boat.height)
          boat.y <
          settings.canvasHeight - 135
        ) {
          setBoat((prev) => {
            return {
              ...prev,
              y: prev.y + boat.speed,
              frameY: 0,
              moving: "down",
            };
          });
        } else {
          setBoat((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }

      if (keysArray.includes("ArrowRight")) {
        if (boat.x < settings.canvasWidth - boat.width) {
          setBoat((prev) => {
            return {
              ...prev,
              x: prev.x + boat.speed,
              frameY: 0,
              moving: "right",
            };
          });
        } else {
          setBoat((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }

      if (keysArray.includes("ArrowLeft")) {
        if (boat.x > 0) {
          setBoat((prev) => {
            return {
              ...prev,
              x: prev.x - boat.speed,
              frameY: 0,
              moving: "left",
            };
          });
        } else {
          setBoat((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }

      if (frame % boat.animationSpeed === 0) {
        if (boat.frameX < 2 && !!boat.moving) {
          setBoat((prev) => {
            return {
              ...prev,
              frameX: prev.frameX + 1,
            };
          });
        } else {
          setBoat((prev) => {
            return {
              ...prev,
              frameX: 0,
            };
          });
        }
      }
    } else {
      setBoat((prev) => {
        return {
          ...prev,
          moving: false,
          frameX: 0,
        };
      });
    }
  };

  return {
    drawBoat,
    moveBoat,
    boat,
  };
};
