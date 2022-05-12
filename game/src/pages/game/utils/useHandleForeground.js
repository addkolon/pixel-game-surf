/** @format */

import { useState } from "react";
import { useSelector } from "react-redux";
import fgPic from "../../../sprite/foreground.png";
import { speed } from "../../../store/gameplaySlice";

import { settings } from "../settings";

export const useHandleForeground = () => {
  const speed = useSelector((state) => state.gameplay.speed);
  const fgP = new Image();
  fgP.src = fgPic;
  

  const speedModifier = 0.2;

  const [mainSpeed, setMainSpeed] = useState(
    settings.foreground.mainSpeed * speed * speedModifier
  );
  // const [foregroundSpeed, setforegroundSpeed] = useState(settings.foreground.mainSpeed + speed);

  const [speedFg, setspeedFg] = useState(
    1
  );

  const [fg, setFg] = useState({
    image: fgP,
    x: 0,
    y: 200,
    width: 1600,
    height: settings.foreground.height,
    x2: 1600,
    speed: speedFg * mainSpeed,
  });
  const [fgCopy, setFgCopy] = useState({
    image: fgP,
    x: 1600,
    y: 200,
    width: 1600,
    height: settings.foreground.height,
    x2: 3200,
    speed: speedFg * mainSpeed,
  });
  

  //   const changeSpeedModifier = (amount) => {

  //   };

  const drawForeground = (context, o) => {
    context.drawImage(o.image, o.x, o.y, o.width, o.height);
    context.drawImage(o.image, o.x2, o.y, o.width, o.height);
  };

  const updateForeground = (context, boat) => {
    
    setMainSpeed(settings.foreground.mainSpeed * speed * speedModifier);
    
    if (fg.x2 < 0) {
      setFg((prev) => {
        return {
          ...prev,
          x: 1600,
          x2: 3200,
        };
      });
    } else {
      setFg((prev) => {
        return {
          ...prev,
          x: prev.x - settings.foreground.fg.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.foreground.fg.speed * mainSpeed * speedModifier,
        };
      });
    }
    if (fgCopy.x2 < 0) {
      setFgCopy((prev) => {
        return {
          ...prev,
          x: 1600,
          x2: 3200,
        };
      });
    } else {
      setFgCopy((prev) => {
        return {
          ...prev,
          x: prev.x - settings.foreground.fg.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.foreground.fg.speed * mainSpeed * speedModifier,
        };
      });
    }
    drawForeground(context, fg);
    drawForeground(context, fgCopy);
  };

  return {
    updateForeground,
  };
};
