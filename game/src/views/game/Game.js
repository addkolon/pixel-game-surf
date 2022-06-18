/** @format */

import { gameOver } from "../../store/gameplaySlice";

import { data } from "../../store/scoresSlice";

import lifeRing from "../../sprite/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useHandleGameMusic } from "./utils/sounds/useHandleGameMusic";
import { Canvas } from "./components";
import { useGameoverSound } from "./utils/sounds/useGameoverSound";
import { useWaveSound } from "./utils/sounds/useWaveSound";

export const Game = ({ setView }) => {
 const dispatch = useDispatch();

 const lives = useSelector((state) => state.gameplay.lives);
 const score = useSelector((state) => state.gameplay.score);

 const { play, stop, song, setSong } = useHandleGameMusic();

 const { playGameoverSound } = useGameoverSound();
 const { playWaveSound, stopWaveSound } = useWaveSound();

 useEffect(() => {
  if (lives.length < 1) {
   //    navigate("/");
   //    dispatch(resetSpawners());
   //    dispatch(resetPlayer());
   //    dispatch(resetGameplay(true));
   playGameoverSound();
   setView("gameOver");

   // dispatch(setGameOver(true));
  }
 }, [lives]);

 useEffect(() => {
  song ? play() : stop();
  return () => stop();
 }, [song, play, stop]);

 useEffect(() => {
  playWaveSound();
  //   return () => stopWaveSound();
 }, [playWaveSound]);

 return (
  <div
   className="main"
   onKeyDown={(e) => {
    if (e.code === "KeyM") {
     setSong(!song);
    }
   }}
  >
   <main className="game-container">
    <div className="screen"></div>
    <div className="top">
     <div id="lives">
      <ul id="livesUl">
       {lives.map((l) => {
        return (
         <li>
          <img src={lifeRing} width="35px" />
         </li>
        );
       })}
      </ul>
     </div>
     <div className="in-game-score">
      <h2>
       HIGH SCORE: <span id="high-scoure">12500</span>
      </h2>
      <h2>
       YOUR SCORE: <span id="saves">{score}</span>
      </h2>
     </div>
    </div>
    <Canvas />
    <div className="bottom">
     <div>Key M: {song ? "mute" : "unmute"}</div>
     <h2 className="music">&#9835; EVIG FERIE - ENESTE</h2>
    </div>
   </main>
   {/* <aside>
    <img class="logo" src={logotype} />
    <Scoreboard scores={scores.scores} />
   </aside> */}
  </div>
 );
};
