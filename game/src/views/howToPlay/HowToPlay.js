/** @format */

import arrowKeys from "../../sprite/arrow-keys.png";

export const HowToPlay = ({ setView }) => {
  return (
    <main>
      <div id="fake-canvas" className="game-container">
        <div className="screen"></div>
        <div id="content">
          <div id="modal-how-to-play" className={"active"}>
            <h2>HOW TO PLAY</h2>
            <p>
              The aim of the game is to surf your way to clean the ocean from
              all the trash all the brash people been throwing into it. But
              beware of the stones, they will brake your board.
            </p>
            <img src={arrowKeys} alt="arrow keys" />
            <p>Use arrow keys to stear the surfer</p>
            <span className="modal-close" onClick={() => setView("home")}>
              CLOSE
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};
