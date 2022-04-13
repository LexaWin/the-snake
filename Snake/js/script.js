import { Snake } from './Snake.js';
import { context as ctx, box } from './variables.js';

const ground = new Image();
ground.src = './img/background.png';

/** Initial Snake's speed, */
let gameSpeed = 500;

/** Snake's speed multiplier. */
const gameSpeedMultiplier = 1.02;

/** Game score. */
let score = 0;

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

function renderGameObjects() {
  ctx.drawImage(ground, 0, 0);
  food.draw();
  snake.draw();
  showScore(score);
}

/**
 * MAIN
 */
function render() {
  renderGameObjects();

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
