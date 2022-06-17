/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
 gameScore,
 resetGameplay,
 setGameOver,
} from "../../store/gameplaySlice";
import { resetPlayer } from "../../store/playerObjectSlice";
import { createScore, resetYourRank } from "../../store/scoresSlice";
import { resetSpawners } from "../../store/spawnersSlice";

import { Scoreboard } from "../../components/Scoreboard";

export const GameOver = ({ setView }) => {
 const dispatch = useDispatch();
 const score = useSelector(gameScore);
 //  const score = useSelector((state) => state.gameplay.score);

 const [inputsState, setInputsState] = useState({
  exists: {
   name: false,
   checkbox: false,
  },
  content: {
   name: "",
   score: score,
   //    email: "",
  },
 });

 const checkAuth = () => {
  if (Object.values(inputsState.exists).every(Boolean)) {
   return true;
  } else {
   return false;
  }
 };

 const handleSubmit = (bool) => {
  if (bool) {
   dispatch(createScore(inputsState.content));
  }
  dispatch(resetSpawners());
  dispatch(resetPlayer());
  dispatch(resetGameplay(true));
  setView("home");
  //   dispatch(setGameOver(false));
 };

 //  useEffect(() => {
 //   if (checkAuth()) {
 //    setGameAuth(true);
 //   } else {
 //    setGameAuth(false);
 //   }
 //  }, [inputsState]);

 //  useEffect(() => {
 //   dispatch(resetSpawners());
 //   dispatch(resetPlayer());
 //  }, []);

 //  useEffect(() => {
 //   dispatch(resetYourRank());
 //  }, []);

 return (
  <main className="game-container">
   <section className="game-over-top">
    <section className="game-over-left">
     <h2>GAME OVER</h2>
     <h5>Thanks for playing!</h5>
     <h3>Score: {score}</h3>
     <Form setInputsState={setInputsState} />
    </section>
    <section className="game-over-right">
     <Scoreboard />
    </section>
   </section>
   <div className="game-over-btns">
    <button onClick={() => handleSubmit(true)}>Submit score</button>
    <button onClick={() => handleSubmit(false)}>Skip</button>
   </div>
  </main>
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
   {/* <input
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
   /> */}
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
