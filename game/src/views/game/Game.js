/** @format */

import { data } from "../../store/scoresSlice";

import lifeRing from "../../sprite/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Canvas } from "./components";
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
 const dispatch = useDispatch(); 
 const muteSound = useSelector(muteAll);
 const lives = useSelector(sliceLives);
 const score = useSelector(gameScore);

 const { playGameoverSound } =
  useSounds();

 useEffect(() => {
  console.log(lives);
  if (lives.length < 1) {
   playGameoverSound();
   setView("gameOver");
  }
 }, [lives]);

 return (
  <div
   className="main"
   onKeyDown={(e) => {
    if (e.code === "KeyM") {
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
