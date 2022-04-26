/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../pages/game/settings";

const initLives = () => {
  const arr = [];
  for (let i = 0; i < settings.lives; i++) {
    arr.push("");
  }
  return arr;
};

const initialState = {
  playerName: "",
  playerEmail: "",
  lives: initLives(),
  score: 0,
  speed: settings.gameSpeed,
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
      state.speed += 0.3;
      console.log(state.speed);
    },
    updateFrame: (state, action) => {
      state.frame++;
    },
    setGameOver: (state, action) => {
      state.gameOver = action.payload;
    },
    reset: (state, action) => {
      state.playerName = "";
      state.playerEmail = "";
      state.lives = initLives();
      state.score = 0;
      state.speed = settings.gameSpeed;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const {
  startGame,
  updateSpeed,
  updateFrame,
  lostLives,
  getLives,
  updateScore,
  setGameOver,
  reset,
} = gameplaySlice.actions;

// export states
export const status = (state) => state.gameplay.status;
export const error = (state) => state.gameplay.error;

// export data
export const name = (state) => state.gameplay.playerName;
export const email = (state) => state.gameplay.playerEmail;
export const lives = (state) => state.gameplay.lives;
export const score = (state) => state.gameplay.score;
export const speed = (state) => state.gameplay.speed;
export const gameOver = (state) => state.gameplay.gameOver;
// export const data = (state) => state.scores.data;

export default gameplaySlice.reducer;
