/** @format */

// NoGameAuth ("/game"), message eller bara redirect till home? förmodligen redirect när jag tänker efter. kanske samma för felaktig route ("/bajsabjasa") ?

// board vinklas lite om man kör upp/ner osv? - vidare: annan sprite till surfer för uppåt o neråt.

// mp3 filen

// hur va upplägget kring musiksektionen?

// säker på att man ska förlora liv om man ej tar ett skräp? alternativ: förlora lite score?

// spawners (stones and trash), ska dom fortfarande ändras i speed när man kör fram/bak?

// the "startsekvens", har vi en klar bild av den? eller det växer fram efterhand?

// söndrig bräda sprites, klara?

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
