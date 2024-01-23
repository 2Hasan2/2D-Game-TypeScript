// imports
import resources from './draw/resources';
import { Sprite , Vector2} from './draw/sprite';
import { GameLoop } from './GameLoop';
import { Input, LEFT, RIGHT, UP, DOWN } from './control/input';
import {gridCells, gridSize, isSpaceFree, drawGrid} from './helper/grid';
import {moveTowards} from './helper/towards';
import {walls} from './levels/level1';
import {FrameIndexPattern} from './FrameIndexPattern';
import {Animations} from './Animations';
import 
{
	walk_down,
	walk_left,
	walk_right,
	walk_up,
	stand_down,
	stand_left,
	stand_right,
	stand_up,
}
from './objects/hero/heroAnimation';


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
	position: new Vector2(gridCells(1), gridCells(0)),
	animations: new Animations({
		walk_down: new FrameIndexPattern(walk_down),
		walk_left: new FrameIndexPattern(walk_left),
		walk_right: new FrameIndexPattern(walk_right),
		walk_up: new FrameIndexPattern(walk_up),
		stand_down: new FrameIndexPattern(stand_down),
		stand_left: new FrameIndexPattern(stand_left),
		stand_right: new FrameIndexPattern(stand_right),
		stand_up: new FrameIndexPattern(stand_up),
	}),
});


const heroDestination = heroSprite.position.duplicate();

let heroDirection = 'DOWN';

const shadowSprite = new Sprite({
	resource: resources.images.shadows,
	frameSize: new Vector2(gridCells(2), gridCells(2)),
	frame: 1,
});

const control = new Input();

// update
const update = (delta: number) => {

	const distance = moveTowards(heroSprite, heroDestination, 1);

	const hasArrived = distance <= 1;
	if (hasArrived) {
		move();
	}

	// hero animation
	heroSprite.step(delta);
}

const move = ()=>{
	if (!control.direction){
		
		if(heroDirection === LEFT){heroSprite.animations.play('stand_left');}
		if(heroDirection === DOWN){heroSprite.animations.play('stand_down');}
		if(heroDirection === RIGHT){heroSprite.animations.play('stand_right');}
		if(heroDirection === UP){heroSprite.animations.play('stand_up');}
		
		return;
	}
	let nextX = heroDestination.x
	let nextY = heroDestination.y;

	if (control.up()){ nextY -= gridSize;}
	if (control.down()){ nextY += gridSize;}
	if (control.left()){ nextX -= gridSize;}
	if (control.right()){ nextX += gridSize;}

	heroDirection = control.direction ?? heroDirection;
	
	if(heroDirection === LEFT){heroSprite.animations.play('walk_left');}
	if(heroDirection === DOWN){heroSprite.animations.play('walk_down');}
	if(heroDirection === RIGHT){heroSprite.animations.play('walk_right');}
	if(heroDirection === UP){heroSprite.animations.play('walk_up');}
	

	if (isSpaceFree( walls, nextX, nextY)){
		heroDestination.x = nextX;
		heroDestination.y = nextY;
	}else{
		console.log('blocked');
		
		// draw a red square
		ctx.fillStyle = 'red';
		// line width
		ctx.lineWidth = 7;
		ctx.fillRect(nextX, nextY, gridSize, gridSize);
	}
}


// render draw
const draw = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	skySprite.drawImage(ctx, 0, 0);
	groundSprite.drawImage(ctx, 0, 0);

	// controls on hero
	const heroOffset = new Vector2(-8,-18);
	const heroPosX = heroSprite.position.x + heroOffset.x;
	const heroPosY = heroSprite.position.y + heroOffset.y;


	shadowSprite.drawImage(ctx, heroPosX, heroPosY);
	heroSprite.drawImage(ctx, heroPosX, heroPosY);
	drawGrid(ctx, canvas.width, canvas.height);
}

const gameLoop = new GameLoop(update, draw);

gameLoop.start();