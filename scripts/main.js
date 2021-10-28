import Mage from "./players/mage.js"
import Spawner from "./enemies/spawner.js";
import Grunt from "./enemies/grunt.js";

// grab the canvas object created in index.html
const canvas = document.getElementById("gameCanvas");

// pull a reference to the 2d context from that canvas
const ctx = canvas.getContext("2d");

// set the canvas width and height
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/* INITIALIZE VARIABLES */
let lastTime = 0;
let game = { context: ctx, canvas: canvas, objects: [], fps: 0 };

const currentPlayer = new Mage(game, {});
new Spawner(game, {
  position: { x: canvas.width / 2, y: canvas.height / 2 },
  mobClass: Grunt
})

// start animation/game loop
requestAnimationFrame(gameLoop);

function gameLoop(timestamp) {
  // get the amount of time that has passed since last update
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;
  game.fps = 1000 / deltaTime;

  // remove any inactive objects
  game.objects = game.objects.filter(o => o.active);

  // clear screen
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  game.objects.forEach(o => {
      o.update(deltaTime);
      o.draw();
  });

  ctx.fillFont = "14px Arial";
  ctx.fillStyle = "black";
  ctx.fillText(`o: ${game.objects.length}   fps: ${Math.round(game.fps * 100) / 100}`, 10, canvas.height - 10);

  requestAnimationFrame(gameLoop);
}