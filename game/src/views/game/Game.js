/** @format */

import { data } from "../../store/scoresSlice";

import lifeRing from "../../sprite/heart.png";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useGameMusic } from "./utils/sounds/useGameMusic";
import { Canvas } from "./components";
import { useGameoverSound } from "./utils/sounds/useGameoverSound";
import { useWaveSound } from "./utils/sounds/useWaveSound";
import { gameScore, lives as sliceLives } from "../../store/gameplaySlice";

export const Game = ({ setView }) => {
 const lives = useSelector(sliceLives);
 const score = useSelector(gameScore);
 const scoreToBeat = useSelector(data).scores[0];

 const { playGameMusic, stopGameMusic, gameMusicPlaying, setGameMusicPlaying } =
  useGameMusic();
 const { playGameoverSound } = useGameoverSound();
 const { playWaveSound, stopWaveSound } = useWaveSound();

 useEffect(() => {
  if (lives.length < 1) {
   playGameoverSound();
   setView("gameOver");
  }
 }, [lives]);

 useEffect(() => {
  gameMusicPlaying ? playGameMusic() : stopGameMusic();
  return () => stopGameMusic();
 }, [gameMusicPlaying, playGameMusic, stopGameMusic]);

 useEffect(() => {
  playWaveSound();
  const int = setInterval(() => {
   playWaveSound();
  }, 10000);
  return () => {
   clearInterval(int);
   stopWaveSound();
  };
 }, [playWaveSound]);

 return (
  <div
   className="main"
   onKeyDown={(e) => {
    if (e.code === "KeyM") {
     setGameMusicPlaying(!gameMusicPlaying);
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
       HIGH SCORE: <span id="high-scoure">{scoreToBeat.score}</span>
      </h2>
      <h2>
       YOUR SCORE: <span id="saves">{score}</span>
      </h2>
     </div>
    </div>
    <Canvas />
    <div className="bottom">
     <div>Key M: {gameMusicPlaying ? "mute" : "unmute"}</div>
     <h2 className="music">&#9835; EVIG FERIE - ENESTE</h2>
    </div>
   </main>
  </div>
 );
};
