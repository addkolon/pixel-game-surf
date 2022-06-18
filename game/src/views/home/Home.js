/** @format */

import { useSelector } from "react-redux";
import { data } from "../../store/scoresSlice";

export const Home = ({ setView }) => {
 const scoreToBeat = useSelector(data).scores[0];

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
