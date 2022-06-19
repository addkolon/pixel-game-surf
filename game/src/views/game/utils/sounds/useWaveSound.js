/** @format */

import waveSoundFile from "../../../../audio/wave-sound.mp3";

import useSound from "use-sound";
import { useState } from "react";
import { settings } from "../../../../config/settings";

export const useWaveSound = () => {
 const [playWaveSound, { stop }] = useSound(waveSoundFile, {
  volume: settings.sound.wave.volume,
 });

 return {
  playWaveSound,
  stopWaveSound: stop,
 };
};
