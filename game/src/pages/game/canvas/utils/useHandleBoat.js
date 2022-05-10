/** @format */

import { useState } from "react";

import boardSprite from "../../../../sprite/board-sprite.png";

import surferSprite from "../../../../sprite/surfer.png";
import { useHandleBackground } from "./useHandleBackground";

import { settings } from "../../settings";

// import surferData from "../../../../sprite/surfer.json";

export const useHandleBoat = () => {
  // const boatAnimationSpeed = 10;
  // const surferImage = new Image();
  // surferImage.src = surferSprite;

  const boardImage = new Image();
  boardImage.src = boardSprite;

  const [boat, setBoat] = useState({
    image: boardImage,
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

  // const [surfer, setSurfer] = useState({
  //   image: surferImage,

  //   x: settings.boat.startPositionX,
  //   y: settings.boat.startPositionY,
  //   width: 65,
  //   height: 75,
  //   frameX: 0,
  //   animationSpeed: settings.boat.animationSpeed,
  // });

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

    // context.drawImage(
    //   surferImage,
    //   surfer.frameX * surfer.width,
    //   0,
    //   surfer.width,
    //   surfer.height,
    //   boat.x + 30,
    //   boat.y - 53,
    //   surfer.width,
    //   surfer.height
    // );
  };

  const moveBoat = (keysArray, frame) => {
    if (keysArray.length !== 0) {
      if (keysArray.includes("ArrowUp")) {
        if (boat.y > settings.background.height) {
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
        if (boat.y < settings.canvasHeight - boat.height) {
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
        const foamWidth = 275;
        const surfHeight = 75;

        // works

        const onCanvas = boat.x > 0;

        // const onTopOfFoam =
        // boat.y < settings.background.height + 20 && boat.x < foamWidth + 5;

        // const headAboveFoam =
        //   boat.y < settings.background.height + surfHeight - 10 &&
        //   boat.x < foamWidth - 25;

        const foamConsts = {
          one: {
            yStart: settings.background.height,
            yEnd: settings.background.height + 20,
            x: foamWidth + 5,
          },
          two: {
            yStart: settings.background.height + surfHeight - 10,
            yEnd: settings.background.height + surfHeight - 20,
            xStart: foamWidth - 25,
            xEnd: foamWidth - 25,
          },
          three: {
            yStart: settings.background.height + surfHeight - 20,
            yEnd: settings.background.height + surfHeight - 30,
            x: foamWidth - 45,
          },
        };

        // head (three) = y: 108, x: 226

        // conditions

        const check1 =
          boat.y < foamConsts.one.yEnd && boat.x < foamConsts.one.x;

        const check2 =
          // boat.y < settings.background.height + surfHeight - 10 &&
          // boat.y > settings.background.height + surfHeight - 20 &&
          // boat.x < foamWidth - 25;

          // boat.y > foamConsts.two.yStart &&
          // boat.y < foamConsts.two.yEnd &&
          boat.y > 80 && boat.y < 100 && boat.x < 245;
        // && boat.x < 275 - 50

        // const check2 =
        //   boat.y < settings.background.height + surfHeight - 20 &&
        //   boat.x < foamWidth - 45;

        // if (boat.x > 0 && conditionY) {
        // if (!onTopOfFoam) {
        // console.log(boat.y, boat.x);
        if (onCanvas && !check1 && !check2) {
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

        if (boat.frameX < 4 && !!boat.moving) {
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
