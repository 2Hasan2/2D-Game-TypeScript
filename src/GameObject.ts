import { Vector2 } from "./Vector2";
import { events } from "./Events";

export class GameObject {
  position: Vector2;
  children: GameObject[];
  parent: GameObject | null;
  hasReadyBeenCalled: boolean;

  constructor({ position }: { position?: Vector2 }) {
    this.position = position ?? new Vector2(0, 0);
    this.children = [];
    this.parent = null;
    this.hasReadyBeenCalled = false;
  }

  // First entry point of the loop
  stepEntry(delta: number, root: GameObject) {
    // Call updates on all children first
    this.children.forEach((child) => child.stepEntry(delta, root));

    // Call ready on the first frame
    if (!this.hasReadyBeenCalled) {
      this.hasReadyBeenCalled = true;
      this.ready();
    }

    // Call any implemented Step code
    this.step(delta);
  }

  // Called before the first `step`
  ready() {
    // ...
  }

  // Called once every frame
  step(_delta: number) {
    // ...
  }

  /* draw entry */
  draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    const drawPosX = x + this.position.x;
    const drawPosY = y + this.position.y;

    // Do the actual rendering for Images
    this.drawImage(ctx, drawPosX, drawPosY);

    // Pass on to children
    this.children.forEach((child) => child.draw(ctx, drawPosX, drawPosY));
  }

  drawImage(ctx: CanvasRenderingContext2D, drawPosX: number, drawPosY: number) {
    //...
  }

  // Remove from the tree
  destroy() {
    this.children.forEach((child) => {
      child.destroy();
    });
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  /* Other Game Objects are nestable inside this one */
  addChild(gameObject: GameObject) {
    gameObject.parent = this;
    this.children.push(gameObject);
  }

  removeChild(gameObject: GameObject) {
    events.unsubscribe(gameObject);
    this.children = this.children.filter((g) => gameObject !== g);
  }
}