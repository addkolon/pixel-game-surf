/** @format */

export const failSpawnPosition = (arr, x, y) => {
  for (let i = 0; i < arr.length; i++) {
    let s = arr[i];
    if (
      x < s.x + s.size &&
      x + s.size > s.x &&
      y < s.y + s.size &&
      y + s.size > s.y
    ) {
      console.log("fail");
      return true;
    }
    return false;
  }
};
