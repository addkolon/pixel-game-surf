/** @format */

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  music,
  waves,
  pickup,
  crash,
  gameover,
  setAllVolumes,
} from "../../store/soundSlice";

export const Settings = ({ setView }) => {
  const dispatch = useDispatch();

  const musicVolume = useSelector(music).volume;
  const wavesVolume = useSelector(waves).volume;
  const pickupVolume = useSelector(pickup).volume;
  const crashVolume = useSelector(crash).volume;
  const gameoverVolume = useSelector(gameover).volume;

  const musicRef = useRef();
  const wavesRef = useRef();
  const crashRef = useRef();
  const pickupRef = useRef();
  const gameoverRef = useRef();

  const handleApply = (e) => {
    e.preventDefault();

    dispatch(
      setAllVolumes({
        music: musicRef.current.value / 100,
        waves: wavesRef.current.value / 100,
        pickup: pickupRef.current.value / 100,
        crash: crashRef.current.value / 100,
        gameover: gameoverRef.current.value / 100,
      })
    );
    setView("home");
  };

  useEffect(() => {
    musicRef.current.value = Math.round(musicVolume * 100);
    wavesRef.current.value = Math.round(wavesVolume * 100);
    pickupRef.current.value = Math.round(pickupVolume * 100);
    crashRef.current.value = Math.round(crashVolume * 100);
    gameoverRef.current.value = Math.round(gameoverVolume * 100);
  }, []);

  return (
    <div id="fake-canvas" className="game-container">
      <div className="screen"></div>

      <div style={{ paddingRight: "2rem", color: "red" }}>sound:</div>
      <form
        onSubmit={handleApply}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <label htmlFor="">music</label>
        <input style={{ padding: "0" }} ref={musicRef} type="range"></input>
        <label htmlFor="">waves</label>
        <input style={{ padding: "0" }} ref={wavesRef} type="range"></input>
        <label htmlFor="">crashes</label>
        <input style={{ padding: "0" }} ref={crashRef} type="range"></input>
        <label htmlFor="">pickups</label>
        <input style={{ padding: "0" }} ref={pickupRef} type="range"></input>
        <label htmlFor="">gameover</label>
        <input style={{ padding: "0" }} ref={gameoverRef} type="range"></input>
        <button type="submit">Apply</button>
        <button onClick={() => setView("home")}>Back</button>
      </form>
    </div>
  );
};
