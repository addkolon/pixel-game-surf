/** @format */

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import { useHandleBoat } from "./utils/useHandleBoat";
import { useHandleSpawners } from "./utils/useHandleSpawners";
import { useHandleBackground } from "./utils/useHandleBackground";
import { useHandleCrashes } from "./utils/useHandleCrashes";

import {
  lostLives,
  updateScore,
  score,
  updateSpeed,
  speed,
} from "../../../store/gameplaySlice";
import { useDispatch, useSelector } from "react-redux";
import { useHandlePickups } from "./utils/useHandlePickups";
import { settings } from "../settings";

export const Canvas = ({ canvasWidth, canvasHeight }) => {
  const canvasRef = useRef();
  const dispatch = useDispatch();
  const score = useSelector((state) => state.gameplay.score);
  const speed = useSelector((state) => state.gameplay.speed);
  const [frame, setFrame] = useState(0);
  const [keysArray, setKeysArray] = useState([]);

  const { moveBoat, drawBoat, boat } = useHandleBoat();
  const { updateObstacles, updatePickups } = useHandleSpawners();
  const { updateBackground } = useHandleBackground();
  const { handleCrashes } = useHandleCrashes();
  const { handlePickups } = useHandlePickups();

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

    updateBackground(context, boat);
    drawBoat(context);
    moveBoat(keysArray, frame);
    updateObstacles(context, frame, boat);
    updatePickups(context, frame, boat);
    if (handleCrashes(boat)) {
      dispatch(lostLives());
    }
    if (handlePickups(boat)) {
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

    if (frame % (settings.difficulty.timer.seconds * 65) === 0) {
      dispatch(updateSpeed(1));
    }
  }, [frame]);

  return (
    <div className="container">
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
    </div>
  );
};
