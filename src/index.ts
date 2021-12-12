import Maze from "./maze";

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const m = new Maze();
m.draw(ctx);
