/** @format */

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data } from "../../../store/scoresSlice";

export const Scoreboard = () => {
 const scores = useSelector(data);
 const [fillOut, setFillOut] = useState([]);

 useEffect(() => {
  const arr = [];
  const amount = 10 - scores.length;
  for (let i = 0; i < amount; i++) {
   arr.push(<li>...</li>);
  }
  setFillOut(arr);
 }, [scores]);

 return (
  <div className="scoreboard">
   <h3>Scoreboard</h3>
   <ul id="scoreB">
    {/* {scores.map((d, i) => {
     return (
      <li>
       {i + 1}. {d.name} <span>{d.score}</span>
      </li>
     );
    })} */}
    {fillOut.map((d, i) => {
     return d;
    })}
   </ul>
  </div>
 );
};
