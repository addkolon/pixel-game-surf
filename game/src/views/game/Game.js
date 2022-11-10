/** @format */

import { data } from "../../store/scoresSlice";

import lifeRing from "../../sprite/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useGameMusic } from "./utils/sounds/useGameMusic";
import { Canvas } from "./components";
import { useGameoverSound } from "./utils/sounds/useGameoverSound";
import { useWaveSound } from "./utils/sounds/useWaveSound";
import { gameScore, lives as sliceLives } from "../../store/gameplaySlice";

import { useSounds } from "./utils/sounds/useSounds";

import {
 setMusicVolume,
 setMuteAll,
 muteAll,
 music,
 waves,
} from "../../store/soundSlice";

export const Game = ({ setView }) => {
<<<<<<< HEAD
 const dispatch = useDispatch(); 
 const muteSound = useSelector(muteAll);
=======
 const dispatch = useDispatch();
>>>>>>> f7b9aa0822cd243b749a62e18368db19c1c49087
 const lives = useSelector(sliceLives);
 const score = useSelector(gameScore);
 const scoreToBeat = useSelector(data)[0];

 const theWaves = useSelector(waves);
 const theMusic = useSelector(music);

 //  const { playGameMusic, stopGameMusic, gameMusicPlaying, setGameMusicPlaying } =
 //   useGameMusic();

 const { playGameMusic, stopGameMusic, playWaveSound, stopWaveSound } =
  useSounds();

 const { playGameoverSound } = useGameoverSound();
 //  const { playWaveSound, stopWaveSound } = useWaveSound();

 useEffect(() => {
  if (lives.length < 1) {
   playGameoverSound();
   setView("gameOver");
  }
 }, [lives]);

 //  useEffect(() => {
 //   gameMusicPlaying ? playGameMusic() : stopGameMusic();
 //   return () => stopGameMusic();
 //  }, [gameMusicPlaying, playGameMusic, stopGameMusic]);

 //  useEffect(() => {
 //   console.log(theMusic.enabled);
 //   theMusic.enabled ? playGameMusic() : stopGameMusic();
 //  }, [theMusic.enabled]);

 //  useEffect(() => {
 //   theWaves.enabled ? playWaveSound() : stopWaveSound();
 //  }, [theWaves.enabled]);

 //  useEffect(() => {
 //   theWaves.enabled ? playWaveSound() : stopWaveSound();
 //  }, [theWaves.enabled]);

 //  useEffect(() => {
 //   playWaveSound();
 //   const int = setInterval(() => {
 //    playWaveSound();
 //   }, 10000);
 //   return () => {
 //    clearInterval(int);
 //    stopWaveSound();
 //   };
 //  }, [playWaveSound]);

 return (
  <div
   className="main"
   onKeyDown={(e) => {
    if (e.code === "KeyM") {
     //  setGameMusicPlaying(!gameMusicPlaying);
     //  dispatch(setMusicVolume(0.1));
     dispatch(setMuteAll());
    }
   }}
  >
   <main className="game-container">
    <div className="screen"></div>
    <div className="top">
     <div id="lives">
      <ul id="livesUl">
       {lives.map((l, i) => {
        return (
         <li key={i}>
          <img src={lifeRing} width="35px" />
         </li>
        );
       })}
      </ul>
     </div>
     <div className="in-game-score">
      <h2>
       HIGH SCORE: <span id="high-scoure">
        {/* {scoreToBeat.score} */}
        1337
        </span>
      </h2>
      <h2>
       YOUR SCORE: <span id="saves">{score}</span>
      </h2>
     </div>
    </div>
    <Canvas />
    <div className="bottom">
     <h2 className="music-mute">
      PRESS KEY M TO: {true ? "MUTE MUSIC" : "UNMUTE MUSIC"}
     </h2>
     <h2 className="music">&#9835; EVIG FERIE - ENESTE</h2>
    </div>
   </main>
  </div>
 );
};
