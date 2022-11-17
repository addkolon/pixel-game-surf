/** @format */

import { useSelector } from "react-redux";
import { status } from "../../store/scoresSlice";

export const Home = ({ setView }) => {
  const scoresStatus = useSelector(status);

  if (scoresStatus === "loading") {
    return <div>loading</div>;
  }

  return (
    <main>
      <div id="fake-canvas" className="game-container">
        <div className="screen"></div>
        <div id="content">
          <div className="score-to-beat">
            <h1>SCORE TO BEAT: 1337</h1>
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

          {/* <div className="how-to-play">
            <span className="modal-link" onClick={() => setView("settings")}>
              Settings
            </span>
          </div> */}

          <div className="game-dev">
            Created by: Olof Aksberg & Mattias Lager
          </div>
        </div>
      </div>
    </main>
  );
};
