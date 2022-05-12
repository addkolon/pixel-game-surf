/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../pages/game/settings";

const initialState = {
  board: {
    x: settings.board.startPositionX,
    y: settings.board.startPositionY,
    width: 134,
    height: 46,
    frameX: 0,
    frameY: 0,
    speed: settings.board.speed,
    moving: false,
  },
  boardFoam: {
    x: settings.board.startPositionX - settings.boardFoam.alignmentX,
    y: settings.board.startPositionY - settings.boardFoam.alignmentY,
    width: 84,
    height: 39,
    frameX: 0,
    frameY: 0,
    moving: false,
  },
  surfer: {
    x: settings.board.startPositionX + settings.surfer.alignmentOnBoardX,
    y: settings.board.startPositionY - settings.surfer.alignmentOnBoardY,
    width: 65,
    height: 75,
    frameX: 0,
    frameY: 0,
  },
  status: "idle",
  error: null,
};

export const playerObjectSlice = createSlice({
  name: "playerObject",
  initialState,
  reducers: {
    move: (state, action) => {
      const direction = action.payload;
      switch (direction) {
        case "up":
          state.board.y = state.board.y - state.board.speed;
          break;

        case "down":
          state.board.y = state.board.y + state.board.speed;
          break;

        case "right":
          state.board.x = state.board.x + state.board.speed;
          state.board.frameY = 0;
          //   state.boardFoam.frameY = 0;
          state.surfer.frameY = 0;
          break;

        case "left":
          state.board.x = state.board.x - state.board.speed;
          state.board.frameY = 1;
          //   state.boardFoam.frameY = 1;
          state.surfer.frameY = 1;
          break;

        default:
          state.board.moving = false;
          break;
      }
      state.board.moving = direction;
    },
    animateBoard: (state, action) => {
      const newFrame = state.board.frameX < 5 ? state.board.frameX + 1 : 0;
      state.board.frameX = newFrame;
    },
    animateBoardFoam: (state, action) => {
      const newFrame =
        state.boardFoam.frameX < 5 ? state.boardFoam.frameX + 1 : 0;
      state.boardFoam.frameX = newFrame;
    },
    animateSurfer: (state, action) => {
      const newFrame = state.surfer.frameX < 5 ? state.surfer.frameX + 1 : 0;
      state.surfer.frameX = newFrame;
    },
  },
});

export const {
  move,
  animateBoard,
  // animateBoardFoam,
  animateSurfer,
} = playerObjectSlice.actions;

// export states
export const status = (state) => state.playerObject.status;
export const error = (state) => state.playerObject.error;

// export data
export const playerObject = (state) => {
  return {
    board: state.playerObject.board,
    boardFoam: state.playerObject.boardFoam,
    surfer: state.playerObject.surfer,
  };
};

export default playerObjectSlice.reducer;
