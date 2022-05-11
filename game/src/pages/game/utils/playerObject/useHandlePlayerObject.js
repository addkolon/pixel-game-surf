/** @format */

import { useState } from "react";

import boardSprite from "../../../../sprite/board-sprite.png";

import { useHandleBackground } from "../useHandleBackground";

import { settings } from "../../settings";
import { useHandleFoam } from "../useHandleFoam";

export const useHandlePlayerObject = () => {
  const boardImage = new Image();
  boardImage.src = boardSprite;

  const { foam } = useHandleFoam();

  const [playerObject, setPlayerObject] = useState({
    image: boardImage,
    x: settings.playerObject.startPositionX,
    y: settings.playerObject.startPositionY,
    width: 134,
    height: 46,
    frameX: 0,
    frameY: 0,
    speed: settings.playerObject.speed,
    moving: false,
  });

  const [playerObjectEdges, setPlayerObjectEdges] = useState([
    { x: playerObject.x, y: playerObject.y },
    {
      x: playerObject.x + playerObject.width - 5,
      y: playerObject.y + playerObject.height - 5,
    },
  ]);

  const drawPlayerObject = (context) => {
    context.drawImage(
      playerObject.image,
      playerObject.frameX * playerObject.width,
      playerObject.frameY * playerObject.height,
      playerObject.width,
      playerObject.height,
      playerObject.x,
      playerObject.y,
      playerObject.width,
      playerObject.height
    );
    setPlayerObjectEdges([
      { x: playerObject.x + 5, y: playerObject.y },
      {
        x: playerObject.x + playerObject.width - 5,
        y: playerObject.y + playerObject.height - 5,
      },
    ]);
  };

  const movePlayerObject = (keysArray, frame) => {
    if (keysArray.length !== 0) {
      if (keysArray.includes("ArrowUp")) {
        const onCanvas = playerObject.y > settings.background.height;

        // huvud under foam
        const check1 = () => {
          return playerObject.x + settings.surfer.alignmentOnBoardX + 5 <
            foam.width && playerObject.y < settings.background.height + 65
            ? true
            : false;
        };

        // huvud över men bräda under foam
        const check2 = () => {
          return playerObject.y < settings.background.height + 15 &&
            playerObject.x < foam.width
            ? true
            : false;
        };

        if (onCanvas && !check1() && !check2()) {
          setPlayerObject((prev) => {
            return {
              ...prev,
              y: prev.y - playerObject.speed,
              frameY: 0,
              moving: "up",
            };
          });
        }
      }

      if (keysArray.includes("ArrowDown")) {
        if (playerObject.y < settings.canvasHeight - playerObject.height) {
          setPlayerObject((prev) => {
            return {
              ...prev,
              y: prev.y + playerObject.speed,
              frameY: 0,
              moving: "down",
            };
          });
        } else {
          setPlayerObject((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }

      if (keysArray.includes("ArrowRight")) {
        if (playerObject.x < settings.canvasWidth - playerObject.width) {
          setPlayerObject((prev) => {
            return {
              ...prev,
              x: prev.x + playerObject.speed,
              frameY: 0,
              moving: "right",
            };
          });
        } else {
          setPlayerObject((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }

      if (keysArray.includes("ArrowLeft")) {
        const onCanvas = playerObject.x > 0;

        // board over foam
        const check1 = () => {
          return playerObject.y < settings.background.height + 20 &&
            playerObject.x < foam.width + 5
            ? true
            : false;
        };

        // board under foam but surfer over
        const check2 = () => {
          return playerObject.y < settings.background.height + 64 &&
            playerObject.x < foam.width - 30
            ? true
            : false;
        };

        if (onCanvas && !check1() && !check2()) {
          setPlayerObject((prev) => {
            return {
              ...prev,
              x: prev.x - playerObject.speed,
              frameY: 0,
              moving: "left",
            };
          });
        } else {
          setPlayerObject((prev) => {
            return {
              ...prev,
              frameX: 0,
              moving: false,
            };
          });
        }
      }
    } else {
      setPlayerObject((prev) => {
        return {
          ...prev,
          moving: false,
        };
      });
    }
  };

  const playerObjectAnimation = (frame) => {
    if (frame % settings.playerObject.animationSpeed === 0) {
      setPlayerObject((prev) => {
        return {
          ...prev,
          frameX: prev.frameX < 5 ? prev.frameX + 1 : 0,
        };
      });
    }
  };

  return {
    drawPlayerObject,
    movePlayerObject,
    playerObject,
    playerObjectAnimation,
    playerObjectEdges,
  };
};
