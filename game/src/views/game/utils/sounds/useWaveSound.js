/** @format */

import waveSoundFile from "../../../../audio/wave-sound.mp3";

import useSound from "use-sound";
import { useState } from "react";

export const useWaveSound = () => {
 const [playWaveSound, { stopWaveSound }] = useSound(waveSoundFile);

 return {
  playWaveSound,
  stopWaveSound,
 };
};
