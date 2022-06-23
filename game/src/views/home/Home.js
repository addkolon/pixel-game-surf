/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, getTopScores, status } from "../../store/scoresSlice";
import arrowKeys from "../../sprite/arrow-keys.png";

// let modal = document.querySelector('.modal-rules');
// let modalLink = document.querySelector('.modal-link');
// let modalClose = document.querySelector('.modal-close');

// modalLink.onclick = function(){
//   modal.classList.toggle('active');
// }

// modalClose.onclick = function(){
//   modal.classList.toggle('active');
// }


export const Home = ({ setView }) => {
 const dispatch = useDispatch();
 const scoresStatus = useSelector(status);
 const scoreToBeat = useSelector(data).scores[0];
 const [active, setActive] = useState(false);

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
      <h1>SCORE TO BEAT: {scoreToBeat.score}</h1>
      {/* av {scoreToBeat.name} */}
     </div>

     <button
      onClick={() => {
       setView("game");
      }}
      id="startBtn"
      className="start-button"
     >
      Start Game
     </button>
     <div className="how-to-play">
      <span className="modal-link" onClick={() => setActive(!active)}>HOW TO PLAY</span>
     </div>
     <div className="game-dev">
      Created by: Olof Aksberg & Mattias Lager
     </div>
     <div id="modal-how-to-play" className={`${active ? "active" : ""}`}>
      <h2>HOW TO PLAY</h2>
      <p>
        The aim of the game is to surf your way to clean the ocean from all the trash all the brash people been throwing into it. 
        But beware of the stones, they will brake your board.
      </p>
      <img src={arrowKeys} alt="" />
      <p>
        Use arrow keys to stear the surfer
      </p>
      <span className="modal-close" onClick={() => setActive(false)}>CLOSE</span>
     </div>
    </div>
   </div>
  </main>
 );
};
