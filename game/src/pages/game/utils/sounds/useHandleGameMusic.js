/** @format */

import { useState } from "react";
import gameSongFile from "../../../../audio/song.mp3";

import useSound from "use-sound";

export const useHandleGameMusic = () => {
  const [song, setSong] = useState(true);
  const [play, { stop }] = useSound(gameSongFile, {
    onend: () => {
      setSong(true);
    },
  });

  return {
    play,
    stop,
    song,
    setSong,
  };
};
