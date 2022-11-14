/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, getTopScores, status } from "../../store/scoresSlice";

import {
  setCrashVolume,
  setGameoverVolume,
  setMusicVolume,
  setPickupVolume,
  setWavesVolume,
  music,
  waves,
  pickup,
  crash,
  gameover,
} from "../../store/soundSlice";
import { Settings } from "../settings/Settings";
import { If } from "../../utils/If";

export const Home = ({ setView }) => {
  const dispatch = useDispatch();
  const scoresStatus = useSelector(status);

  const musicYe = useSelector(music);
  const wavesYe = useSelector(waves);
  const pickupYe = useSelector(pickup);
  const crashYe = useSelector(crash);
  const gameoverYe = useSelector(gameover);
  //   const scoreToBeat = useSelector(data).scores[0];
  // const scoreToBeat = useSelector(data)[0];
  const [howToPlayState, setHowToPlayState] = useState(false);
  const [settingsState, setSettingsState] = useState(false);

  // useEffect(() => {
  //   dispatch(getTopScores());
  // }, []);

  // if (scoresStatus !== "succeeded") {
  //   return <div> loading</div>;
  // }
  if (scoresStatus === "loading") {
    return <div> loading</div>;
  }


  return (
    <main>
      <div id="fake-canvas" className="game-container">
        <div className="screen"></div>
        <div id="content">
          <div className="score-to-beat">
            {/* <h1>SCORE TO BEAT: 69</h1> */}
            <h1>
              SCORE TO BEAT: {}
              {/* {scoreToBeat.score} */}
              1337
            </h1>
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
            <span
              className="modal-link"
              onClick={() => setView("how_to_play")}
            >
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
