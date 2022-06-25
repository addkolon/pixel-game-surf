/** @format */

import crashSoundFile from "../../../../audio/stone-hit.mp3";

import useSound from "use-sound";
import { settings } from "../../../../config/settings";

export const useCrashSound = () => {
 const [playCrashSound] = useSound(crashSoundFile, {
  volume: settings.sound.crash.volume,
 });

 return {
  playCrashSound,
 };
};
