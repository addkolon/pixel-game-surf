/** @format */

import { useHandleBoardFoam } from "./useHandleBoardFoam";
import { useHandlePlayerObject } from "./useHandlePlayerObject";
import { useHandleSurfer } from "./useHandleSurfer";

export const useHandleMovement = () => {
  const { setSurfer } = useHandleSurfer();
  const { setPlayerObject } = useHandlePlayerObject();

  //   const moveUp = () => {
  //     setPlayerObject((prev) => {
  //       return {
  //         ...prev,
  //         y: prev.y - playerObject.speed,
  //         moving: "up",
  //       };
  //     });
  //   };

  const handleMovement = (keysArray, frame) => {
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
              frameY: 1,
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
};
