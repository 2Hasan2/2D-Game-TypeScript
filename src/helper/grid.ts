export const gridSize: number = 16;
export const gridCells = (n: number): number => { return n * gridSize; }

export const isSpaceFree = (walls: Array<any>, x: number, y: number): boolean => {
	return walls.every((wall: any): boolean => {
		return wall.x !== x || wall.y !== y;
	})
}