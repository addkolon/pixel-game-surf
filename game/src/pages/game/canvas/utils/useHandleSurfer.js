/** @format */

export const useHandleSurfer = () => {
  if (frame % boat.animationSpeed === 0) {
    if (surfer.frameX < 5) {
      setSurfer((prev) => {
        return {
          ...prev,
          frameX: prev.frameX + 1,
        };
      });
    } else {
      setSurfer((prev) => {
        return {
          ...prev,
          frameX: 0,
        };
      });
    }
  }
};
