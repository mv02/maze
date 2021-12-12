export default class Tile {
  public x: number;
  public y: number;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D, tileSize: number) {
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize + 0.5, tileSize + 0.5);
  }
}
