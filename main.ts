import { GameLoop } from "./src/GameLoop";
import { GameObject } from "./src/GameObject";
import { Vector2 } from "./src/Vector2";
import { Sprite } from "./src/Sprite";
import { Input } from "./src/Input";
import { Hero } from "./src/objects/Hero/Hero";
import { Camera } from "./src/Camera";
import { Rod } from "./src/objects/Rod/Rod";
import { gridCells } from "./src/helpers/grid";
import { Inventory } from "./src/objects/Inventory/Inventory";
import { resources } from "./src/Resource";


// Grabbing the canvas to draw to
const canvas = document.querySelector("#game-canvas") as HTMLCanvasElement;
const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;


// Establish the root scene
const mainScene = new GameObject({
  position: new Vector2(0,0)
})

// Build up the scene by adding a sky, ground, and hero
const skySprite = new Sprite({
  name: "sky",
  resource: resources.images.sky,
  frameSize: new Vector2(320, 180),
  hFrames: 1,
  vFrames: 1,
  frame: 0,
  scale: 1,
  position: new Vector2(0, 0),
  animations: {}
})

const groundSprite = new Sprite({
  name: "ground",
  resource: resources.images.ground,
  frameSize: new Vector2(320, 180),
  hFrames: 1,
  vFrames: 1,
  frame: 0,
  scale: 1,
  position: new Vector2(0, 0),
  animations: {}
})
mainScene.addChild(groundSprite);

const hero = new Hero(gridCells(6), gridCells(5))
mainScene.addChild(hero);

const camera = new Camera()
mainScene.addChild(camera);

const rod = new Rod(gridCells(7), gridCells(6))
mainScene.addChild(rod);

const inventory = new Inventory();


// Add an Input class to the main scene
// mainScene.input = new Input();


// Establish update and draw loops
const update = (delta: number) => {
  mainScene.stepEntry(delta, mainScene)
};
const draw = () => {

  // Clear anything stale
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the sky
  skySprite.drawImage(ctx, 0, 0)

  // Save the current state (for camera offset)
  ctx.save();

  //Offset by camera position
  ctx.translate(camera.position.x, camera.position.y);

  // Draw objects in the mounted scene
  mainScene.draw(ctx, 0, 0);

  // Restore to original state
  ctx.restore();

  // Draw anything above the game world
  inventory.draw(ctx, 0, 0)

}

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
