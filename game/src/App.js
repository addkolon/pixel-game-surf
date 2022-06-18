/** @format */

// NoGameAuth ("/game"), message eller bara redirect till home? förmodligen redirect när jag tänker efter. kanske samma för felaktig route ("/bajsabjasa") ? svar: direkt till homepage. ------

// board vinklas lite om man kör upp/ner osv? - vidare: annan sprite till surfer för uppåt o neråt. ---- lämnar

// mp3 filen -----

// hur va upplägget kring musiksektionen? --- inte hemskärm men när spel börjar.

// säker på att man ska förlora liv om man ej tar ett skräp? alternativ: förlora lite score? ---- atm ej förlora liv, men förlora score

// spawners (stones and trash), ska dom fortfarande ändras i speed när man kör fram/bak? --- yes

// the "startsekvens", har vi en klar bild av den? eller det växer fram efterhand? --- delay på flaskor o strear

// söndrig bräda sprites, klara? --- kommer senare

// ----

// prio1: stenar olika sprites YEP
// 2. boom träff
// 3. foam movement

// boom sprite där sten träffar

// skräp går ej att ta under foam atm.

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { status, getTopScores } from "./store/scoresSlice.js";

import "./style/main.scss";
import { If } from "./views/components/helpers";
import { Home } from "./views/home/Home.js";
import { Game } from "./views/game/Game.js";
import { GameOver } from "./views/gameOver/GameOver.js";

function App() {
 const dispatch = useDispatch();
 const scoresStatus = useSelector(status);

 const [view, setView] = useState("home");

 useEffect(() => {
  if (scoresStatus === "idle") {
   //  dispatch(getAllScores());
   dispatch(getTopScores("page=1&limit=10"));
  }
 }, [scoresStatus, dispatch]);
 console.log("fafa");
 if (scoresStatus !== "succeeded") {
  return <div> loading</div>;
 }

 return (
  <div className="App">
   <If condition={view === "home"}>
    <Home setView={setView} />
   </If>

   <If condition={view === "game"}>
    <Game setView={setView} />
   </If>

   <If condition={view === "gameOver"}>
    <GameOver setView={setView} />
   </If>
  </div>
 );
}

export default App;
