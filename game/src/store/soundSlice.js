/** @format */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 muteAll: false,
 music: {
  enabled: true,
  volume: 0.3,
 },
 waves: {
  enabled: true,
  volume: 0.3,
 },
 pickup: {
  enabled: true,
  volume: 0.2,
 },
 crash: {
  enabled: true,
  volume: 0.7,
 },
 gameover: {
  enabled: true,
  volume: 0.7,
 },
};

export const soundSlice = createSlice({
 name: "sound",
 initialState,
 reducers: {
  setMuteAll: (state, action) => {
   state.music.enabled = !state.music.enabled;
   state.waves.enabled = !state.waves.enabled;
   state.pickup.enabled = !state.pickup.enabled;
   state.crash.enabled = !state.crash.enabled;
   state.gameover.enabled = !state.gameover.enabled;
  },
  setMusicVolume: (state, action) => {
   if (typeof action.payload === "boolean") {
    state.music.enabled = action.payload;
   } else {
    state.music.volume += action.payload;
   }
  },
  setWavesVolume: (state, action) => {
   if (typeof action.payload === "boolean") {
    state.waves.enabled = action.payload;
   } else {
    state.waves.volume += action.payload;
   }
  },
  setPickupVolume: (state, action) => {
   if (typeof action.payload === "boolean") {
    state.pickup.enabled = action.payload;
   } else {
    state.pickup.volume += action.payload;
   }
  },
  setCrashVolume: (state, action) => {
   if (typeof action.payload === "boolean") {
    state.crash.enabled = action.payload;
   } else {
    state.crash.volume += action.payload;
   }
  },
  setGameoverVolume: (state, action) => {
   if (typeof action.payload === "boolean") {
    state.gameover.enabled = action.payload;
   } else {
    state.gameover.volume += action.payload;
   }
  },
 },
});

export const {
 setMuteAll,
 setMusicVolume,
 setWavesVolume,
 setPickupVolume,
 setCrashVolume,
 setGameoverVolume,
} = soundSlice.actions;

// export data
export const muteAll = (state) => state.sound.muteAll;
export const music = (state) => state.sound.music;
export const waves = (state) => state.sound.waves;
export const pickup = (state) => state.sound.pickup;
export const crash = (state) => state.sound.crash;
export const gameover = (state) => state.sound.gameover;

export default soundSlice.reducer;
