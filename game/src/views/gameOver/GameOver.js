/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { gameScore, resetGameplay } from "../../store/gameplaySlice";
import { resetPlayer } from "../../store/playerObjectSlice";
import {
 createScore,
 getRank,
 getTopScores,
 status,
 yourRank,
} from "../../store/scoresSlice";
import { resetSpawners } from "../../store/spawnersSlice";
import { If } from "../components/helpers";
import { Scoreboard } from "./components/Scoreboard";

export const GameOver = ({ setView }) => {
 const dispatch = useDispatch();
 const score = useSelector(gameScore);
 const scoresStatus = useSelector(status);
 //  const rank = useSelector(yourRank);

 const [inputsState, setInputsState] = useState({
  exists: {
   name: false,
   email: false,
   checkbox: false,
  },
  content: {
   name: "",
   email: "",
   score: score,
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
   if (!checkAuth()) {
    return;
   }
   dispatch(createScore(inputsState.content));
  }
  dispatch(resetSpawners());
  dispatch(resetPlayer());
  dispatch(resetGameplay(true));
  setView("home");
 };

 //  useEffect(() => {
 //   dispatch(getRank(score));
 //  }, []);

 //  useEffect(() => {
 //   dispatch(getTopScores());
 //  }, []);

 if (scoresStatus !== "succeeded") {
  return <div> loading</div>;
 }

 return (
  <main className="game-container">
   <section className="game-over-top">
    <h1>GAME OVER</h1>
    <h3>Your Score: {score}</h3>
    <div className="game-over-cols">
     <section className="game-over-topleft">
      <Form setInputsState={setInputsState} />
      <div className="game-over-btns">
       <button onClick={() => handleSubmit(true)}>Submit score</button>
       <button onClick={() => handleSubmit(false)}>Skip</button>
      </div>
     </section>
     <section className="game-over-topright">
      <Scoreboard />
     </section>
    </div>
   </section>
  </main>
 );
};

const Form = ({ setInputsState }) => {
 return (
  <form>
   <div>
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
   </div>

   <div>
    <input
     type="text"
     name="email"
     id="email"
     placeholder="Fill in your email..."
     required
     onChange={(e) =>
      setInputsState((prev) => {
       return {
        ...prev,
        exists: {
         ...prev.exists,
         email: e.target.value ? true : false,
        },
        content: {
         ...prev.content,
         email: e.target.value,
        },
       };
      })
     }
    />
   </div>

   <div>
    <label htmlFor="">I agree to privacy-policy: </label>
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
   </div>
  </form>
 );
};
