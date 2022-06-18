/** @format */

// stenar o skräp 4 frames var
// foam 6 frames,
//

export const settings = {
 // general
 lives: 3,
 scorePerSave: 50,
 canvasWidth: 800,
 canvasHeight: 400,
 gameSpeed: 1,
 gameSpeedUpdate: 0.3, // hur mycket speeden ökar när difficulty ökar
 startGameSpawnDelay: 5, // ~ seconds

 // boat
 board: {
  speed: 5,
  animationSpeed: 5,
  startPositionX: 0,
  startPositionY: 150,
 },

 // boardFoam
 boardFoam: {
  animationSpeed: 8,
  alignmentX: 40,
  alignmentY: 17,
 },

 // surfer
 surfer: {
  // height ej dynamisk atm
  height: 75,
  // ---
  alignmentOnBoardX: 30,
  alignmentOnBoardY: 53,
  animationSpeed: 5,
 },

 // stones
 obstacles: {
  spawnRate: 100,
  speed: 5,
  // minimumSize: 30,
  // maximumSize: 90,
  minimumSize: 24,
  maximumSize: 48,
  speedModifier: {
   enabled: false,
   playerObjectMovement: {
    right: 4,
    left: 2.5,
   },
  },
  // boom
  boomAnimationSpeed: 5,
 },
 // drowning people
 pickups: {
  // spawnRate: 90,
  spawnRate: 100,
  speed: 5,
  // minimumSize: 50,
  // maximumSize: 50,
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
 // foam
 foam: {
  animationSpeed: 10,
 },
 // background
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
 // foreground
 foreground: {
  height: 264,
  mainSpeed: 0.1,
  fg: {
   speed: 10,
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
 // difficulty rise
 difficulty: {
  // on timer
  timer: {
   enabled: false,
   seconds: 5,
  },
  // on saves
  savings: {
   enabled: true,
   saves: 1,
  },
 },
};
