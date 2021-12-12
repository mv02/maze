import Tile from "./tile";
import Wall from "./wall";

type Orientation = 'H' | 'V';
type Direction = { name: 'N' | 'E' | 'S' | 'W', x: -1 | 0 | 1, y: -1 | 0 | 1 };
export const directions: Direction[] = [
  { name: 'N', x: 0, y: -1 },
  { name: 'E', x: 1, y: 0 },
  { name: 'S', x: 0, y: 1 },
  { name: 'W', x: -1, y: 0 },
];

export function getRandomDirection() {
  return directions[Math.floor(Math.random() * directions.length)];
}

export function getRandomEdgeTile(a: Tile[][], direction: Direction) {
  const index = Math.floor(Math.random() * (a.length - 1));

  switch (direction.name) {
    case 'N':
      return a[0][index];
    case 'E':
      return a[index][a.length - 1];
    case 'S':
      return a[a.length - 1][index];
    default:
      return a[index][0];
  }
}

export function canMove(start: Tile, direction: Direction, walls: Wall[]) {
  const destination = { x: start.x + direction.x, y: start.y + direction.y };
  return !walls.some(wall => {
    switch (direction.name) {
      case 'N':
        return wall.x === start.x && wall.y === start.y && wall.direction === 'E';
      case 'E':
        return wall.x === destination.x && wall.y === destination.y && wall.direction === 'S';
      case 'S':
        return wall.x === destination.x && wall.y === destination.y && wall.direction === 'E';
      default:
        return wall.x === start.x && wall.y === start.y && wall.direction === 'S';
    }
  })
}

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
