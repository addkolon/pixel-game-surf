/** @format */

import {
  lives,
  getLives,
  gameOver,
  setGameOver,
  startGame,
} from "../../store/gameplaySlice";

import { data, getTopScores } from "../../store/scoresSlice";

import lifeRing from "../../sprite/heart.png";
import logotype from "../../sprite/logotype.png";
import { useDispatch, useSelector } from "react-redux";
import { Canvas } from "./canvas/Canvas.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { settings } from "./settings";
import { Scoreboard } from "../../components/Scoreboard";
import { useHandleGameMusic } from "./utils/sounds/useHandleGameMusic";
import { reset } from "../../store/playerObjectSlice";

export const Game = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameOverState = useSelector(gameOver);
  const scores = useSelector(data);
  const lives = useSelector((state) => state.gameplay.lives);
  const score = useSelector((state) => state.gameplay.score);

  const { play, stop, song, setSong } = useHandleGameMusic();

  useEffect(() => {
    if (lives.length < 1) {
      navigate("/");
      dispatch(reset());
      dispatch(setGameOver(true));
    }
  }, [lives]);

  // useEffect(() => {
  //   dispatch(getTopScores("page=1&limit=10"));
  // }, []);

  useEffect(() => {
    song ? play() : stop();
    return () => stop();
  }, [song, play, stop]);

  return (
    <div
      className="main"
      onKeyDown={(e) => {
        if (e.code === "KeyM") {
          setSong(!song);
        }
      }}
    >
      <main className="game-container">
        <div className="screen"></div>
        <div className="top">
          <div id="lives">
            <ul id="livesUl">
              {lives.map((l) => {
                return (
                  <li>
                    <img src={lifeRing} width="35px" />
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="in-game-score">
            <h2>
              HIGH SCORE: <span id="high-scoure">12500</span>
            </h2>
            <h2>
              YOUR SCORE: <span id="saves">{score}</span>
            </h2>
          </div>
        </div>
        <Canvas />
        <div className="bottom">
          <div>Key M: {song ? "mute" : "unmute"}</div>
          <h2 className="music">&#9835; EVIG FERIE - ENESTE</h2>
        </div>
      </main>
      <aside>
        <img class="logo" src={logotype} />
        <Scoreboard scores={scores.scores} />
      </aside>
    </div>
  );
};
