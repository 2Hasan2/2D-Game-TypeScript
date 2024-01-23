export class GameLoop {
  private lastFrameTime: number = 0;
  private accumulatedTime: number = 0;
  private timeStep: number = 1000/60; // 60 frames per second

  private update: (timeStep: number) => void;
  private render: () => void;

  private rafId: number | null = null;
  private isRunning: boolean = false;

  constructor(update: (timeStep: number) => void, render: () => void) {
    this.update = update;
    this.render = render;
  }

  mainLoop = (timestamp: number) => {
    if (!this.isRunning) return;

    let deltaTime = timestamp - this.lastFrameTime;
    this.lastFrameTime = timestamp;

    // Accumulate all the time since the last frame.
    this.accumulatedTime += deltaTime;

    // Fixed time step updates.
    // If there's enough accumulated time to run one or more fixed updates, run them.
    while (this.accumulatedTime >= this.timeStep) {
      this.update(this.timeStep); // Here, we pass the fixed time step size.
      this.accumulatedTime -= this.timeStep;
    }

    // Render
    this.render();

    this.rafId = requestAnimationFrame(this.mainLoop);
  }

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