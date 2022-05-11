/** @format */

import { useState } from "react";

import boardSprite from "../../../../sprite/board-sprite.png";

import surferSprite from "../../../../sprite/surfer.png";
import { useHandleBackground } from "./useHandleBackground";

import { settings } from "../../settings";
import { useHandleFoam } from "./useHandleFoam";

// import surferData from "../../../../sprite/surfer.json";

export const useHandleBoat = () => {
  // const boatAnimationSpeed = 10;
  // const surferImage = new Image();
  // surferImage.src = surferSprite;

  const boardImage = new Image();
  boardImage.src = boardSprite;

  const { foam } = useHandleFoam();

  const [boat, setBoat] = useState({
    image: boardImage,
    x: settings.boat.startPositionX,
    y: settings.boat.startPositionY,
    width: 134,
    height: 46,
    frameX: 0,
    frameY: 0,
    speed: settings.boat.speed,
    moving: false,
  });

  const [boatEdges, setBoatEdges] = useState([
    // collision trying
    { x: boat.x + 5, y: boat.y },
    { x: boat.x + boat.width, y: boat.y + boat.height - 5 },
    { x: boat.x + boat.width - 5, y: boat.y + boat.height },
    { x: boat.x, y: boat.y + 5 },
  ]);

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
      boat.height,
      boat.scale
    );
    setBoatEdges([
      // collision trying
      { x: boat.x + 5, y: boat.y },
      { x: boat.x + boat.width, y: boat.y + boat.height - 5 },
      { x: boat.x + boat.width - 5, y: boat.y + boat.height },
      { x: boat.x, y: boat.y + 5 },
    ]);

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
        const onCanvas = boat.y > settings.background.height;

        // huvud under foam
        const check1 = () => {
          return boat.x + settings.surfer.alignmentOnBoardX + 5 < foam.width &&
            boat.y < settings.background.height + 65
            ? true
            : false;
        };

        // huvud över men bräda under foam
        const check2 = () => {
          return boat.y < settings.background.height + 15 && boat.x < foam.width
            ? true
            : false;
        };

        if (onCanvas && !check1() && !check2()) {
          setBoat((prev) => {
            return {
              ...prev,
              y: prev.y - boat.speed,
              //frameY: 0,
              moving: "up",
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
              //frameY: 0,
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
        const onCanvas = boat.x > 0;

        // board over foam
        const check1 = () => {
          return boat.y < settings.background.height + 20 &&
            boat.x < foam.width + 5
            ? true
            : false;
        };

        // board under foam but surfer over
        const check2 = () => {
          return boat.y < settings.background.height + 64 &&
            boat.x < foam.width - 30
            ? true
            : false;
        };

        if (onCanvas && !check1() && !check2()) {
          setBoat((prev) => {
            return {
              ...prev,
              x: prev.x - boat.speed,
              frameY: 1,
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
    } else {
      setBoat((prev) => {
        return {
          ...prev,
          moving: false,
        };
      });
    }
  };

  const boardAnimation = (frame) => {
    if (frame % settings.boat.animationSpeed === 0) {
      setBoat((prev) => {
        return {
          ...prev,
          frameX: prev.frameX < 5 ? prev.frameX + 1 : 0,
        };
      });
    }
  };

  return {
    drawBoat,
    moveBoat,
    boat,
    boardAnimation,
    boatEdges,
  };
};
