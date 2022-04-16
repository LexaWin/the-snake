import { context, box, offsetV, width, height } from './variables.js';

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

  moveTo({ x, y }) {
    if (x < 1) x = width;
    if (x > width) x = 1;
    if (y < 1) y = height;
    if (y > height) y = 1;

    this.x = x;
    this.y = y;
  }

  moveInDirection({ h, v }) {
    this.moveTo({ x: this.x + h, y: this.y + v });
  }
}
