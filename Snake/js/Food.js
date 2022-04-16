import { context, box } from './variables.js';

export class Food {
  constructor({ x, y }) {
    const foodImages = [
      'apple',
      'donat',
      'pizza',
      'cheese',
      'banana',
      'cake',
      'drink',
    ];
    const index = Math.trunc(Math.random() * foodImages.length);
    const imagePath = `./img/${foodImages[index]}.png`;

    this.food = new Image();
    this.food.src = imagePath;

    this.x = x;
    this.y = y;
  }

  /**
   * Draws the food in Canvas.
   */
  draw() {
    context.drawImage(this.food, this.x * box, (this.y + 2) * box);
  }
}
