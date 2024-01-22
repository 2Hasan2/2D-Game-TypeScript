export const LEFT = 'LEFT';
export const RIGHT = 'RIGHT';
export const UP = 'UP';
export const DOWN = 'DOWN';

export class Input {
	heldDirections: string[];

	constructor(){
		this.heldDirections = [];

		document.addEventListener('keydown', (e) => {

			// use arrow keys or WASD
			switch (e.key) {
				case 'ArrowLeft':
				case 'a':
					this.onArrowPressed(LEFT);
					break;
				case 'ArrowRight':
				case 'd':
					this.onArrowPressed(RIGHT);
					break;
				case 'ArrowUp':
				case 'w':
					this.onArrowPressed(UP);
					break;
				case 'ArrowDown':
				case 's':
					this.onArrowPressed(DOWN);
					break;
			}
		});

		document.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'ArrowLeft':
				case 'a':
					this.onArrowReleased(LEFT);
					break;
				case 'ArrowRight':
				case 'd':
					this.onArrowReleased(RIGHT);
					break;
				case 'ArrowUp':
				case 'w':
					this.onArrowReleased(UP);
					break;
				case 'ArrowDown':
				case 's':
					this.onArrowReleased(DOWN);
					break;
			}
		});

	}

	get direction(){
		return this.heldDirections[0];
	}

	up(){
		return this.direction === UP;
	}

	down(){
		return this.direction === DOWN;
	}

	left(){
		return this.direction === LEFT;
	}

	right(){
		return this.direction === RIGHT;
	}

	onArrowPressed = (direction: string) => {
		if(this.heldDirections.indexOf(direction) === -1){
			this.heldDirections.unshift(direction);
		}
	}

	onArrowReleased = (direction: string) => {
		const index = this.heldDirections.indexOf(direction);
		if(index > -1){
			this.heldDirections.splice(index, 1);
		}
	}
}