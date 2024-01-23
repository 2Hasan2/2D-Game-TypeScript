import { gridCells } from "../helper/grid";
export const walls = new Set() as Set<string>;

let points: [number, number][] = [
	[4, 3],
	[4, 4],
	[4, 5],
	[5, 4],
	[5, 5],
	[7, 5],
	[8, 5],
	[9, 5],
	[10, 5],
	[8, 3],
	[9,3],
	[12,6],
	[13,6],
	[14,6],
	[14,2],
	[14,4],
	[13,4]
];

// loop through points and add to walls
points.forEach((point)=>{
	walls.add(`${gridCells(point[0])},${gridCells(point[1])}`);
});
