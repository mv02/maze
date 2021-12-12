type Direction = 'E' | 'S';

export default class Wall {
  public x: number;
  public y: number;
  public direction: Direction;

  public constructor(x: number, y: number, direction: Direction) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  public draw(ctx: CanvasRenderingContext2D, tileSize: number, wallWidth: number) {
    ctx.lineWidth = wallWidth;
    ctx.moveTo(this.x * tileSize, this.y * tileSize);

    if (this.direction === 'E')
      ctx.lineTo((this.x + 1) * tileSize, this.y * tileSize);
    else
      ctx.lineTo(this.x * tileSize, (this.y + 1) * tileSize);
  }
}
