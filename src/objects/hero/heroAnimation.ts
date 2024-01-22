const walkingFrames =(rootFrame=0)=>{
	return {
		duration: 400,
		frames: [
			{
				time: 0,
				frame: rootFrame+1,
			},
			{
				time: 100,
				frame:rootFrame,
			},
			{
				time: 200,
				frame: rootFrame+1,
			},
			{
				time: 300,
				frame: rootFrame+2,
			},
		]
	};
}

const standingFrames = (rootFrame=0)=>{
	return {
		duration: 1000,
		frames: [
			{
				time: 0,
				frame: rootFrame,
			}
		]
	};
}

export const stand_down = standingFrames(1);
export const stand_right = standingFrames(4);
export const stand_up = standingFrames(7);
export const stand_left = standingFrames(10);



export const walk_down = walkingFrames(0);
export const walk_right = walkingFrames(3);
export const walk_up = walkingFrames(6);
export const walk_left = walkingFrames(9);