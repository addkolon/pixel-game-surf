/** @format */

import pickupSoundFile from "../../../../audio/pick-up.mp3";

import useSound from "use-sound";
import { settings } from "../../../../config/settings";

export const usePickupSound = () => {
 const [playPickupSound] = useSound(pickupSoundFile, {
  volume: settings.sound.pickup.volume,
 });

 return {
  playPickupSound,
 };
};
