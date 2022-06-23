/** @format */

import gameoverSoundFile from "../../../../audio/game-over.mp3";

import useSound from "use-sound";
import { settings } from "../../../../config/settings";

export const useGameoverSound = () => {
 const [playGameoverSound] = useSound(gameoverSoundFile, {
  volume: settings.sound.gameover.volume,
 });

 return {
  playGameoverSound,
 };
};
