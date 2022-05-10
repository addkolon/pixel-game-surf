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

export const Game = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const gameOverState = useSelector(gameOver);
  const scores = useSelector(data);
  const lives = useSelector((state) => state.gameplay.lives);
  const score = useSelector((state) => state.gameplay.score);

  useEffect(() => {
    if (lives.length < 1) {
      navigate("/");
      dispatch(setGameOver(true));
    }
  }, [lives]);

  useEffect(() => {
    dispatch(getTopScores("page=1&limit=10"));
  }, []);

  return (
    <div class="main">
      <main className="game-container">
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
          <div id="saves">{score}</div>
        </div>
        <Canvas
          canvasWidth={settings.canvasWidth}
          canvasHeight={settings.canvasHeight}
        />
        <div className="bottom">music</div>
      </main>
      <aside>
        <img class="logo" src={logotype} />
        <Scoreboard scores={scores.scores} />
      </aside>
    </div>
  );
};
