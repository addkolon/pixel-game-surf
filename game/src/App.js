/** @format */
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/home/Home";
import { Game } from "./pages/game/Game";

import { useDispatch, useSelector } from "react-redux";

import { status, getTopScores } from "./store/scoresSlice.js";

import "./style/main.scss";
import { NoAuthMessage } from "./pages/home/components/NoAuthMessage";

function App() {
  const dispatch = useDispatch();
  const [gameAuth, setGameAuth] = useState(false);
  const scoresStatus = useSelector(status);

  useEffect(() => {
    if (scoresStatus === "idle") {
      // dispatch(getAllScores());
      dispatch(getTopScores("page=1&limit=10"));
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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
