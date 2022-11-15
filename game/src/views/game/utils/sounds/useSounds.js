/** @format */

import waveSoundFile from "../../../../audio/wave-sound.mp3";

import gameSongFile from "../../../../audio/song.mp3";

import crashSoundFile from "../../../../audio/stone-hit.mp3";

import pickupSoundFile from "../../../../audio/pick-up.mp3";

import gameoverSoundFile from "../../../../audio/game-over.mp3";

import useSound from "use-sound";

import {
 music,
 waves,
 crash,
 pickup,
 gameover,
} from "../../../../store/soundSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export const useSounds = () => {
 const theWaves = useSelector(waves);
 const theMusic = useSelector(music);

 const theCrash = useSelector(crash);
 const thePickup = useSelector(pickup);

 const theGameover = useSelector(gameover);

 const [playGameMusic, { stop: stopGameMusic }] = useSound(gameSongFile, {
  volume: theMusic.volume,
 });

 const [playWaveSound, { stop: stopWaveSound }] = useSound(waveSoundFile, {
  volume: theWaves.volume,
 });

 const [playCrashSound] = useSound(crashSoundFile, {
  volume: theCrash.volume,
 });

 const [playPickupSound] = useSound(pickupSoundFile, {
  volume: thePickup.volume,
 });

 const [playGameoverSound] = useSound(gameoverSoundFile, {
  volume: theGameover.volume,
 });

 useEffect(() => {
  if (theMusic.enabled) playGameMusic();

  return () => stopGameMusic();
 }, [theMusic.enabled, playGameMusic]);

 useEffect(() => {
  if (theWaves.enabled) playWaveSound();

  return () => stopWaveSound();
 }, [theWaves.enabled, playWaveSound]);

 return {
  playWaveSound,
  stopWaveSound,

  playGameMusic,
  stopGameMusic,

  playCrashSound,

  playPickupSound,

  playGameoverSound,
 };
};
