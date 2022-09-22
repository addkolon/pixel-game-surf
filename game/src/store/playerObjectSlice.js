/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

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
  // x: settings.board.startPositionX + settings.surfer.alignmentOnBoardX,
  x: settings.board.startPositionX + 134 / 2 - 75 / 2,
  y: settings.board.startPositionY - settings.surfer.alignmentOnBoardY,
  width: 65,
  height: 75,
  frameX: 0,
  frameY: 0,
 },
 hitbox: [
  {
   x: settings.board.startPositionX + 5,
   y: settings.board.startPositionY,
  },
  {
   x: settings.board.startPositionX + 134 - 5,
   y: settings.board.startPositionY + 46 - 5,
  },
 ],
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

     state.hitbox =
      state.board.frameY === 0
       ? [
          {
           x: state.board.x + 5,
           y: state.board.y,
          },
          {
           x: state.board.x + state.board.width - 5,
           y: state.board.y + state.board.height - 5,
          },
         ]
       : [
          {
           x: state.board.x + 5,
           y: state.board.y + state.board.height - 5,
          },
          {
           x: state.board.x + state.board.width - 5,
           y: state.board.y + 5,
          },
         ];
     break;

    case "down":
     state.board.y = state.board.y + state.board.speed;
     state.hitbox =
      state.board.frameY === 0
       ? [
          {
           x: state.board.x + 5,
           y: state.board.y,
          },
          {
           x: state.board.x + state.board.width - 5,
           y: state.board.y + state.board.height - 5,
          },
         ]
       : [
          {
           x: state.board.x + 5,
           y: state.board.y + state.board.height - 5,
          },
          {
           x: state.board.x + state.board.width - 5,
           y: state.board.y + 5,
          },
         ];
     break;

    case "right":
     state.board.x = state.board.x + state.board.speed;
     state.board.frameY = 0;
     state.boardFoam.frameY = 0;

     state.boardFoam.x = state.board.x + -settings.boardFoam.alignmentX;

     state.surfer.frameY = 0;
     state.surfer.x = state.board.x + 134 / 2 - 75 / 2;
     state.hitbox = [
      {
       x: state.board.x + 5,
       y: state.board.y,
      },
      {
       x: state.board.x + state.board.width - 5,
       y: state.board.y + state.board.height - 5,
      },
     ];
     break;

    case "left":
     state.board.x = state.board.x - state.board.speed;
     state.board.frameY = 1;
     state.boardFoam.frameY = 1;
     state.boardFoam.x =
      state.board.x + state.board.width + -settings.boardFoam.alignmentX;

     state.surfer.frameY = 1;
     state.surfer.x = state.board.x + 134 / 2 - 75 / 2 + 10;

     state.hitbox = [
      {
       x: state.board.x + 5,
       y: state.board.y + state.board.height - 5,
      },
      {
       x: state.board.x + state.board.width - 5,
       y: state.board.y + 5,
      },
     ];
     break;

    case "rightUp":
     state.board.y = state.board.y - state.board.speed;
     state.board.x = state.board.x + state.board.speed;
     state.board.frameY = 0;

     state.boardFoam.x = state.board.x + -settings.boardFoam.alignmentX;
     state.boardFoam.frameY = 0;

     state.surfer.frameY = 0;
     state.surfer.x = state.board.x + 134 / 2 - 75 / 2;
     state.hitbox = [
      {
       x: state.board.x + 5,
       y: state.board.y,
      },
      {
       x: state.board.x + state.board.width - 5,
       y: state.board.y + state.board.height - 5,
      },
     ];
     break;

    case "leftDown":
     state.board.y = state.board.y + state.board.speed;
     state.board.x = state.board.x - state.board.speed;
     state.board.frameY = 1;

     state.boardFoam.x =
      state.board.x + state.board.width + -settings.boardFoam.alignmentX;

     state.surfer.frameY = 1;
     state.surfer.x = state.board.x + 134 / 2 - 75 / 2 + 10;
     state.hitbox = [
      {
       x: state.board.x + 5,
       y: state.board.y + state.board.height - 5,
      },
      {
       x: state.board.x + state.board.width - 5,
       y: state.board.y + 5,
      },
     ];
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
   const newFrame = state.boardFoam.frameX < 2 ? state.boardFoam.frameX + 1 : 0;
   state.boardFoam.frameX = newFrame;
  },
  animateSurfer: (state, action) => {
   const newFrame = state.surfer.frameX < 5 ? state.surfer.frameX + 1 : 0;
   state.surfer.frameX = newFrame;
  },
  resetPlayer: (state, action) => {
   state.board = initialState.board;
   state.boardFoam = initialState.boardFoam;
   state.surfer = initialState.surfer;
   state.hitbox = initialState.hitbox;
  },
 },
});

export const {
 move,
 animateBoard,
 animateBoardFoam,
 animateSurfer,
 resetPlayer,
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
  hitbox: state.playerObject.hitbox,
 };
};

export default playerObjectSlice.reducer;
