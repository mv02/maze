import Tile from "./tile";
import Wall from "./wall";
import * as utils from './utils';

export default class Maze {
  private tiles: Tile[][] = [];
  private walls: Wall[] = [];
  private size: number;
  private tileSize: number;
  private wallWidth: number;
  private startTile: Tile;
  private exitTile: Tile;
  private solution: Tile[] = [];

  public constructor(size: number = 20, tileSize: number = 30, wallWidth: number = 3) {
    this.size = size;
    this.tileSize = tileSize;
    this.wallWidth = wallWidth;
    this.createField();
    this.createEdges();
    this.startTile = this.generateStart();
    this.exitTile = this.generateExit();
    this.divide(this.tiles, 0);
  }

  private createField() {
    for (let y = 0; y < this.size; y++) {
      this.tiles.push([]);
      for (let x = 0; x < this.size; x++) this.tiles[y].push(new Tile(x, y));
    }
  }

  private createEdges() {
    for (let y = 0; y < this.size; y++) this.walls.push(new Wall(0, y, 'S'), new Wall(this.size, y, 'S'));
    for (let x = 0; x < this.size; x++) this.walls.push(new Wall(x, 0, 'E'), new Wall(x, this.size, 'E'));
  }

  private generateStart() {
    const middle = Math.floor(this.size / 2);
    let x = middle;
    let y = middle; 
    // Even maze size => choose one of the 4 middle tiles
    if (this.size % 2 === 0) {
      x -= Math.round(Math.random());
      y -= Math.round(Math.random());
    }

    const startTile = this.tiles[y][x];
    startTile.isStart = true;
    return startTile;
  }

  private generateExit() {
    const direction = utils.getRandomDirection();
    const exitTile = utils.getRandomEdgeTile(this.tiles, direction);
    exitTile.isExit = true;
    return exitTile;
  }

  private divide(chamber: Tile[][], i: number): Tile[][] {
    const width = chamber[0]?.length || 0;
    const height = chamber.length;

    if (width <= 1 && height <= 1) return chamber;

    const orientation = height > width ? 'H' : 'V';
    const limit = (orientation === 'H' ? height : width) - 1;
    const index = Math.floor(Math.random() * limit) + 1;
    const subchambers = utils.splitField(chamber, orientation, index);

    console.log(`Level ${i}, ${width}x${height}, splitting ${orientation} @ ${index} => ${subchambers[0][0]?.length || 0}x${subchambers[0].length}, ${subchambers[1][0]?.length}x${subchambers[1].length}`);

    this.walls.push(...utils.borderWalls(subchambers[1], orientation, true));
    return utils.joinFields(this.divide(subchambers[0], i + 1), this.divide(subchambers[1], i + 1), orientation);
  }

  private findPath(from: Tile, to: Tile, path: Tile[]): Tile[] {
    from.visited = true;
    if (from.x === to.x && from.y === to.y) return path.concat(from);

    for (const direction of utils.directions) {
      const next = (this.tiles[from.y + direction.y] || [])[from.x + direction.x];
      if (!next || next.visited || !utils.canMove(from, direction, this.walls)) continue;

      path.push(from);
      return this.findPath(next, to, path);
    }

    const prev = path.pop() as Tile;
    return this.findPath(prev, to, path);
  }
  
  public solve() {
    this.solution = this.findPath(this.startTile, this.exitTile, []);
  }

  public draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    this.tiles.forEach(row => row.forEach(tile => tile.draw(ctx, this.tileSize)));
    this.walls.forEach(wall => wall.draw(ctx, this.tileSize, this.wallWidth));
    ctx.stroke();
  }

  public drawSolution(ctx: CanvasRenderingContext2D) {
    return new Promise(resolve => this.drawPath(ctx, this.solution, 500 / this.size).then(resolve));
  }

  private async drawPath(ctx: CanvasRenderingContext2D, path: Tile[], delay: number = 0) {
    ctx.beginPath();
    ctx.strokeStyle = '#4b42f5';
    ctx.lineWidth = this.tileSize / 4;
    ctx.moveTo(path[0].x * this.tileSize + this.tileSize / 2, path[0].y * this.tileSize + this.tileSize / 2);

    for (const tile of path.slice(1)) {
      ctx.lineTo(tile.x * this.tileSize + this.tileSize / 2, tile.y * this.tileSize + this.tileSize / 2);
      ctx.stroke();
      await utils.sleep(delay);
    }
  }
}
