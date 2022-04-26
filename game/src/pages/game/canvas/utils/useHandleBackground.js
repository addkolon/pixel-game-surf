/** @format */

import { useState } from "react";
import { useSelector } from "react-redux";
import bg1Pic from "../../../../sprite/bg1.png";
import bg2Pic from "../../../../sprite/bg2.png";
import bg3Pic from "../../../../sprite/bg3.png";
import bg4Pic from "../../../../sprite/bg4.png";
import { speed } from "../../../../store/gameplaySlice";

import { settings } from "../../settings";

export const useHandleBackground = () => {
  const speed = useSelector((state) => state.gameplay.speed);
  const bg1P = new Image();
  bg1P.src = bg1Pic;
  const bg2P = new Image();
  bg2P.src = bg2Pic;
  const bg3P = new Image();
  bg3P.src = bg3Pic;
  const bg4P = new Image();
  bg4P.src = bg4Pic;

  const speedModifier = 0.2;

  const [mainSpeed, setMainSpeed] = useState(
    settings.background.mainSpeed * speed * speedModifier
  );
  // const [backgroundSpeed, setBackgroundSpeed] = useState(settings.background.mainSpeed + speed);

  const [speedBg1, setSpeedBg1] = useState(
    settings.background.bg1.speed * speed
  );
  const [speedBg2, setSpeedBg2] = useState(
    settings.background.bg2.speed * speed
  );
  const [speedBg3, setSpeedBg3] = useState(
    settings.background.bg3.speed * speed
  );
  const [speedBg4, setSpeedBg4] = useState(
    settings.background.bg4.speed * speed
  );

  const [bg1, setBg1] = useState({
    image: bg1P,
    x: 0,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 2400,
    speed: speedBg1 * mainSpeed,
  });
  const [bg1Copy, setBg1Copy] = useState({
    image: bg1P,
    x: 2400,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 4800,
    speed: speedBg1 * mainSpeed,
  });
  const [bg2, setBg2] = useState({
    image: bg2P,
    x: 0,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 2400,
    speed: speedBg2 * mainSpeed,
  });
  const [bg2Copy, setBg2Copy] = useState({
    image: bg2P,
    x: 2400,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 4800,
    speed: speedBg2 * mainSpeed,
  });
  const [bg3, setBg3] = useState({
    image: bg3P,
    x: 0,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 2400,
    speed: speedBg3 * mainSpeed,
  });
  const [bg3Copy, setBg3Copy] = useState({
    image: bg3P,
    x: 2400,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 4800,
    speed: speedBg3 * mainSpeed,
  });
  const [bg4, setBg4] = useState({
    image: bg4P,
    x: 0,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 2400,
    speed: speedBg4 * mainSpeed,
  });
  const [bg4Copy, setBg4Copy] = useState({
    image: bg3P,
    x: 2400,
    y: 0,
    width: 2400,
    height: settings.background.height,
    x2: 4800,
    speed: speedBg4 * mainSpeed,
    // tempSpeed: speedBg4 / (mainSpeedModifier + 2),
  });

  //   const changeSpeedModifier = (amount) => {

  //   };

  const drawBackground = (context, o) => {
    context.drawImage(o.image, o.x, o.y, o.width, o.height);
    context.drawImage(o.image, o.x2, o.y, o.width, o.height);
  };

  const updateBackground = (context, boat) => {
    if (boat.moving) {
      if (
        boat.moving === "right" &&
        boat.x < settings.canvasWidth - boat.width
      ) {
        setMainSpeed(
          settings.background.speedModifier.boatMovement.right *
            speed *
            speedModifier *
            0.2
        );
      }
      if (boat.moving === "left") {
        setMainSpeed(
          settings.background.speedModifier.boatMovement.left *
            speed *
            speedModifier *
            0.2
        );
      }
      if (boat.moving === "down") {
        setMainSpeed(settings.background.mainSpeed * speed * speedModifier);
      }
      if (boat.moving === "up") {
        setMainSpeed(settings.background.mainSpeed * speed * speedModifier);
      }
    } else {
      setMainSpeed(settings.background.mainSpeed * speed * speedModifier);
    }
    if (bg4.x2 < 0) {
      setBg4((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg4((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg4.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg4.speed * mainSpeed * speedModifier,
        };
      });
    }
    if (bg4Copy.x2 < 0) {
      setBg4Copy((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg4Copy((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg4.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg4.speed * mainSpeed * speedModifier,
        };
      });
    }
    drawBackground(context, bg4);
    drawBackground(context, bg4Copy);
    if (bg3.x2 < 0) {
      setBg3((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg3((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg3.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg3.speed * mainSpeed * speedModifier,
        };
      });
    }
    if (bg3Copy.x2 < 0) {
      setBg3Copy((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg3Copy((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg3.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg3.speed * mainSpeed * speedModifier,
        };
      });
    }
    drawBackground(context, bg3);
    drawBackground(context, bg3Copy);
    if (bg2.x2 < 0) {
      setBg2((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg2((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg2.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg2.speed * mainSpeed * speedModifier,
        };
      });
    }
    if (bg2Copy.x2 < 0) {
      setBg2Copy((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg2Copy((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg2.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg2.speed * mainSpeed * speedModifier,
        };
      });
    }
    drawBackground(context, bg2);
    drawBackground(context, bg2Copy);
    if (bg1.x2 < 0) {
      setBg1((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg1((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg1.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg1.speed * mainSpeed * speedModifier,
        };
      });
    }
    if (bg1Copy.x2 < 0) {
      setBg1Copy((prev) => {
        return {
          ...prev,
          x: 2400,
          x2: 4800,
        };
      });
    } else {
      setBg1Copy((prev) => {
        return {
          ...prev,
          x: prev.x - settings.background.bg1.speed * mainSpeed * speedModifier,
          x2:
            prev.x2 - settings.background.bg1.speed * mainSpeed * speedModifier,
        };
      });
    }
    drawBackground(context, bg1);
    drawBackground(context, bg1Copy);
  };

  return {
    updateBackground,
  };
};
