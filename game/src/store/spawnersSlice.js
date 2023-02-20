/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../config/settings";

import { randomMinMax } from "../utils/randomMinMax";

export const failSpawnPosition = (arr, x, y) => {
  for (let i = 0; i < arr.length; i++) {
    let s = arr[i];
    if (
      x < s.x + s.size &&
      x + s.size > s.x &&
      y < s.y + s.size &&
      y + s.size > s.y
    ) {
      return true;
    }
    return false;
  }
};

const initialState = {
  obstacles: [],
  pickups: [],
  speed: 1,
  boom: [],
};

export const spawnersSlice = createSlice({
  name: "spawners",
  initialState,
  reducers: {
    spawnObstacle: (state, action) => {
      const size = randomMinMax(
        settings.obstacles.minimumSize,
        settings.obstacles.maximumSize
      );
      const x = settings.canvasWidth;
      let y = randomMinMax(
        settings.background.height,
        settings.canvasHeight - size - 30
      );
      while (
        failSpawnPosition(state.pickups, x, y) ||
        failSpawnPosition(state.obstacles, x, y)
      ) {
        y = randomMinMax(
          settings.background.height,
          settings.canvasHeight - size
        );
      }
      state.obstacles.unshift({
        x: x,
        y: y,
        size: size,
        frame: Math.floor(Math.random() * 3),
      });
    },
    moveObstacles: (state, action) => {
      state.obstacles = state.obstacles.filter(
        (o, i) => o.x > -settings.obstacles.maximumSize
      );
      state.obstacles.map((o, i) => {
        o.x = o.x - state.speed;
      });
    },

    spawnPickup: (state, action) => {
      const size = randomMinMax(
        settings.pickups.minimumSize,
        settings.pickups.maximumSize
      );
      const x = settings.canvasWidth;
      let y = randomMinMax(
        settings.background.height,
        settings.canvasHeight - size - 30
      );

      while (
        failSpawnPosition(state.pickups, x, y) ||
        failSpawnPosition(state.obstacles, x, y)
      ) {
        y = randomMinMax(
          settings.background.height,
          settings.canvasHeight - size
        );
      }
      state.pickups.unshift({
        x: x,
        y: y,
        frameX: 0,
        frameY: Math.floor(Math.random() * 2),
        size: size,
        frame: 0,
      });
    },
    movePickups: (state, action) => {
      state.pickups = state.pickups.filter(
        (o, i) => o.x > -settings.pickups.maximumSize
      );
      state.pickups.map((o, i) => {
        o.x = o.x - state.speed;
      });
    },

    handleHit: (state, action) => {
      if (action.payload.arr === "obstacles") {
        state.obstacles = state.obstacles.filter(
          (o, i) => i !== action.payload.data.index
        );
        const newBoom = {
          x: action.payload.data.obj.x,
          y: action.payload.data.obj.y,
          width: 39,
          height: 41,
          frameX: 0,
          frameY: 0,
        };
        state.boom.push(newBoom);
      } else {
        state.pickups = state.pickups.filter(
          (o, i) => i !== action.payload.index
        );
      }
    },

    animateBoom: (state, action) => {
      state.boom = state.boom.filter((o, i) => o.frameX < 9);
      state.boom = state.boom.map((o, i) => {
        return {
          ...o,
          frameX: o.frameX + 1,
        };
      });
    },

    animatePickups: (state, action) => {
      state.pickups = state.pickups.map((o, i) => {
        return {
          ...o,
          frameX: o.frameX < 3 ? o.frameX + 1 : 0,
        };
      });
    },

    updateSpawnersSpeed: (state, action) => {
      state.speed += settings.gameSpeedUpdate;
    },

    resetSpawners: (state, action) => {
      state.obstacles = [];
      state.pickups = [];
      state.speed = 1;
      state.boom = [];
    },
  },
});

export const {
  spawnObstacle,
  moveObstacles,
  spawnPickup,
  movePickups,
  animatePickups,
  handleHit,
  animateBoom,
  updateSpawnersSpeed,

  resetSpawners,
} = spawnersSlice.actions;

// export data
export const spawners = (state) => {
  return {
    obstacles: state.spawners.obstacles,
    pickups: state.spawners.pickups,
    boom: state.spawners.boom,
  };
};

export default spawnersSlice.reducer;
