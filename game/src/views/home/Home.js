/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, getTopScores, status } from "../../store/scoresSlice";
import { getToken } from "../../store/gameplaySlice";

export const Home = ({ setView }) => {
 const dispatch = useDispatch();
 const scoresStatus = useSelector(status);
 const scoreToBeat = useSelector(data).scores[0];
 console.log(scoreToBeat);
 useEffect(() => {
  dispatch(getTopScores());
 }, []);

 if (scoresStatus !== "succeeded") {
  return <div>loading</div>;
 }

 return (
  <main>
   <div id="fake-canvas" className="game-container">
    <div className="screen"></div>
    <div id="content">
     <div className="score-to-beat">
      <h1>SCORE TO BEAT: {scoreToBeat.score ?? "No scores"}</h1>
     </div>

     <button
      onClick={() => {
       dispatch(getToken());
       setView("game");
      }}
      id="startBtn"
      className="start-button"
     >
      Start Game
     </button>
     <div className="how-to-play">
      <span className="modal-link" onClick={() => setView("how_to_play")}>
       HOW TO PLAY
      </span>
     </div>

     {/* <div className="how-to-play">
            <span className="modal-link" onClick={() => setView("settings")}>
              Settings
            </span>
          </div> */}

     <div className="game-dev">Created by: Olof Aksberg & Mattias Lager</div>
    </div>
   </div>
  </main>
 );
};
