export const gridSize: number = 16;
export const gridCells = (n: number): number => { return n * gridSize; }

// walls is Set<string>
export const isSpaceFree = (walls: Set<string>, x: number, y: number): boolean => {
	let posString = `${x},${y}`;
	return !walls.has(posString) 
}