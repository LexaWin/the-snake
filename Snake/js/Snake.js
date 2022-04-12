import { SnakeElement } from './SnakeElement.js';
import { width, height } from './variables.js';

export class Snake {
  constructor() {
    const startX = Math.round(width / 2);
    const startY = Math.round(height / 2);

    this.head = new SnakeElement(startX, startY, 'green');
    this.body = [];
    this.direction = { h: 0, v: -1 };
  }

  /**
   * Draws The Snake in the Canvas.
   */
  draw() {
    this.head.draw();

    for (const elem of this.body) {
      elem.draw();
    }
  }

  /**
   * Makes The Snake move.
   * The Snake moves from tail to head.
   */
  move() {
    if (this.body.length) {
      for (let i = this.body.length - 1; i > 0; i--) {
        this.body[i].moveTo(this.body[i - 1]);
      }

      this.body[0].moveTo(this.head);
    }

    this.head.moveTo({
      x: this.head.x + this.direction.h,
      y: this.head.y + this.direction.v,
    });
  }

  /**
   * Changes the direction of The Snake.
   */
  changeDirection(event) {
    switch (event.code) {
      case 'ArrowUp':
        if (Math.abs(this.direction.v) != 1) {
          this.direction.v = -1;
          this.direction.h = 0;
        }
        break;
      case 'ArrowDown':
        if (Math.abs(this.direction.v) != 1) {
          this.direction.v = 1;
          this.direction.h = 0;
        }
        break;
      case 'ArrowRight':
        if (Math.abs(this.direction.h) != 1) {
          this.direction.h = 1;
          this.direction.v = 0;
        }
        break;
      case 'ArrowLeft':
        if (Math.abs(this.direction.h) != 1) {
          this.direction.h = -1;
          this.direction.v = 0;
        }
        break;
    }
  }

  /**
   * Makes The Snake grow.
   */
  grow() {
    let x;
    let y;

    if (this.body.length) {
      x = this.body[this.body.length - 1].x;
      y = this.body[this.body.length - 1].y;
    } else {
      x = this.head.x;
      y = this.head.y;
    }

    this.body.push(new SnakeElement(x, y, 'red'));
  }

  /**
   * Makes The Snake eat.
   * When The Snake eats, it grows.
   */
  eat() {
    this.grow();
  }

  /**
   * Checks if The Snake has reached the food.
   */
  gotFood(food) {
    return this.head.x == food.x && this.head.y == food.y;
  }

  /**
   * Checks whether The Snake has crashed into itself.
   */
  crash() {
    return this.body.some(
      (elem) => elem.x == this.head.x && elem.y == this.head.y
    );
  }

  /**
   * Checks whether The Snake occupies a particular cell.
+   */
  occupiesCell(x, y) {
    return (
      this.body.some((elem) => elem.x == x && elem.y == y) ||
      (this.head.x == x && this.head.y == y)
    );
  }
}
