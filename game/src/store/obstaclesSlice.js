/** @format */

// /** @format */
// import { createSlice } from "@reduxjs/toolkit";
// import { useSelector } from "react-redux";

// import stonePic from "../sprite/Stones.png";

// import { frame, speed } from "./gameplaySlice";

// const canvas = {
//   width: 1200,
//   height: 800,
// };

// class Stone {
//   constructor(x, y, size) {
//     this.x = x;
//     // this.y = Math.random() * (canvas.height - 125) + 125;
//     // this.size = Math.floor(Math.random() * 70) + 30;
//     this.y = y;
//     this.size = size;
//     this.image = stonePic;
//   }

//   draw = (ctx) => {
//     this.image.onload = ctx.drawImage(
//       this.image,
//       this.x,
//       this.y,
//       this.size,
//       this.size / 1.5
//     );
//   };

//   //   update = (tempSpeed, ctx) => {
//   //     this.x = tempSpeed
//   //       ? this.x - gamePlay.tempSpeed - (stonesSpeed - 5)
//   //       : this.x - gamePlay.speed - (stonesSpeed - 5);
//   //     this.draw(ctx);
//   //   };
//   update = (obstacleSpeed, ctx) => {
//     this.x = this.x - speed - (obstacleSpeed - 5);
//     this.draw(ctx);
//   };
// }

// const initialState = {
//   data: [],
//   spawnRate: 4,
//   speed: 2,
//   status: "idle",
//   error: null,
// };

// export const obstaclesSlice = createSlice({
//   name: "obstacles",
//   initialState,
//   reducers: {
//     handleObstacles: (state, action) => {
//       if (action.payload % (state.spawnRate * 30) === 0) {
//         const y = Math.random() * (canvas.height - 125 - 50) + 125;
//         const x = canvas.width;
//         const size = Math.floor(Math.random() * 70) + 30;
//         // state.data.push(new Stone(x, y, size));

//         if (state.data.length > 30) {
//           state.data.shift();
//         }

//         state.data.push({
//           x: x,
//           y: y,
//           size: size,
//         });
//       }
//       //   console.log("dede");
//     },
//     moveObstacles: (state, action) => {
//       //   console.log(action.payload);
//       state.data.forEach((o) => {
//         // console.log(action.payload);s
//         o.x = o.x - action.payload - state.speed;
//         // o.update(state.speed, action.payload);
//         // o.x = o.x - speed - state.speed;
//         // o.image.onload = action.payload.drawImage(
//         //   o.image,
//         //   (o.x = o.x - speed - state.speed),
//         //   o.y,
//         //   o.size,
//         //   o.size / 1.5
//         // );
//       });
//     },
//   },
// });

// export const { handleObstacles, moveObstacles } = obstaclesSlice.actions;

// // export states
// export const status = (state) => state.gameplay.status;
// export const error = (state) => state.gameplay.error;

// // export data
// export const obstacles = (state) => state.gameplay.data;
// // export const data = (state) => state.scores.data;

// export default obstaclesSlice.reducer;
