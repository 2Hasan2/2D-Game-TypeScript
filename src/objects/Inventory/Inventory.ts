import {GameObject} from "../../GameObject";
import {Sprite} from "../../Sprite";
import {resources} from "../../Resource";
import {Vector2} from "../../Vector2";
import {events} from "../../Events";

export class Inventory extends GameObject {
  nextId: number;
  items: { id: number; image: any }[];

  constructor() {
    super({
      position: new Vector2(0, 1)
    });

    this.nextId = 0;
    this.items = [
      {
        id: -1,
        image: resources.images.rod
      },
      {
        id: -2,
        image: resources.images.rod
      }
    ];

    // React to Hero picking up an item
    events.on("HERO_PICKS_UP_ITEM", this, (data: any) => {
      this.nextId += 1;
      this.items.push({
        id: this.nextId,
        image: resources.images.rod
      });
      this.renderInventory();
    });

    // Demo removing of something (could happen on item use)
    // setTimeout(() => {
    //   this.removeFromInventory(-2)
    // }, 2000)

    // Draw initial state on bootup
    this.renderInventory();
  }

  renderInventory() {
    // Remove stale drawings
    this.children.forEach((child: any) => child.destroy());

    // Draw fresh from the latest version of the list
    this.items.forEach((item: any, index: number) => {
      const sprite = new Sprite({
        name: "sprite",
        resource: item.image,
        frameSize: new Vector2(0, 0),
        hFrames: 0,
        vFrames: 0,
        frame: 0,
        scale: 0,
        position: new Vector2(index * 12, 0),
        animations: {}
      });
      this.addChild(sprite);
    });
  }

  removeFromInventory(id: any) {
    this.items = this.items.filter((item: any) => item.id !== id);
    this.renderInventory();
  }
}












