import { Vector2 } from "./Vector2";
import {GameObject} from "./GameObject";

  export class Sprite extends GameObject {
    name: string; // Add the 'name' property

    resource: any; // Add the 'resource' property
    frameSize: Vector2; // Add the 'frameSize' property
    hFrames: number; // Add the 'hFrames' property
    vFrames: number; // Add the 'vFrames' property
    frame: number; // Add the 'frame' property
    frameMap: Map<number, Vector2>; // Add the 'frameMap' property
    scale: number; // Add the 'scale' property
    animations: any; // Add the 'animations' property

    constructor({
      name, // Add the 'name' parameter
      resource,
      frameSize,
      hFrames,
      vFrames,
      frame,
      scale,
      position,
      animations,
    }) {
      super({
        position,
      });
      this.resource = resource;
      this.frameSize = frameSize ?? new Vector2(16, 16);
      this.hFrames = hFrames ?? 1;
      this.vFrames = vFrames ?? 1;
      this.frame = frame ?? 0;
      this.frameMap = new Map();
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

    step(delta) {
      if (!this.animations) {
        return;
      }
      this.animations.step(delta);
      this.frame = this.animations.frame;
    }

    drawImage(ctx, x, y) {
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
        frameSizeX, //How much to crop from the sprite sheet (X)
        frameSizeY, //How much to crop from the sprite sheet (Y)
        x, //Where to place this on canvas tag X (0)
        y, //Where to place this on canvas tag Y (0)
        frameSizeX * this.scale, //How large to scale it (X)
        frameSizeY * this.scale //How large to scale it (Y)
      );
    }
  }