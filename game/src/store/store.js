/** @format */
import { configureStore } from "@reduxjs/toolkit";

import scoresReducer from "./scoresSlice";
import gameplayReducer from "./gameplaySlice";
import obstaclesReducer from "./obstaclesSlice";

export const store = configureStore({
  reducer: {
    scores: scoresReducer,
    gameplay: gameplayReducer,
    obstacles: obstaclesReducer,
  },
});
