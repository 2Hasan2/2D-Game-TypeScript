export class FrameIndexPattern {
	private currentTime: number = 0;
	private animationConfig: AnimationConfig;
	private duration: AnimationConfig["duration"];

	constructor(animationConfig: AnimationConfig) {
		this.animationConfig = animationConfig;
		this.duration = animationConfig.duration ?? 500;
		this.currentTime = 0;
	}

	get frame() {
		const { frames } = this.animationConfig;
		for (let i = frames.length - 1; i >= 0; i--) {
			if (this.currentTime >= frames[i].time) {
				return frames[i].frame;
			}
		}
		throw new Error("Time is before the first keyframe");
	}

	step(delta: number) {
		this.currentTime += delta;
		if (this.currentTime >= this.duration) {
			this.currentTime = 0;
		}
	}
}

interface AnimationConfig {
	duration: number;
	frames: {
		time: number;
		frame: number;
	}[];
}
