/** @format */

export const Home = ({ setView }) => {
 return (
  <main>
   <div id="fake-canvas" className="game-container">
    <div className="screen"></div>
    <div id="content">
     <div className="score-to-beat">
      <h1>SCORE TO BEAT: {false ?? "No scores"}</h1>
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
      <span className="modal-link" onClick={() => setView("how_to_play")}>
       HOW TO PLAY
      </span>
     </div>
     <div className="game-dev">Created by: Olof Aksberg & Mattias Lager</div>
    </div>
   </div>
  </main>
 );
};
