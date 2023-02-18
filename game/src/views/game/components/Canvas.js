/** @format */

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useFrameUpdates } from "./utils/frameUpdates";
import { settings } from "../../../config/settings";

export const Canvas = () => {
  const [frame, setFrame] = useState(0);
  const [keysArray, setKeysArray] = useState([]);

  const canvasRef = useRef();

  const { frameUpdates } = useFrameUpdates();

  useLayoutEffect(() => {
    let timerId;
    try {
      const animate = () => {
        setFrame((prev) => prev + 1);
        timerId = requestAnimationFrame(animate);
      };
      timerId = requestAnimationFrame(animate);
    } catch (error) {
      throw new Error("fail");
    }
    return () => cancelAnimationFrame(timerId);
  }, []);

  useEffect(() => {
    try {
      frameUpdates(canvasRef, frame, keysArray);
    } catch (error) {
      throw new Error("fail");
    }
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
        e.preventDefault();
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
