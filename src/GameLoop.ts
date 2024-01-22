export class GameLoop {
	lastFrameTimeMs: number;
	accumulatedTime: number;
	timeStep: number;
	update: (timeStep: number) => void;
	render: () => void;
	rafId: number | null;
	isRunning: boolean;

	constructor(update: (timeStep: number) => void, render: () => void) {
		this.lastFrameTimeMs = 0;
		this.accumulatedTime = 0;
		this.timeStep = 1000 / 60;
		this.update = update;
		this.render = render;
		this.rafId = null;
		this.isRunning = false;
	}

	mainLoop = (timestamp: number) => {
		if (!this.isRunning) return;

		let deltaTimestamp = timestamp - this.lastFrameTimeMs;
		this.lastFrameTimeMs = timestamp;

		this.accumulatedTime += deltaTimestamp;

		while (this.accumulatedTime >= this.timeStep) {
			this.update(this.timeStep);
			this.accumulatedTime -= this.timeStep;
		}

		this.render();

		this.rafId = requestAnimationFrame(this.mainLoop);
	};

	start() {
		if (!this.isRunning) {
			this.isRunning = true;
			this.rafId = requestAnimationFrame(this.mainLoop);
		}
	}

	stop() {
		if (this.rafId) {
			cancelAnimationFrame(this.rafId);
		}
		this.isRunning = false;
	}
}