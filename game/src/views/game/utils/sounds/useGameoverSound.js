/** @format */

import gameoverSoundFile from "../../../../audio/game-over.mp3";

import useSound from "use-sound";

export const useGameoverSound = () => {
 const [playGameoverSound] = useSound(gameoverSoundFile);

 return {
  playGameoverSound,
 };
};
