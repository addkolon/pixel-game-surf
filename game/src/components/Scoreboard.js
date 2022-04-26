/** @format */

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { data, getTopScores, yourRank } from "../store/scoresSlice";
import { If } from "./utils/If";

export const Scoreboard = ({ home }) => {
  const dispatch = useDispatch();
  const scores = useSelector(data);
  const rank = useSelector(yourRank);
  const [fillOut, setFillOut] = useState([]);
  useEffect(() => {
    const arr = [];
    const amount = 10 - scores.scores.length;
    for (let i = 0; i < amount; i++) {
      arr.push(<li>...</li>);
    }
    setFillOut(arr);
  }, [scores]);

  return (
    <div class="scoreboard">
      <h3>Scoreboard</h3>
      <ul id="scoreB">
        {scores.scores.map((d, i) => {
          return (
            <li>
              {i + 1 + (scores.page - 1) * 10}. {d.name} <span>{d.score}</span>
            </li>
          );
        })}
        {fillOut.map((d, i) => {
          return d;
        })}
      </ul>
      <If condition={home}>
        <If condition={scores.page > 1}>
          <span
            onClick={() => {
              dispatch(getTopScores(`page=${scores.page - 1}&limit=10`));
            }}
          >
            prev
          </span>
        </If>{" "}
        <If condition={scores.page < scores.totalPages}>
          <span
            onClick={() => {
              dispatch(getTopScores(`page=${scores.page + 1}&limit=10`));
            }}
          >
            next
          </span>
        </If>
        <If condition={rank.rank}>
          <div className="your-rank">
            {rank.rank}. {rank.data.name}
            <span> {rank.data.score}</span>
          </div>
        </If>
      </If>
    </div>
  );
};
