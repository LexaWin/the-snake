const game = document.querySelector('#game');
const context = game.getContext('2d');

/** The Snake's minimum step and cell size. */
const box = 32;

/** Initial cell's vertical offset */
const offsetV = 2;

export { context, box, offsetV };
