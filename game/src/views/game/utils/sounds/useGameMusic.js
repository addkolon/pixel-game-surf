/** @format */

import { useState } from "react";
import gameSongFile from "../../../../audio/song.mp3";

import useSound from "use-sound";
import { settings } from "../../../../config/settings";

import { setMusicVolume, music } from "../../../../store/soundSlice";
import { useSelector } from "react-redux";

export const useGameMusic = () => {
 const theMusic = useSelector(music);
 const [gameMusicPlaying, setGameMusicPlaying] = useState(true);
 const [playGameMusic, { stop }] = useSound(gameSongFile, {
  volume: theMusic.volume,
 });

 return {
  playGameMusic,
  stopGameMusic: stop,
  gameMusicPlaying,
  setGameMusicPlaying,
 };
};
