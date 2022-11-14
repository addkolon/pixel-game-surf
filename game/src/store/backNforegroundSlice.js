/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

const initialState = {
 backgrounds: [
  {
   x: 0,
   x2: 800,
   y: 0,
   width: 800,
   height: settings.background.height,
   speed: settings.background.bg1.speed * settings.background.mainSpeed,
  },
  {
   x: 0,
   x2: 1200,
   y: settings.canvasHeight - 168,
   width: 1200,
   height: 160,
   speed: settings.foreground.fg1.speed * settings.foreground.mainSpeed,
  },
 ],
 foregrounds: [
  {
   x: 0,
   x2: 1600,
   y: settings.canvasHeight - 200,
   width: 1600,
   height: 264,
   speed: settings.foreground.fg.speed * settings.foreground.mainSpeed,
  },
 ],
};

export const backNforegroundSlice = createSlice({
 name: "backNforeground",
 initialState,
 reducers: {
  updateBackgrounds: (state, action) => {
   state.backgrounds = state.backgrounds.map((b) => {
    return {
     ...b,
     x: b.x > -b.width ? b.x - b.speed : b.width,
     x2: b.x2 > -b.width ? b.x2 - b.speed : b.width,
    };
   });
  },

  updateForegrounds: (state, action) => {
   state.foregrounds = state.foregrounds.map((b) => {
    return {
     ...b,
     x: b.x > -b.width ? b.x - b.speed : b.width,
     x2: b.x2 > -b.width ? b.x2 - b.speed : b.width,
    };
   });
  },
 },
});

export const { updateBackgrounds, updateForegrounds } =
 backNforegroundSlice.actions;

// export data
export const backNforeground = (state) => {
 return {
  backgrounds: state.backNforeground.backgrounds,
  foregrounds: state.backNforeground.foregrounds,
 };
};

export default backNforegroundSlice.reducer;
