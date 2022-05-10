/** @format */

const line = (x1, y1, x2, y2, x3, y3, x4, y4) => {
  const uA =
    ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
  const uB =
    ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) /
    ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    return true;
  } else {
    return false;
  }
};

const thingToHit = (x1, y1, x2, y2, rx, ry, rw, rh) => {
  const left = line(x1, y1, x2, y2, rx, ry, rx, ry + rh);
  const right = line(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
  const top = line(x1, y1, x2, y2, rx, ry, rx + rw, ry);
  const bottom = line(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);

  if (left || right || top || bottom) {
    return true;
  } else {
    return false;
  }
};

export const checkIfHit = (edges, thingX, thingY, thingW, thingH) => {
  for (let i = 0; i < edges.length; i++) {
    let next = i + 1;
    if (next === edges.length) next = 0;

    const currentEdge = edges[i];
    const nextEdge = edges[next];

    const collision = thingToHit(
      currentEdge.x,
      currentEdge.y,
      nextEdge.x,
      nextEdge.y,
      thingX,
      thingY,
      thingW,
      thingH
    );
    if (collision) {
      return true;
    }
  }
  return false;
};
