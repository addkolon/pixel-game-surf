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

import { useEffect, useState } from "react";

import { If } from "./views/components/helpers";
import { Home } from "./views/home/Home.js";
import { Game } from "./views/game/Game.js";
import { GameOver } from "./views/gameOver/GameOver.js";

import "./style/main.scss";
import { GET } from "./utils/fetch";

function App() {
 const [view, setView] = useState("home");

 //  useEffect(async () => {
 //   let res = await GET("/index1.php");
 //   console.log(res);
 //  }, []);

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
