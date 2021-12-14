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
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = wallWidth;
    const start = { x: this.x * tileSize, y: this.y * tileSize };
    const end = { x: this.x * tileSize, y: this.y * tileSize };

    if (this.direction === 'E') {
      start.x -= wallWidth / 2;
      end.x += tileSize + wallWidth / 2;
    }
    else {
      start.y -= wallWidth / 2; 
      end.y += tileSize + wallWidth / 2;
    }
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
  }
}
