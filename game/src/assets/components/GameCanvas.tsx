import { useEffect, useRef } from "react";
import { Input } from "../engine/input";
import { Fighter } from "../game/fighter";
import { config } from "../../config/environment";

const WIDTH = 800;
const HEIGHT = 450;
const FLOOR_Y = 380;

export default function GameCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const input = new Input();

    const p1 = new Fighter(
      {
        left: () => input.keys["KeyA"] || input.axisDir(0, 0) < 0,
        right: () => input.keys["KeyD"] || input.axisDir(0, 0) > 0,
        jump: () => input.keys["Space"] || input.btn(0, 0),
        attack: () => input.keys["KeyF"] || input.btn(0, 2),
        canAttack: () => input.canAttack(),
      },
      FLOOR_Y
    );
    p1.pos.x = 150;

    const p2 = new Fighter(
      {
        left: () => input.keys["ArrowLeft"] || input.axisDir(1, 0) < 0,
        right: () => input.keys["ArrowRight"] || input.axisDir(1, 0) > 0,
        jump: () => input.keys["Enter"] || input.btn(1, 0),
        attack: () => input.keys["ShiftRight"] || input.btn(1, 2),
        canAttack: () => input.canAttack(),
      },
      FLOOR_Y
    );
    p2.pos.x = 600;
    p2.color = "#22c55e";

    let roundTime = 60; // s
    let last = performance.now();
    let acc = 0;

    const drawHUD = () => {
      const w = 300, h = 16, pad = 10;

      // P1
      ctx.fillStyle = "#111827";
      ctx.fillRect(pad, pad, w, h);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(pad, pad, (w * p1.hp) / p1.hpMax, h);

      // P2
      ctx.fillStyle = "#111827";
      ctx.fillRect(WIDTH - w - pad, pad, w, h);
      ctx.fillStyle = "#ef4444";
      ctx.fillRect(WIDTH - w - pad, pad, (w * p2.hp) / p2.hpMax, h);

      // Timer
      ctx.fillStyle = "#111827";
      ctx.fillRect(WIDTH / 2 - 25, pad, 50, h);
      ctx.fillStyle = "white";
      ctx.font = "12px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(String(Math.ceil(roundTime)), WIDTH / 2, pad + 12);
    };

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      acc += dt;
      if (acc >= 1) {
        roundTime = Math.max(0, roundTime - 1);
        acc = 0;
      }

      p1.update(p2.pos.x);
      p2.update(p1.pos.x);
      p1.checkHit(p2);
      p2.checkHit(p1);

      ctx.clearRect(0, 0, WIDTH, HEIGHT);
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(0, FLOOR_Y, WIDTH, HEIGHT - FLOOR_Y);
      p1.draw(ctx);
      p2.draw(ctx);
      drawHUD();

      if (roundTime === 0 || p1.hp === 0 || p2.hp === 0) {
        ctx.fillStyle = "rgba(0,0,0,0.6)";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
        ctx.fillStyle = "white";
        ctx.font = "28px sans-serif";
        ctx.textAlign = "center";
        const txt = p1.hp === p2.hp ? "EMPATE!" : p1.hp > p2.hp ? "P1 VENCEU!" : "P2 VENCEU!";
        ctx.fillText(txt, WIDTH / 2, HEIGHT / 2);
        return; // para o loop
      }
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      input.destroy(); // Limpar recursos do input
    };
  }, []);

  return (
    <div style={{ display: "grid", placeItems: "center", padding: 16 }}>
      <canvas
        ref={canvasRef}
        width={WIDTH}
        height={HEIGHT}
        style={{ width: "100%", maxWidth: WIDTH, border: "1px solid #333", borderRadius: 8 }}
      />
      <p style={{ fontFamily: "sans-serif", fontSize: 14 }}>
        P1: WASD + Space (pulo) + F (ataque) — P2: Setas + Enter + Right Shift
      </p>
      {config.debug && (
        <div style={{ fontFamily: "monospace", fontSize: 12, color: "#666", marginTop: 8 }}>
          <div>Ambiente: {config.environment}</div>
          <div>Versão: {config.version}</div>
          <div>Debug: {config.debug ? 'Ativado' : 'Desativado'}</div>
        </div>
      )}
    </div>
  );
}
