type KeyState = { [code: string]: boolean };

// Validação de entrada para segurança
const validateGamepadInput = (value: number): boolean => {
  return !isNaN(value) && Math.abs(value) <= 1;
};

const validateButtonIndex = (index: number): boolean => {
  return Number.isInteger(index) && index >= 0 && index < 20; // Limite razoável para botões
};

export class Input {
  keys: KeyState = {};
  gamepads: (Gamepad | null)[] = [];
  private lastAttackTime = 0;
  private readonly attackCooldown = 500; // ms - Rate limiting para ataques

  constructor() {
    this.setupEventListeners();
  }

  private setupEventListeners() {
    window.addEventListener("keydown", this.handleKeyDown.bind(this));
    window.addEventListener("keyup", this.handleKeyUp.bind(this));
    window.addEventListener("gamepadconnected", () => this.pollGamepads());
    window.addEventListener("gamepaddisconnected", () => this.pollGamepads());
  }

  private handleKeyDown(e: KeyboardEvent) {
    // Sanitizar código da tecla
    const sanitizedCode = e.code.replace(/[^a-zA-Z0-9]/g, '');
    if (sanitizedCode) {
      this.keys[sanitizedCode] = true;
    }
  }

  private handleKeyUp(e: KeyboardEvent) {
    const sanitizedCode = e.code.replace(/[^a-zA-Z0-9]/g, '');
    if (sanitizedCode) {
      this.keys[sanitizedCode] = false;
    }
  }

  pollGamepads() {
    this.gamepads = navigator.getGamepads ? Array.from(navigator.getGamepads()) : [];
  }

  axisDir(index = 0, axis = 0, dead = 0.25) {
    if (!validateButtonIndex(index) || !validateButtonIndex(axis)) return 0;
    
    const gp = this.gamepads[index];
    if (!gp) return 0;
    
    const a = gp.axes[axis] ?? 0;
    if (!validateGamepadInput(a)) return 0;
    
    return Math.abs(a) < dead ? 0 : Math.sign(a);
  }

  btn(index = 0, b = 0) {
    if (!validateButtonIndex(index) || !validateButtonIndex(b)) return false;
    
    const gp = this.gamepads[index];
    return gp ? !!gp.buttons[b]?.pressed : false;
  }

  // Rate limiting para ataques
  canAttack(): boolean {
    const now = Date.now();
    if (now - this.lastAttackTime >= this.attackCooldown) {
      this.lastAttackTime = now;
      return true;
    }
    return false;
  }

  // Limpar recursos
  destroy() {
    window.removeEventListener("keydown", this.handleKeyDown.bind(this));
    window.removeEventListener("keyup", this.handleKeyUp.bind(this));
    window.removeEventListener("gamepadconnected", () => this.pollGamepads());
    window.removeEventListener("gamepaddisconnected", () => this.pollGamepads());
  }
}
