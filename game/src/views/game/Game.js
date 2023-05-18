/** @format */

import lifeRing from "../../sprite/heart.png";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Canvas } from "./components";
import { gameScore, lives as sliceLives } from "../../store/gameplaySlice";

import { useSounds } from "./utils/sounds/useSounds";

import { setMuteAll, muteAll } from "../../store/soundSlice";
import { setFrameY } from "../../store/playerObjectSlice";
import { settings } from "../../config/settings";
import { data } from "../../store/scoresSlice";

export const Game = ({ setView }) => {
 const dispatch = useDispatch();
 const lives = useSelector(sliceLives);
 const score = useSelector(gameScore);
 const muteAllYao = useSelector(muteAll);

 const scoreToBeat = useSelector(data).scores[0];

 const { playGameoverSound } = useSounds();

 const Yframe = settings.lives - lives.length;

 const handleKeyDown = (e) => {
  if (e.code !== "KeyM") return;
  dispatch(setMuteAll());
 };

 useEffect(() => {
  dispatch(setFrameY({ frameY: Yframe }));
 }, [lives]);

 useEffect(() => {
  if (lives.length < 1) {
   try {
    playGameoverSound();
    setView("gameOver");
   } catch (error) {
    throw new Error("fail");
   }
  }
 }, [lives]);

 return (
  <div className="main" onKeyDown={(e) => handleKeyDown(e)}>
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
       HIGH SCORE: <span id="high-scoure">{false ?? "No scores"}</span>
      </h2>
      <h2>
       YOUR SCORE: <span id="saves">{score}</span>
      </h2>
     </div>
    </div>
    <Canvas />
    <div className="bottom">
     <h2 className="music-mute">
      PRESS KEY M TO: {muteAllYao ? "UNMUTE SOUND" : "MUTE SOUND"}
     </h2>
     <h2 className="music">&#9835; EVIG FERIE - ENESTE</h2>
    </div>
   </main>
  </div>
 );
};
