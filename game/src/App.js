/** @format */

import { useState } from "react";

import { If } from "./views/components/helpers";
import { Home } from "./views/home/Home.js";
import { Game } from "./views/game/Game.js";
import { GameOver } from "./views/gameOver/GameOver.js";

import { Settings } from "./views/settings/Settings";
import { HowToPlay } from "./views/howToPlay/HowToPlay";

import "./style/main.scss";

function App() {
 const [view, setView] = useState("home");

 return (
  <div className="App">
   <If condition={view === "home"}>
    <Home setView={setView} />
   </If>

   <If condition={view === "how_to_play"}>
    <HowToPlay setView={setView} />
   </If>

   <If condition={view === "settings"}>
    <Settings setView={setView} />
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
