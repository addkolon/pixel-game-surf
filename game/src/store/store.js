/** @format */
import { configureStore } from "@reduxjs/toolkit";

import scoresReducer from "./scoresSlice";
import gameplayReducer from "./gameplaySlice";
import playerObjectReducer from "./playerObjectSlice";
import backNforegroundReducer from "./backNforegroundSlice";
import spawnersReducer from "./spawnersSlice";
import soundReducer from "./soundSlice";

export const store = configureStore({
 reducer: {
  scores: scoresReducer,
  gameplay: gameplayReducer,
  playerObject: playerObjectReducer,
  backNforeground: backNforegroundReducer,
  spawners: spawnersReducer,
  sound: soundReducer,
 },
});
