/** @format */

import { useState } from "react";
import gameSongFile from "../../../../audio/song.mp3";

import useSound from "use-sound";
import { settings } from "../../../../config/settings";

export const useGameMusic = () => {
 const [gameMusicPlaying, setGameMusicPlaying] = useState(true);
 const [playGameMusic, { stop }] = useSound(gameSongFile, {
  volume: settings.sound.music.volume,
 });

 return {
  playGameMusic,
  stopGameMusic: stop,
  gameMusicPlaying,
  setGameMusicPlaying,
 };
};
