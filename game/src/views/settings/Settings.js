/** @format */

import { useDispatch, useSelector } from "react-redux";

import {
  music,
  setCrashVolume,
  setGameoverVolume,
  setMusicVolume,
  setPickupVolume,
  setWavesVolume,
} from "../../store/soundSlice";

export const Settings = () => {
  const dispatch = useDispatch();
  return (
    <div id="fake-canvas" className="game-container">
      <div className="screen"></div>
      <div
        className="flex FD-C"
        style={{ display: "flex", flexDirection: "column" }}
      >
        <div>sound:</div>
        <label htmlFor="">music</label>
        <input
          type="range"
          onChange={(e) => dispatch(setMusicVolume(e.target.value / 100))}
        ></input>
        <label htmlFor="">waves</label>
        <input
          type="range"
          onChange={(e) => dispatch(setWavesVolume(e.target.value / 100))}
        ></input>
        <label htmlFor="">crashes</label>
        <input
          type="range"
          onChange={(e) => dispatch(setCrashVolume(e.target.value / 100))}
        ></input>
        <label htmlFor="">pickups</label>
        <input
          type="range"
          onChange={(e) => dispatch(setPickupVolume(e.target.value / 100))}
        ></input>
        <label htmlFor="">gameover</label>
        <input
          type="range"
          onChange={(e) => dispatch(setGameoverVolume(e.target.value / 100))}
        ></input>
      </div>
    </div>
  );
};
