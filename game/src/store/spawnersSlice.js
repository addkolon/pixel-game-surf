/** @format */
import { createSlice } from "@reduxjs/toolkit";
import { settings } from "../pages/game/settings";
import { failSpawnPosition } from "../pages/game/utils/spawners/utils/failSpawnPosition";
import { randomMinMax } from "../utils/randomMinMax";

const initialState = {
  obstacles: [],
  pickups: [],
  speed: 1,
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
        settings.canvasHeight - size
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
  },
});

export const { spawnObstacle, moveObstacles } = spawnersSlice.actions;

// export data
export const spawners = (state) => {
  return {
    obstacles: state.spawners.obstacles,
    pickups: state.spawners.pickups,
  };
};

export default spawnersSlice.reducer;
