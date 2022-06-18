/** @format */

import pickupSoundFile from "../../../../audio/pick-up.mp3";

import useSound from "use-sound";

export const usePickupSound = () => {
 const [playPickupSound] = useSound(pickupSoundFile);

 return {
  playPickupSound,
 };
};
