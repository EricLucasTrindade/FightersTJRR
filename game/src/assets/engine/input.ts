type KeyState = { [code: string]: boolean };

export class Input {
  keys: KeyState = {};
  gamepads: (Gamepad | null)[] = [];

  constructor() {
    window.addEventListener("keydown", e => (this.keys[e.code] = true));
    window.addEventListener("keyup", e => (this.keys[e.code] = false));
    window.addEventListener("gamepadconnected", () => this.pollGamepads());
    window.addEventListener("gamepaddisconnected", () => this.pollGamepads());
  }
  pollGamepads() {
    this.gamepads = navigator.getGamepads ? Array.from(navigator.getGamepads()) : [];
  }
  axisDir(index = 0, axis = 0, dead = 0.25) {
    const gp = this.gamepads[index];
    if (!gp) return 0;
    const a = gp.axes[axis] ?? 0;
    return Math.abs(a) < dead ? 0 : Math.sign(a);
  }
  btn(index = 0, b = 0) {
    const gp = this.gamepads[index];
    return gp ? !!gp.buttons[b]?.pressed : false;
  }
}
