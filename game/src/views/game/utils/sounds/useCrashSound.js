/** @format */

import crashSoundFile from "../../../../audio/stone-hit.mp3";

import useSound from "use-sound";

export const useCrashSound = () => {
 const [playCrashSound] = useSound(crashSoundFile);

 return {
  playCrashSound,
 };
};
