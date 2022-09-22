/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

const initialState = {
 muteAll: false,
 music: {
  enabled: true,
  volume: 0.1,
 },
 waves: {
  enabled: true,
  volume: 0.7,
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
   state.music.enabled = false;
   state.waves.enabled = false;
   state.pickup.enabled = false;
   state.crash.enabled = false;
   state.gameover.enabled = false;
  },
  setMusicVolume: (state, action) => {
   state.music.volume += action.payload;
  },
 },
});

export const { setMuteAll, setMusicVolume } = soundSlice.actions;

// export data
export const muteAll = (state) => state.sound.muteAll;
export const music = (state) => state.sound.music;
export const waves = (state) => state.sound.waves;
export const pickup = (state) => state.sound.pickup;
export const crash = (state) => state.sound.crash;
export const gameover = (state) => state.sound.gameover;

export default soundSlice.reducer;
