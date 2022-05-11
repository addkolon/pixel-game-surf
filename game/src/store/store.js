/** @format */
import { configureStore } from "@reduxjs/toolkit";

import scoresReducer from "./scoresSlice";
import gameplayReducer from "./gameplaySlice";

export const store = configureStore({
  reducer: {
    scores: scoresReducer,
    gameplay: gameplayReducer,
  },
});
