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

// prio1: stenar olika sprites
// 2. boom träff
// 3. foam movement

// boom sprite där sten träffar

// skräp går ej att ta under foam atm.

import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home.js";
import { Game } from "./pages/game/Game.js";

import { useDispatch, useSelector } from "react-redux";

import { status, getTopScores } from "./store/scoresSlice.js";

import "./style/main.scss";
import { NoAuthMessage } from "./pages/home/components/NoAuthMessage";
import { NoPage } from "./pages/NoPage";

function App() {
  const dispatch = useDispatch();
  const [gameAuth, setGameAuth] = useState(false);
  const scoresStatus = useSelector(status);

  useEffect(() => {
    if (scoresStatus === "idle") {
      // dispatch(getAllScores());
      // dispatch(getTopScores("page=1&limit=10"));
    }
  }, [scoresStatus, dispatch]);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            element={gameAuth ? <Game /> : <NoAuthMessage />}
            path="/game"
            exact
          />
          <Route element={<Home setGameAuth={setGameAuth} />} path="/" exact />
          <Route element={<NoPage />} path="*" exact />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
