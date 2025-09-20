import { GRAVITY, aabbOverlap, clamp } from "../engine/physics";
import type { Rect } from "../engine/physics";

export type Controls = {
  left: () => boolean;
  right: () => boolean;
  jump: () => boolean;
  attack: () => boolean;
  canAttack?: () => boolean;
};

export class Fighter {
  pos = { x: 100, y: 0 };
  vel = { x: 0, y: 0 };
  w = 50;
  h = 100;
  speed = 5;
  jumpForce = 14;
  color = "#3b82f6";
  onGround = false;

  hpMax = 100;
  hp = 100;
  isAttacking = false;
  attackTimer = 0;
  attackDuration = 10; // frames
  facing: 1 | -1 = 1;

  constructor(public controls: Controls, public floorY: number) {}

  get body(): Rect {
    return { x: this.pos.x, y: this.pos.y, w: this.w, h: this.h };
  }

  get attackBox(): Rect | null {
    if (!this.isAttacking) return null;
    const range = 40;
    const ax = this.facing === 1 ? this.pos.x + this.w : this.pos.x - range;
    return { x: ax, y: this.pos.y + 20, w: range, h: 30 };
  }

  update(oppX: number) {
    this.facing = this.pos.x < oppX ? 1 : -1;

    let move = 0;
    if (this.controls.left()) move -= 1;
    if (this.controls.right()) move += 1;
    this.vel.x = move * this.speed;

    if (this.controls.jump() && this.onGround) {
      this.vel.y = -this.jumpForce;
      this.onGround = false;
    }

    // Usar rate limiting para ataques
    if (this.controls.attack() && !this.isAttacking && this.controls.canAttack?.()) {
      this.isAttacking = true;
      this.attackTimer = this.attackDuration;
    }
    if (this.isAttacking) {
      if (--this.attackTimer <= 0) this.isAttacking = false;
    }

    this.vel.y += GRAVITY;
    this.pos.x += this.vel.x;
    this.pos.y += this.vel.y;

    if (this.pos.y + this.h >= this.floorY) {
      this.pos.y = this.floorY - this.h;
      this.vel.y = 0;
      this.onGround = true;
    }

    this.pos.x = clamp(this.pos.x, 0, 800 - this.w);
  }

  receiveHit(dmg = 10) {
    this.hp = clamp(this.hp - dmg, 0, this.hpMax);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.pos.x, this.pos.y, this.w, this.h);

    const atk = this.attackBox;
    if (atk) {
      ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(atk.x, atk.y, atk.w, atk.h);
      ctx.globalAlpha = 1;
    }
  }

  checkHit(other: Fighter) {
    const atk = this.attackBox;
    if (atk && aabbOverlap(atk, other.body)) other.receiveHit();
  }
}
