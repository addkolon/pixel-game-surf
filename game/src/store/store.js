/** @format */
import { configureStore } from "@reduxjs/toolkit";

import scoresReducer from "./scoresSlice";
import gameplayReducer from "./gameplaySlice";
import playerObjectReducer from "./playerObjectSlice";
import backNforegroundReducer from "./backNforegroundSlice";

export const store = configureStore({
  reducer: {
    scores: scoresReducer,
    gameplay: gameplayReducer,
    playerObject: playerObjectReducer,
    backNforeground: backNforegroundReducer,
  },
});
