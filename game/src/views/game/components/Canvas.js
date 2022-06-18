/** @format */

// generals
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

// handlers
// - playerObject
import { useHandlePlayerObject } from "../utils/playerObject/useHandlePlayerObject";

// - spawners
import { useHandleObstacles } from "../utils/spawners/useHandleObstacles";
import { useHandlePickups } from "../utils/spawners/useHandlePickups";

// - events
import { useHandleCrash } from "../utils/events/useHandleCrash";
import { useHandlePickup } from "../utils/events/useHandlePickup";

// - rest
import { useHandleFoam } from "../utils/wave/useHandleFoam";
import { useHandleBNFground } from "../utils/back&foregrounds/useHandleBNFground";

// store
import {
 lostLives,
 updateScore,
 gameScore,
 updateSpeed,
} from "../../../store/gameplaySlice";

// constants
import {
 animateBoom,
 spawners,
 updateSpawnersSpeed,
} from "../../../store/spawnersSlice";
import { settings } from "../../../config/settings";

export const Canvas = () => {
 const dispatch = useDispatch();
 const canvasRef = useRef();

 const score = useSelector(gameScore);
 const { boom } = useSelector(spawners);

 const [frame, setFrame] = useState(0);
 const [keysArray, setKeysArray] = useState([]);

 const { movePlayerObject, drawPlayerObject, playerObjectAnimations, hitbox } =
  useHandlePlayerObject();
 const { drawFoam, foamAnimation } = useHandleFoam();
 const { updateObstacles } = useHandleObstacles();
 const { updatePickups, pickupAnimations } = useHandlePickups();
 const { handleCrash, drawBoom, boomAnimation } = useHandleCrash();
 const { handlePickup } = useHandlePickup();
 const { updateBackground, updateForeground } = useHandleBNFground();

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
  context.clearRect(0, 0, settings.canvasWidth, settings.canvasHeight);

  updateBackground(context);

  if (frame > settings.startGameSpawnDelay * 2 * 10) {
   updatePickups(context, frame);
   pickupAnimations(frame);
   updateObstacles(context, frame);
  }

  drawPlayerObject(context);
  playerObjectAnimations(frame);
  movePlayerObject(keysArray);

  if (boom.length > 0) {
   drawBoom(context);
   boomAnimation(frame);
  }

  drawFoam(context);
  foamAnimation(frame);

  updateForeground(context);

  // ODÖDLIG START
  if (handleCrash()) {
   dispatch(lostLives());
  }
  // ODÖDLIG SLUT

  if (handlePickup()) {
   dispatch(updateScore());

   // SVÅRIGHET ÖKAR PÅ SAVES START
   if (
    score % (settings.difficulty.savings.saves * settings.scorePerSave) === 0 &&
    settings.difficulty.savings.saves !== 0 &&
    score !== 0
   ) {
    dispatch(updateSpawnersSpeed());
   }
  }
  // SVÅRIGHET ÖKAR SLUT

  // SVÅRIGHET ÖKAR PÅ TID START
  // if (frame % (settings.difficulty.timer.seconds * 65) === 0) {
  //   dispatch(updateSpawnersSpeed());
  // }
  // SVÅRIGHET ÖKAR SLUT
 }, [frame]);

 useEffect(() => {
  const canvas = canvasRef.current;
  canvas.focus();
 }, []);

 return (
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
 );
};
