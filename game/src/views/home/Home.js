/** @format */

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, getTopScores, status } from "../../store/scoresSlice";

export const Home = ({ setView }) => {
 const dispatch = useDispatch();
 const scoresStatus = useSelector(status);
 const scoreToBeat = useSelector(data).scores[0];

 useEffect(() => {
  dispatch(getTopScores("page=1&limit=10"));
 }, []);
 if (scoresStatus !== "succeeded") {
  return <div> loading</div>;
 }

 return (
  <main>
   <div id="fake-canvas" className="game-container">
    <div className="screen"></div>

    <div id="content">
     <div className="score-to-beat">
      skår to bit: {scoreToBeat.score} av {scoreToBeat.name}
     </div>

     <button
      onClick={() => {
       setView("game");
      }}
      id="startBtn"
     >
      Start Game
     </button>
    </div>
   </div>
  </main>
 );
};
