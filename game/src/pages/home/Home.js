/** @format */

import petter from "../../sprite/petter.png";
import person from "../../sprite/Person.png";
import stones from "../../sprite/Stones.png";
import logotype from "../../sprite/logotype.png";

import { useEffect, useState } from "react";

import { createScore, resetYourRank } from "../../store/scoresSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { If } from "../../components/utils/If";
import { Scoreboard } from "../../components/Scoreboard";
import {
  startGame,
  gameOver,
  setGameOver,
  reset,
} from "../../store/gameplaySlice";

export const Home = ({ setGameAuth }) => {
  const dispatch = useDispatch();

  const player = {
    score: useSelector((state) => state.gameplay.score),
    email: useSelector((state) => state.gameplay.playerEmail),
    name: useSelector((state) => state.gameplay.playerName),
  };
  const gameOverState = useSelector(gameOver);

  const [inputsState, setInputsState] = useState({
    exists: {
      name: false,
      email: false,
      checkbox: false,
    },
    content: {
      name: "",
      email: "",
    },
  });

  const checkAuth = () => {
    if (Object.values(inputsState.exists).every(Boolean)) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    if (checkAuth()) {
      setGameAuth(true);
    } else {
      setGameAuth(false);
    }
  }, [inputsState]);

  useEffect(() => {
    if (!gameOverState) {
      dispatch(reset());
    }
  }, [gameOverState]);

  return (
    <div class="main">
      <main>
        <img src={petter} alt="" className="petter" />
        <div id="fake-canvas">
          <div id="content">
            <If condition={!gameOverState}>
              <h1>Mission Briefing</h1>
              <Form setInputsState={setInputsState} />
              <Startbutton checkAuth={checkAuth} inputsState={inputsState} />
              <Rules />
            </If>
            <If condition={gameOverState}>
              <GameOver player={player} />
            </If>
          </div>
        </div>
      </main>
      <aside>
        <img class="logo" src={logotype} />
        <Scoreboard home={true} />
      </aside>
    </div>
  );
};

const GameOver = ({ player }) => {
  const dispatch = useDispatch();
  const handleSubmit = (bool) => {
    if (bool) {
      dispatch(createScore(player));
    }
    dispatch(setGameOver(false));
  };

  useEffect(() => {
    dispatch(resetYourRank());
  }, []);
  return (
    <>
      <h1>GAME OVER</h1>
      <h5>Thanks for playing!</h5>
      <h3>Score: {player.score}</h3>
      <div className="game-over-btns">
        <button onClick={() => handleSubmit(true)}>Submit score</button>
        <button onClick={() => handleSubmit(false)}>Skip</button>
      </div>
    </>
  );
};

const Form = ({ setInputsState }) => {
  return (
    <form>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Fill in your name..."
        required
        onChange={(e) =>
          setInputsState((prev) => {
            return {
              ...prev,
              exists: {
                ...prev.exists,
                name: e.target.value ? true : false,
              },
              content: {
                ...prev.content,
                name: e.target.value,
              },
            };
          })
        }
      />
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Fill in your e-mail..."
        required
        onChange={(e) =>
          setInputsState((prev) => {
            return {
              ...prev,
              exists: {
                ...prev.exists,
                email: e.target.validity.valid ? true : false,
              },
              content: {
                ...prev.content,
                email: e.target.value,
              },
            };
          })
        }
      />
      <label htmlFor="">I agree:</label>
      <input
        type="checkbox"
        name=""
        id="privacy"
        onChange={(e) =>
          setInputsState((prev) => {
            return {
              ...prev,
              exists: {
                ...prev.exists,
                checkbox: e.target.checked ? true : false,
              },
            };
          })
        }
      />
    </form>
  );
};

const Startbutton = ({ checkAuth, inputsState }) => {
  const dispatch = useDispatch();
  return (
    <If condition={checkAuth()}>
      <Link
        onClick={() => dispatch(startGame(inputsState.content))}
        to={`/game`}
      >
        <button id="startBtn">Gotta save ´em all</button>
      </Link>
    </If>
  );
};

const Rules = () => {
  return (
    <div id="rules">
      <h2>How to play!</h2>
      <div id="instructions">
        <div class="keys">
          <h4>How to stear:</h4>
          <p>Use arrow keys</p>
        </div>
        <div class="object">
          <h4>Pickup:</h4>
          <img src={person} />
        </div>
        <div class="threat">
          <h4>Watch out for:</h4>
          <img src={stones} />
        </div>
      </div>
    </div>
  );
};
