export const gridSize: number = 16;
export const gridCells = (n: number): number => { return n * gridSize; }

// walls is Set<string>
export const isSpaceFree = (walls: Set<string>, x: number, y: number): boolean => {
	let posString = `${x},${y}`;
	return !walls.has(posString) 
}

// draw grid system 16px x 16px and number the cells
export const drawGrid = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
	ctx.strokeStyle = 'rgba(0,0,0,0.2)';
	ctx.lineWidth = 1;
	for (let x = 0; x < width; x += gridSize) {
		ctx.beginPath();
		ctx.moveTo(x, 0);
		ctx.lineTo(x, height);
		ctx.stroke();
	}
	for (let y = 0; y < height; y += gridSize) {
		ctx.beginPath();
		ctx.moveTo(0, y);
		ctx.lineTo(width, y);
		ctx.stroke();
	}
	ctx.font = '6px Arial';
	ctx.fillStyle = 'red';
	for (let x = 0; x < width; x += gridSize) {
		for (let y = 0; y < height; y += gridSize) {
			ctx.fillText(`${x},${y}`, x + 2, y + 10);
		}
	}
}