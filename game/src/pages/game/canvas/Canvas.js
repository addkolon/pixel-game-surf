/** @format */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// playerObject
import { useHandlePlayerObject } from "../utils/playerObject/useHandlePlayerObject";
import { useHandleSurfer } from "../utils/playerObject/useHandleSurfer";

// spawners
import { useHandleObstacles } from "../utils/spawners/useHandleObstacles";
import { useHandlePickups } from "../utils/spawners/useHandlePickups";

// events
import { useHandleCrash } from "../utils/events/useHandleCrash";
import { useHandlePickup } from "../utils/events/useHandlePickup";

import {
  lostLives,
  updateScore,
  score,
  updateSpeed,
  speed,
} from "../../../store/gameplaySlice";
import { settings } from "../settings";
import { useHandleFoam } from "../utils/useHandleFoam";
import { useHandleBackground } from "../utils/useHandleBackground";

export const Canvas = ({ canvasWidth, canvasHeight }) => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const score = useSelector((state) => state.gameplay.score);
  const speed = useSelector((state) => state.gameplay.speed);
  const [frame, setFrame] = useState(0);
  const [keysArray, setKeysArray] = useState([]);

  const { drawSurfer, surferAnimation, surfer } = useHandleSurfer();
  const { drawFoam, foamAnimation } = useHandleFoam();

  const {
    movePlayerObject,
    drawPlayerObject,
    playerObject,
    playerObjectAnimation,
    playerObjectEdges,
  } = useHandlePlayerObject();
  const { updateObstacles } = useHandleObstacles();
  const { updatePickups } = useHandlePickups();
  const { handleCrash } = useHandleCrash();
  const { handlePickup } = useHandlePickup();

  const { updateBackground } = useHandleBackground();

  useLayoutEffect(() => {
    let timerId;
    const animate = () => {
      setFrame((prev) => prev + 1);
      timerId = requestAnimationFrame(animate);
    };
    timerId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(timerId);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.focus();
    context.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

    // updateBackground(context, boat);

    updatePickups(context, frame, playerObject);
    updateObstacles(context, frame, playerObject);
    drawPlayerObject(context);
    playerObjectAnimation(frame);
    drawSurfer(context, playerObject);
    surferAnimation(frame);
    drawFoam(context);
    foamAnimation(frame);

    movePlayerObject(keysArray, frame);

    if (handleCrash(playerObjectEdges)) {
      dispatch(lostLives());
    }
    if (handlePickup(playerObjectEdges)) {
      dispatch(updateScore());
      if (
        (score % settings.difficulty.savings.saves) * settings.scorePerSave ===
          0 &&
        settings.difficulty.savings.saves !== 0 &&
        score !== 0
      ) {
        dispatch(updateSpeed(1));
      }
    }

    // if (frame % (settings.difficulty.timer.seconds * 65) === 0) {
    //   dispatch(updateSpeed(1));
    // }
  }, [frame]);

  return (
    // <div className="canvas-container">
    <canvas
      className="canvas1"
      ref={canvasRef}
      width={settings.canvasWidth}
      height={settings.canvasHeight}
      tabIndex="0"
      onKeyDown={(e) => {
        if (!keysArray.includes(e.code)) {
          setKeysArray((prev) => {
            return [...prev, e.code];
          });
        }
      }}
      onKeyUp={(e) => setKeysArray(keysArray.filter((k) => k !== e.code))}
    />
    // </div>
  );
};
