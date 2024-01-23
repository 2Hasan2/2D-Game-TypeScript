import {GameObject} from "../../GameObject";
import {Vector2} from "../../Vector2";
import {Sprite} from "../../Sprite";
import {resources} from "../../Resource";
import {events} from "../../Events";

export class Rod extends GameObject {
  constructor(x: number, y: number) {
    super({
      position: new Vector2(x, y)
    });
    const sprite = new Sprite({
      name: "Rod",
      resource: resources.images.rod,
      frameSize: new Vector2(0, 0),
      hFrames: 0,
      vFrames: 0,
      frame: 0,
      scale: 1,
      position: new Vector2(0, -5), // nudge upwards visually
      animations: {}
    });
    this.addChild(sprite);
  }

  ready() {
    events.on("HERO_POSITION", this, pos => {
      // detect overlap...
      const roundedHeroX = Math.round(pos.x);
      const roundedHeroY = Math.round(pos.y);
      if (roundedHeroX === this.position.x && roundedHeroY === this.position.y) {
        this.onCollideWithHero();
      }
    });
  }

  onCollideWithHero() {
    // Remove this instance from the scene
    this.destroy();

    // Alert other things that we picked up a rod
    events.emit("HERO_PICKS_UP_ITEM", {
      type: "ROD",
      image: resources.images.rod,
      position: this.position
    })
  }



}