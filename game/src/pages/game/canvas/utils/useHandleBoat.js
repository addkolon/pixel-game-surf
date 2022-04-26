/** @format */

import { useState } from "react";
import boat3 from "../../../../sprite/boat-3.png";
import { useHandleBackground } from "./useHandleBackground";

import { settings } from "../../settings";

export const useHandleBoat = () => {
  // const boatAnimationSpeed = 10;
  const boatP = new Image();
  boatP.src = boat3;
  // const [boatPosition, setBoatPosition] = useState({ x: 100, y: 100 });
  // const [boatWidth, setBoatWidth] = useState(176);
  // const [boatHeight, setBoatHeight] = useState(74);
  // const [boatImageFrameX, setBoatImageFrameX] = useState(0);
  // const [boatImageFrameY, setBoatImageFrameY] = useState(0);
  // const [boatSpeed, setBoatSpeed] = useState(6);
  // const [boatMoving, setBoatMoving] = useState(false);

  const [boat, setBoat] = useState({
    image: boatP,
    x: settings.boat.startPositionX,
    y: settings.boat.startPositionY,
    width: 176,
    height: 74,
    frameX: 0,
    frameY: 0,
    speed: settings.boat.speed,
    moving: false,
    animationSpeed: settings.boat.animationSpeed,
  });

  const { mainBackgroundHeight } = useHandleBackground();

  const drawBoat = (context) => {
    context.drawImage(
      // boatP,
      // boatImageFrameX * boatWidth,
      // boatImageFrameY * boatHeight,
      // boatWidth,
      // boatHeight,
      // boatPosition.x,
      // boatPosition.y,
      // boatWidth,
      // boatHeight
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
  };

  const moveBoat = (keysArray, frame) => {
    if (keysArray.length !== 0) {
      if (keysArray.includes("ArrowUp")) {
        if (boat.y > settings.background.height - 30) {
          setBoat((prev) => {
            return {
              ...prev,
              y: prev.y - boat.speed,
              frameY: 3,
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
        if (boat.y < settings.canvasHeight - boat.height) {
          setBoat((prev) => {
            return {
              ...prev,
              y: prev.y + boat.speed,
              frameY: 1,
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
              frameY: 2,
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
