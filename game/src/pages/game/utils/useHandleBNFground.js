/** @format */

import { useDispatch, useSelector } from "react-redux";

import bg1Pic from "../../../sprite/clouds.png";

import fgPic from "../../../sprite/foreground.png";
import fg1Pic from "../../../sprite/ocean-floor.png";

import {
  backNforeground,
  updateBackgrounds,
  updateForegrounds,
} from "../../../store/backNforegroundSlice";

export const useHandleBNFground = () => {
  const dispatch = useDispatch();
  const { backgrounds, foregrounds } = useSelector(backNforeground);

  // add back & foregrounds here
  const bg1Image = new Image();
  bg1Image.src = bg1Pic;

  const fgImage = new Image();
  fgImage.src = fgPic;
  
  const fg1Image = new Image();
  fg1Image.src = fg1Pic;

  const backgroundImages = [bg1Image, fg1Image];
  const foregroundImages = [fgImage];
  // ---

  const draw = (context, o) => {
    context.drawImage(o.image, o.x, o.y, o.width, o.height);
    context.drawImage(o.image, o.x2, o.y, o.width, o.height);
  };

  const updateBackground = (context) => {
    for (let i = 0; i < backgrounds.length; i++) {
      const b = backgrounds[i];
      draw(context, { ...b, image: backgroundImages[i] });
      dispatch(updateBackgrounds());
    }
  };
  const updateForeground = (context) => {
    for (let i = 0; i < foregrounds.length; i++) {
      const b = foregrounds[i];
      draw(context, { ...b, image: foregroundImages[i] });
      dispatch(updateForegrounds());
    }
  };

  return {
    updateBackground,
    updateForeground,
  };
};
