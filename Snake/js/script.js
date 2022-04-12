import { SnakeElement } from './SnakeElement.js';
import { context as ctx, box } from './variables.js';

const ground = new Image();
ground.src = './img/background.png';

/** Initial Snake's speed, */
let gameSpeed = 500;

/** Snake's speed multiplier. */
const gameSpeedMultiplier = 1.02;

/** Game score. */
let score = 0;

/** The Snake class. */
function Snake() {
  this.head = new SnakeElement(9, 8, 'green');
  this.body = [];
  this.direction = { h: 0, v: -1 };

  /**
   * Draws The Snake in the Canvas.
   */
  this.draw = function () {
    this.head.draw();

    for (const elem of this.body) {
      elem.draw();
    }
  };

  /**
   * Makes The Snake move.
   * The Snake moves from tail to head.
   */
  this.move = function () {
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
  };

  /**
   * Changes the direction of The Snake.
   */
  this.changeDirection = function (event) {
    switch (event.code) {
      case 'ArrowUp':
        if (Math.abs(this.direction.v) != 1) {
          this.direction.v = -1;
          this.direction.h = 0;
          render();
        }
        break;
      case 'ArrowDown':
        if (Math.abs(this.direction.v) != 1) {
          this.direction.v = 1;
          this.direction.h = 0;
          render();
        }
        break;
      case 'ArrowRight':
        if (Math.abs(this.direction.h) != 1) {
          this.direction.h = 1;
          this.direction.v = 0;
          render();
        }
        break;
      case 'ArrowLeft':
        if (Math.abs(this.direction.h) != 1) {
          this.direction.h = -1;
          this.direction.v = 0;
          render();
        }
        break;
    }
  };

  /**
   * Makes The Snake grow.
   */
  this.grow = function () {
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
  };

  /**
   * Makes The Snake eat.
   * When The Snake eats, it grows.
   */
  this.eat = function () {
    this.grow();
  };

  /**
   * Checks if The Snake has reached the food.
   * @param {!Food} food Food object.
   * @return {boolean} True - The Snake is on the food. False - not.
   */
  this.gotFood = function (food) {
    return this.head.x == food.x && this.head.y == food.y;
  };

  /**
   * Checks whether The Snake has crashed into itself.
   * @returns {boolean} True - The Snake has crashed into itself. False - not.
   */
  this.crash = function () {
    return this.body.some(
      (elem) => elem.x == this.head.x && elem.y == this.head.y
    );
  };

  /**
   * Checks whether The Snake occupies a particular cell.
   * @param {number} x X coord of the cell.
   * @param {number} y Y coord of the cell.
   * @returns {boolean} True - The Snake occupies this cell. False - not.
   */
  this.occupiesCell = function (x, y) {
    return (
      this.body.some((elem) => elem.x == x && elem.y == y) ||
      (this.head.x == x && this.head.y == y)
    );
  };
}

/** The Food class. */
function Food() {
  // Defining food image. Randomly.
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

  // Defining free cell to place our food. Randomly too.
  const freeCells = [];
  for (let x = 1; x <= 17; x++) {
    for (let y = 1; y <= 15; y++) {
      if (!snake.occupiesCell(x, y)) freeCells.push({ x, y });
    }
  }
  const freeCell = freeCells[Math.trunc(Math.random() * freeCells.length)];

  this.x = freeCell.x;
  this.y = freeCell.y;

  /**
   * Draws the food in Canvas.
   */
  this.draw = function () {
    ctx.drawImage(this.food, this.x * box, (this.y + 2) * box);
  };
}

/**
 * Draws the current score.
 * @param {number} score The number of earning points.
 */
function showScore(score) {
  ctx.fillStyle = 'white';
  ctx.font = '50px Arial';
  ctx.fillText('Score: ' + score, box * 2.5, box * 1.7);
}

/** Generating The Snake. */
const snake = new Snake();
/** Generating the food. */
let food = new Food();

document.addEventListener('keydown', snake.changeDirection.bind(snake));

/**
 * MAIN
 */
function render() {
  ctx.drawImage(ground, 0, 0);

  food.draw();

  showScore(score);

  snake.draw();
  snake.move();

  if (snake.crash()) {
    clearInterval(gameId);
  }

  if (snake.gotFood(food)) {
    snake.eat();

    food = new Food();

    score++;

    // The Snake has grown up. Increase game speed.
    gameSpeed = Math.round(gameSpeed / gameSpeedMultiplier);

    clearInterval(gameId);
    gameId = setInterval(render, gameSpeed);
  }
}

let gameId = setInterval(render, gameSpeed);
