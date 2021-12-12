export default class Tile {
  public x: number;
  public y: number;
  public isStart: boolean = false;
  public isExit: boolean = false;

  public constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  public draw(ctx: CanvasRenderingContext2D, tileSize: number) {
    ctx.fillStyle = '#bdbdbd';
    ctx.fillRect(this.x * tileSize, this.y * tileSize, tileSize + 0.5, tileSize + 0.5);

    if (this.isStart) {
      ctx.fillStyle = '#00a118';
      ctx.fillRect(this.x * tileSize + tileSize / 4, this.y * tileSize + tileSize / 4, tileSize / 2, tileSize / 2);
    }
    else if (this.isExit) {
      ctx.fillStyle='#ff5526';
      ctx.fillRect(this.x * tileSize + tileSize / 4, this.y * tileSize + tileSize / 4, tileSize / 2, tileSize / 2);
    }
  }
}
