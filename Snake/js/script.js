import { Snake } from './Snake.js';
import { Food } from './Food.js';
import { context as ctx, box } from './variables.js';

const ground = new Image();
ground.src = './img/background.png';

/** Initial Snake's speed, */
let gameSpeed = 500;

/** Snake's speed multiplier. */
const gameSpeedMultiplier = 1.02;

/** Game score. */
let score = 0;

// Defining free cell to place our food. Randomly too.
function getFreeCell() {
  const freeCells = [];
  for (let x = 1; x <= 17; x++) {
    for (let y = 1; y <= 15; y++) {
      if (!snake.occupiesCell(x, y)) freeCells.push({ x, y });
    }
  }

  return freeCells[Math.trunc(Math.random() * freeCells.length)];
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
let food = new Food(getFreeCell());

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
function main() {
  snake.move();

  if (snake.crash()) {
    clearInterval(gameId);
    return;
  }

  if (snake.gotFood(food)) {
    snake.eat();

    food = new Food(getFreeCell());

    score++;

    // The Snake has grown up. Increase game speed.
    gameSpeed = Math.round(gameSpeed / gameSpeedMultiplier);

    clearInterval(gameId);
    gameId = setInterval(main, gameSpeed);
  }

  renderGameObjects();
}

renderGameObjects();
let gameId = setInterval(main, gameSpeed);
