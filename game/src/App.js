/** @format */

import { useState } from "react";

import { If } from "./views/components/helpers";
import { Home } from "./views/home/Home.js";
import { Game } from "./views/game/Game.js";
import { GameOver } from "./views/gameOver/GameOver.js";

import { Settings } from "./views/settings/Settings";
import { HowToPlay } from "./views/howToPlay/HowToPlay";

import "./style/main.scss";
import { isTabletOrMobile } from "./utils/isMobileOrTablet";

function App() {
 const [view, setView] = useState("home");

 const isNotDesktop = isTabletOrMobile();

 console.log(isNotDesktop);

 return (
  <div className={`App ${isNotDesktop ? "view--mobile" : "view--desktop"}`}>
   <If condition={isNotDesktop}>
    <div id="mobile-screen">
        <div className="no-mobile-icon"></div>
        <h1>Out of order</h1>
        <h2>
          Sorry, computers ONLY!<br />
          This game is NOT optimised for phones and tablets!
        </h2>
    </div>
   </If>

   <If condition={!isNotDesktop}>
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
   </If>
  </div>
 );
}

export default App;
