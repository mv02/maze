import Tile from "./tile";
import Wall from "./wall";

type Orientation = 'H' | 'V';

export function splitField(a: Tile[][], orientation: Orientation, index: number) {
  if (orientation === 'H') return [a.slice(0, index), a.slice(index)];

  return [
    a.map(row => row.filter((_, i) => i < index)),
    a.map(row => row.filter((_, i) => i >= index)),
  ];
}

export function joinFields(a: Tile[][], b: Tile[][], orientation: Orientation) {
  if (orientation === 'H') return a.concat(b);

  return a.map((row, i) => row.concat(b[i]));
}

export function borderWalls(b: Tile[][], orientation: Orientation, withDoor: boolean) {
  const walls: Wall[] = [];
  let min, max;

  if (orientation === 'H') {
    b[0].forEach(tile => walls.push(new Wall(tile.x, tile.y, 'E')));
    min = b[0][0]?.x || 0;
    max = b[0].length;
  }
  else {
    b.forEach(row => row.filter((_, i) => i === 0).forEach(tile => walls.push(new Wall(tile.x, tile.y, 'S'))));
    min = b[0][0].y || 0;
    max = b.length;
  }

  if (withDoor) {
    const doorIndex = Math.floor(Math.random() * max) + min;
    return walls.filter(wall => orientation === 'H' ? wall.x !== doorIndex : wall.y !== doorIndex);
  }
  return walls;
}
