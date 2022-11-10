/** @format */

import { useDispatch, useSelector } from "react-redux";

import {
 music,
 setCrashVolume,
 setGameoverVolume,
 setMusicVolume,
 setPickupVolume,
 setWavesVolume,
} from "../../../store/soundSlice";

export const Settings = () => {
 const dispatch = useDispatch();
 return (
  <div>
   <div>sound:</div>
   <input
    type="range"
    onChange={(e) => dispatch(setMusicVolume(e.target.value / 100))}
   ></input>
   <input
    type="range"
    onChange={(e) => dispatch(setWavesVolume(e.target.value / 100))}
   ></input>
   <input
    type="range"
    onChange={(e) => dispatch(setCrashVolume(e.target.value / 100))}
   ></input>
   <input
    type="range"
    onChange={(e) => dispatch(setPickupVolume(e.target.value / 100))}
   ></input>
   <input
    type="range"
    onChange={(e) => dispatch(setGameoverVolume(e.target.value / 100))}
   ></input>
  </div>
 );
};
