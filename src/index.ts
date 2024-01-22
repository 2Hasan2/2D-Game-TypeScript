// imports
import resources from './draw/resources';
import { Sprite , Vector2} from './draw/sprite';
import { GameLoop } from './GameLoop';
import { Input } from './control/input';
import {gridCells, gridSize} from './helper/grid';
import {moveTowards} from './helper/towards';


// canvas init 
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
// append as first child
document.body.insertBefore(canvas, document.body.firstChild);
// set canvas size
canvas.width = 320;
canvas.height = 180;


// create sprites
const skySprite = new Sprite({
	resource: resources.images.sky,
	frameSize: new Vector2(320, 180),
});

const groundSprite = new Sprite({
	resource: resources.images.ground,
	frameSize: new Vector2(320, 180),
});

const heroSprite = new Sprite({
	resource: resources.images.hero,
	frameSize: new Vector2(gridCells(2), gridCells(2)),
	hFrames: 3,
	vFrames: 8,
	frame: 1,
	position: new Vector2(gridCells(5), gridCells(5)),
});


const heroDestination = heroSprite.position.duplicate();

const shadowSprite = new Sprite({
	resource: resources.images.shadows,
	frameSize: new Vector2(gridCells(2), gridCells(2)),
	frame: 1,
});

const control = new Input();

// update
const update = (timeStep: number) => {

	const distance = moveTowards(heroSprite, heroDestination, 1);

	const hasArrived = distance <= 1;
	if (hasArrived) {
		move();
	}
}

const move = ()=>{
	if (!control.direction)return;
	let nextX = heroDestination.x
	let nextY = heroDestination.y;

	if (control.up()){ nextY -= gridSize; heroSprite.frame = 6;}
	if (control.down()){ nextY += gridSize; heroSprite.frame = 0;}
	if (control.left()){ nextX -= gridSize; heroSprite.frame = 9;}
	if (control.right()){ nextX += gridSize; heroSprite.frame = 3;}

	// if this next is allowed then move
	// if (gridCells(1) <= nextX && nextX < gridCells(10) && gridCells(1) <= nextY && nextY < gridCells(10)){
	// 	heroDestination.x = nextX;
	// 	heroDestination.y = nextY;
	// }

	heroDestination.x = nextX;
	heroDestination.y = nextY;


}


// render draw
const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	skySprite.drawImage(ctx, 0, 0);
	groundSprite.drawImage(ctx, 0, 0);

	// controls on hero
	const heroOffset = new Vector2(8,-21);
	const heroPosX = heroSprite.position.x + heroOffset.x;
	const heroPosY = heroSprite.position.y + heroOffset.y;


	shadowSprite.drawImage(ctx, heroPosX, heroPosY);
	heroSprite.drawImage(ctx, heroPosX, heroPosY);
}

// game loop

// setInterval(()=>{
// 	heroSprite.frame = (heroSprite.frame + 1) % 13;
// 	draw();
// },100);

const gameLoop = new GameLoop(update, draw);

gameLoop.start();