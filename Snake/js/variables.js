const game = document.querySelector('#game');
const context = game.getContext('2d');

/** The Snake's minimum step and cell size. */
const box = 32;

/** Initial cell's vertical offset */
const offsetV = 2;

/** The number of cells vertically and horizontally. */
const width = Math.trunc(game.width / box) - 2;
const height = Math.trunc(game.height / box) - 4;

export { context, box, offsetV, width, height };
