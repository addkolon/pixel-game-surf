/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

const accSpeed = settings.board.accSpeed;

const rightFrames = [0, 1, 2, 3, 4, 5];
const leftFrames = [6, 7, 8, 9, 10, 11];

const roundIt = (sumToRound) => {
  return Math.round(sumToRound * 10) / 10;
};

const initialState = {
  board: {
    x: settings.board.startPositionX,
    y: settings.board.startPositionY,
    width: 134,
    height: 46,
    frameX: 0,
    frameY: 0,
    //   speed: settings.board.speed,
    speedUp: settings.board.speed,
    speedRight: settings.board.speed,
    speedDown: settings.board.speed,
    speedLeft: settings.board.speed,
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
  boardTrail: [],
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
    setFrameY: (state, action) => {
      const Yframe = action.payload.frameY;
      if (rightFrames.includes(state.board.frameY)) {
        state.board.frameY = rightFrames[Yframe];
      } else {
        state.board.frameY = leftFrames[Yframe];
      }
    },
    popBoardTrail: (state, action) => {
      state.boardTrail.pop();
    },
    pushBoardTrail: (state, action) => {
      const newBoardTrail = {
        x: state.boardFoam.x,
        y: state.boardFoam.y,
        width: 100,
        height: 90,
      };
      state.boardTrail.push(newBoardTrail);
    },
    move: (state, action) => {
      const direction = action.payload.direction;
      const reset = action.payload.reset;
      const Yframe = action.payload.lives;

      if (state.boardTrail.length < 30) {
        const newBoardTrail = {
          // x: state.boardFoam.x,
          // y: state.boardFoam.y,
          x: state.boardFoam.x + 15,
          y: state.board.y - state.board.height / 2,
          width: 100,
          height: 90,
        };
        // state.boardTrail.push(newBoardTrail);
        state.boardTrail = [newBoardTrail, ...state.boardTrail];
      }
      switch (reset) {
        case true:
          switch (direction) {
            case "up":
              state.board.speedUp = 0;
              break;
            case "down":
              state.board.speedDown = 0;
              break;
            case "right":
              state.board.speedRight = 0;
              break;
            case "left":
              state.board.speedLeft = 0;
              break;
          }
          break;

        default:
          switch (direction) {
            case "up":
              if (action.payload.reset) {
                return (state.board.speedUp = 0);
              }
              if (state.board.speedUp < 5) {
                state.board.speedUp = roundIt(state.board.speedUp + 0.1);
              }
              state.board.y = roundIt(state.board.y - state.board.speedUp);

              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---
              state.hitbox = rightFrames.includes(state.board.frameY)
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

            case "slowup":
              if (action.payload.reset) {
                return (state.board.speedUp = 0);
              }
              if (state.board.speedUp > 0) {
                state.board.speedUp = roundIt(state.board.speedUp - accSpeed);
              }
              state.board.y = roundIt(state.board.y - state.board.speedUp);

              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---
              state.hitbox = rightFrames.includes(state.board.frameY)
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
              if (action.payload.reset) {
                return (state.board.speedDown = 0);
              }
              if (state.board.speedDown < 5) {
                state.board.speedDown = roundIt(state.board.speedDown + 0.1);
              }
              state.board.y = roundIt(state.board.y + state.board.speedDown);

              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---
              state.hitbox = rightFrames.includes(state.board.frameY)
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

            case "slowdown":
              if (action.payload.reset) {
                return (state.board.speedDown = 0);
              }
              if (state.board.speedDown > 0) {
                state.board.speedDown = roundIt(
                  state.board.speedDown - accSpeed
                );
              }
              state.board.y = roundIt(state.board.y + state.board.speedDown);

              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---
              state.hitbox = rightFrames.includes(state.board.frameY)
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
              if (action.payload.reset) {
                return (state.board.speedRight = 0);
              }
              if (state.board.speedRight < 5) {
                state.board.speedRight = roundIt(state.board.speedRight + 0.1);
                //  Math.round((state.board.speedRight + 0.1) * 10) / 10;
              }

              state.board.x =
                Math.round((state.board.x + state.board.speedRight) * 10) / 10;
              state.board.frameY = 0;
              state.boardFoam.frameY = 0;

              //   state.boardFoam.x = state.board.x + -settings.boardFoam.alignmentX;
              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---

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

            case "slowright":
              if (action.payload.reset) {
                return (state.board.speedRight = 0);
              }
              if (state.board.speedRight > 0) {
                state.board.speedRight = roundIt(
                  state.board.speedRight - accSpeed
                );
              }

              state.board.x = roundIt(state.board.x + state.board.speedRight);
              //  state.board.frameY = 0;
              state.boardFoam.frameY = 0;

              //  state.boardFoam.x = state.board.x + -settings.boardFoam.alignmentX;
              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---

              //  state.surfer.frameY = 0;
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
              if (action.payload.reset) {
                return (state.board.speedLeft = 0);
              }
              if (state.board.speedLeft < 5) {
                state.board.speedLeft = roundIt(state.board.speedLeft + 0.1);
              }

              state.board.x = roundIt(state.board.x - state.board.speedLeft);
              state.board.frameY = leftFrames[Yframe];
              state.boardFoam.frameY = 1;
              //   state.boardFoam.x =
              //    state.board.x + state.board.width + -settings.boardFoam.alignmentX;
              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---

              state.surfer.frameY = 1;
              // state.surfer.x = state.board.x + 134 / 2 - 75 / 2 + 10;
              state.surfer.x = state.board.x + 134 / 2 - 75 / 2;

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

            case "slowleft":
              if (action.payload.reset) {
                return (state.board.speedLeft = 0);
              }
              if (state.board.speedLeft > 0) {
                state.board.speedLeft = roundIt(
                  state.board.speedLeft - accSpeed
                );
              }

              state.board.x = roundIt(state.board.x - state.board.speedLeft);
              //   state.board.frameY = 1;
              //   state.boardFoam.frameY = 1;
              //   state.boardFoam.x =
              //    state.board.x + state.board.width + -settings.boardFoam.alignmentX;

              //   test
              if (rightFrames.includes(state.board.frameY)) {
                state.board.frameY = rightFrames[Yframe];

                state.boardFoam.x =
                  state.board.x + -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 0;
              } else {
                state.board.frameY = leftFrames[Yframe];

                state.boardFoam.x =
                  state.board.x +
                  state.board.width +
                  -settings.boardFoam.alignmentX;
                state.boardFoam.frameY = 1;
              }
              //   ---
              //   state.surfer.frameY = 1;
              // state.surfer.x = state.board.x + 134 / 2 - 75 / 2 + 10;
              state.surfer.x = state.board.x + 134 / 2 - 75 / 2;

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
              if (action.payload.reset) {
                return (state.board.speedUp = 0);
              }
              // if (state.board.speedRight < 5) {
              //    state.board.speedRight = roundIt(state.board.speedRight + 0.1);
              //  }

              if (state.board.speedUp < 5) {
                state.board.speedUp = roundIt(state.board.speedUp + 0.1);
              }

              state.board.y = roundIt(state.board.y - state.board.speedUp);
              state.board.x = roundIt(state.board.x + state.board.speedUp);
              state.board.frameY = rightFrames[Yframe];

              state.boardFoam.x =
                state.board.x + -settings.boardFoam.alignmentX;
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
            case "rightUpslow":
              if (action.payload.reset) {
                return (state.board.speedUp = 0);
              }

              // if (state.board.speedRight > 0) {
              //    state.board.speedRight = roundIt(state.board.speedRight - 0.1);
              //  }

              if (state.board.speedUp > 0) {
                state.board.speedUp = roundIt(state.board.speedUp - accSpeed);
              }

              state.board.y = roundIt(state.board.y - state.board.speedUp);
              state.board.x = roundIt(state.board.x + state.board.speedUp);
              state.board.frameY = rightFrames[Yframe];

              state.boardFoam.x =
                state.board.x + -settings.boardFoam.alignmentX;
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
              if (action.payload.reset) {
                return (state.board.speedLeft = 0);
              }
              if (state.board.speedLeft < 5) {
                state.board.speedLeft = roundIt(state.board.speedLeft + 0.1);
              }

              //  if (state.board.speedDown < 5) {
              //    state.board.speedDown = roundIt(state.board.speedDown + 0.1);
              //  }

              state.board.y = roundIt(state.board.y + state.board.speedLeft);
              state.board.x = roundIt(state.board.x - state.board.speedLeft);
              state.board.frameY = leftFrames[Yframe];

              state.boardFoam.x =
                state.board.x +
                state.board.width +
                -settings.boardFoam.alignmentX;

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

            case "slowleftDown":
              if (action.payload.reset) {
                return (state.board.speedLeft = 0);
              }
              if (state.board.speedLeft < 5) {
                state.board.speedLeft = roundIt(
                  state.board.speedLeft - accSpeed
                );
              }

              //  if (state.board.speedDown < 5) {
              //    state.board.speedDown = roundIt(state.board.speedDown - 0.1);
              //  }

              state.board.y = roundIt(state.board.y + state.board.speedLeft);
              state.board.x = roundIt(state.board.x - state.board.speedLeft);
              state.board.frameY = leftFrames[Yframe];

              state.boardFoam.x =
                state.board.x +
                state.board.width +
                -settings.boardFoam.alignmentX;

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
              //  state.board.speedUp = 0;
              //  state.board.speedRight = 0;
              //  state.board.speedDown = 0;
              //  state.board.speedLeft = 0;
              break;
          }
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
        state.boardFoam.frameX < 2 ? state.boardFoam.frameX + 1 : 0;
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
  setFrameY,
  popBoardTrail,
  pushBoardTrail,
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
    boardTrail: state.playerObject.boardTrail,
    surfer: state.playerObject.surfer,
    hitbox: state.playerObject.hitbox,
  };
};

export default playerObjectSlice.reducer;
