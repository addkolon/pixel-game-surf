/** @format */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { PROTECTED_GET, GET, POST, PROTECTED_POST } from "../utils/fetch";

import { settings } from "../config/settings";

// export const getToken = createAsyncThunk("getToken", async () => {
//  const res = await GET(`/generate_token.php`);
//  console.log(res);
//  return res;
// });

const initLives = () => {
 const arr = [];
 for (let i = 0; i < settings.lives; i++) {
  arr.push("");
 }
 return arr;
};

const initialState = {
 token: "",
 playerName: "",
 playerEmail: "",
 lives: initLives(),
 score: 0,
 gameSpeed: settings.gameSpeed,
 gameOver: false,
 status: "idle",
 error: null,
};

export const gameplaySlice = createSlice({
 name: "gameplay",
 initialState,
 reducers: {
  startGame: (state, action) => {
   const { name, email } = action.payload;
   state.playerName = name;
   state.playerEmail = email;
  },
  lostLives: (state, action) => {
   state.lives.pop();
  },
  getLives: (state, action) => {
   state.lives = action.payload;
  },
  updateScore: (state, action) => {
   state.score += settings.scorePerSave;
  },
  updatePlayer: (state, action) => {
   state.playerName = action.payload.name;
   state.playerEmail = action.payload.email;
  },
  updateSpeed: (state, action) => {
   state.gameSpeed += settings.gameSpeedUpdate;
  },
  updateFrame: (state, action) => {
   state.frame++;
  },
  setGameOver: (state, action) => {
   state.gameOver = action.payload;
  },
  resetGameplay: (state, action) => {
   state.playerName = "";
   state.playerEmail = "";
   state.lives = initLives();
   state.score = 0;
   state.speed = settings.gameSpeed;
   state.status = "idle";
   state.error = null;
   state.gameOver = action.payload;
  },
 },
 //  extraReducers(builder) {
 //   builder
 //    .addCase(getToken.pending, (state, action) => {
 //     state.status = "loading";
 //    })
 //    .addCase(getToken.fulfilled, (state, action) => {
 //     console.log(action.payload.token);

 //     const { token } = action.payload;
 //     state.token = token;
 //    })
 //    .addCase(getToken.rejected, (state, action) => {
 //     state.status = "failed";
 //     state.error = action.error.message;
 //    });
 //  },
});

export const {
 startGame,
 updateSpeed,
 updateFrame,
 lostLives,
 getLives,
 updateScore,
 setGameOver,
 resetGameplay,
} = gameplaySlice.actions;

// export states
export const status = (state) => state.gameplay.status;
export const error = (state) => state.gameplay.error;

// export data
export const token = (state) => state.gameplay.token;
export const name = (state) => state.gameplay.playerName;
export const email = (state) => state.gameplay.playerEmail;
export const lives = (state) => state.gameplay.lives;
export const gameScore = (state) => state.gameplay.score;
export const gameSpeed = (state) => state.gameplay.gameSpeed;
export const gameOver = (state) => state.gameplay.gameOver;
// export const data = (state) => state.scores.data;

export default gameplaySlice.reducer;
