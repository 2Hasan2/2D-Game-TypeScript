export class Animations {
  patterns: { [key: string]: { frame: any, currentTime: number, step: (delta: any) => void } };
  activeKey: string;

  constructor(patterns: { [key: string]: { frame: any, currentTime: number, step: (delta: any) => void } }) {
    this.patterns = patterns;
    this.activeKey = Object.keys(this.patterns)[0];
  }

  get frame() {
    return this.patterns[this.activeKey].frame;
  }

  play(key: string, startAtTime: number = 0) {
    // Already playing this one
    if (this.activeKey === key) {
      return;
    }
    // Switch
    this.activeKey = key;
    this.patterns[this.activeKey].currentTime = startAtTime;
  }

  step(delta: any) {
    this.patterns[this.activeKey].step(delta);
  }
}