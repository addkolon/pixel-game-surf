/** @format */

export const settings = {
  // general
  lives: 5,
  scorePerSave: 50,
  canvasWidth: 800,
  canvasHeight: 600,
  gameSpeed: 1,
  // boat
  boat: {
    speed: 6,
    animationSpeed: 10,
    startPositionX: 100,
    startPositionY: 300,
  },
  // stones
  stones: {
    spawnRate: 100,
    speed: 3,
    // minimumSize: 30,
    // maximumSize: 90,
    minimumSize: 30,
    maximumSize: 60,
    speedModifier: {
      boatMovement: {
        right: 4,
        left: 2.5,
      },
    },
  },
  // drowning people
  drowningPeople: {
    spawnRate: 90,
    speed: 3,
    // minimumSize: 50,
    // maximumSize: 50,
    minimumSize: 35,
    maximumSize: 35,
    speedModifier: {
      boatMovement: {
        right: 4,
        left: 2.5,
      },
    },
  },
  // background
  background: {
    // height: 125,
    height: 150,
    mainSpeed: 1,
    bg1: {
      speed: 10,
    },
    bg2: {
      speed: 8,
    },
    bg3: {
      speed: 6,
    },
    bg4: {
      speed: 0,
    },
    speedModifier: {
      boatMovement: {
        right: 7,
        left: 4,
      },
    },
  },
  // difficulty rise
  difficulty: {
    // on timer
    timer: {
      seconds: 5,
    },
    // on saves
    savings: {
      saves: 3,
    },
  },
};
