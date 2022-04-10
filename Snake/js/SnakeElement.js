import { context, box, offsetV } from './variables.js';

export class SnakeElement {
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  draw() {
    context.fillStyle = this.color;
    context.fillRect(this.x * box, (this.y + offsetV) * box, box, box);
  }
}
