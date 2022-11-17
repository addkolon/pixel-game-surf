/** @format */

// stenar o skräp 4 frames var
// foam 6 frames,
//

export const settings = {
 // general
 lives: 5,
 scorePerSave: 50,
 canvasWidth: 800,
 canvasHeight: 400,
 gameSpeed: 1,
 gameSpeedUpdate: 0.3, // hur mycket speeden ökar när difficulty ökar
 startGameSpawnDelay: 5, // ~ seconds

 board: {
//   speed: 5,
speed: 0,
  animationSpeed: 5,
  startPositionX: 0,
  startPositionY: 150,
 },

 boardFoam: {
  animationSpeed: 8,
  alignmentX: 40,
  alignmentY: 17,
 },

 surfer: {
  height: 75,
  alignmentOnBoardX: 30,
  alignmentOnBoardY: 53,
  animationSpeed: 5,
 },

 obstacles: {
  spawnRate: 100,
  speed: 5,
  minimumSize: 24,
  maximumSize: 48,
  speedModifier: {
   enabled: false,
   playerObjectMovement: {
    right: 4,
    left: 2.5,
   },
  },
  boomAnimationSpeed: 5,
 },

 pickups: {
  spawnRate: 100,
  speed: 5,
  minimumSize: 35,
  maximumSize: 35,
  animationSpeed: 10,
  speedModifier: {
   enabled: false,
   playerObjectMovement: {
    right: 4,
    left: 2.5,
   },
  },
 },

 foam: {
  animationSpeed: 10,
 },

 background: {
  height: 60,
  mainSpeed: 0.1,
  bg1: {
   speed: 3,
  },
  bg2: {
   speed: 15,
  },
  // speedModifier: {
  //   playerObjectMovement: {
  //     right: 7,
  //     left: 4,
  //   },
  // },
 },
 foreground: {
  height: 264,
  mainSpeed: 0.1,
  fg: {
   speed: 50,
  },
  fg1: {
   speed: 8.2,
  },
  // speedModifier: {
  //   playerObjectMovement: {
  //     right: 7,
  //     left: 4,
  //   },
  // },
 },
 difficulty: {
  timer: {
   enabled: false,
   seconds: 5,
  },
  savings: {
   enabled: true,
   saves: 3,
  },
 },
 sound: {
  music: {
   volume: 0.3,
  },
  wave: {
   volume: 0.7,
  },
  crash: {
   volume: 0.7,
  },
  pickup: {
   volume: 0.2,
  },
  gameover: {
   volume: 0.7,
  },
 },
};
