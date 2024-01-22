interface SpriteOptions {
  resource: any;
  frameSize?: Vector2;
  hFrames?: number;
  vFrames?: number;
  frame?: number;
  scale?: number;
  position?: Vector2;
  animations?: any;
}

export class Sprite {
  resource: any;
  frameSize: Vector2;
  hFrames: number;
  vFrames: number;
  frame: number;
  frameMap: Map<number, Vector2>;
  scale: number;
  position: Vector2;
  animations: any;

  constructor({
    resource,
    frameSize,
    hFrames,
    vFrames,
    frame,
    scale,
    position,
    animations,
  }: SpriteOptions) {


    this.resource = resource;
    this.frameSize = frameSize ?? new Vector2(16, 16);
    this.hFrames = hFrames ?? 1;
    this.vFrames = vFrames ?? 1;
    this.frame = frame ?? 0;
    this.frameMap = new Map<number, Vector2>();
    this.scale = scale ?? 1;
    this.position = position ?? new Vector2(0, 0);
    this.animations = animations ?? null;
    this.buildFrameMap();
  }

  buildFrameMap() {
    let frameCount = 0;
    for (let v = 0; v < this.vFrames; v++) {
      for (let h = 0; h < this.hFrames; h++) {
        this.frameMap.set(
          frameCount,
          new Vector2(this.frameSize.x * h, this.frameSize.y * v)
        );
        frameCount++;
      }
    }
  }

  step(delta: number) {
    if (!this.animations) {
      return;
    }
    this.animations.step(delta);
    this.frame = this.animations.frame;
  }

  drawImage(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.resource.isLoaded) {
      return;
    }

    // Find the correct sprite sheet frame to use
    let frameCoordX = 0;
    let frameCoordY = 0;
    const frame = this.frameMap.get(this.frame);
    if (frame) {
      frameCoordX = frame.x;
      frameCoordY = frame.y;
    }

    const frameSizeX = this.frameSize.x;
    const frameSizeY = this.frameSize.y;

    ctx.drawImage(
      this.resource.image,
      frameCoordX,
      frameCoordY, // Top Y corner of frame
      frameSizeX, // How much to crop from the sprite sheet (X)
      frameSizeY, // How much to crop from the sprite sheet (Y)
      x, // Where to place this on canvas tag X (0)
      y, // Where to place this on canvas tag Y (0)
      frameSizeX * this.scale, // How large to scale it (X)
      frameSizeY * this.scale // How large to scale it (Y)
    );
  }
}

export class Vector2 {
  x: number;
  y: number;

  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }

  duplicate(): Vector2 {
    return new Vector2(this.x, this.y);
  }
}
