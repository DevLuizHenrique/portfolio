"use client";

import { useEffect, useRef } from "react";

// ── Types ──────────────────────────────────────────────

interface Vec2 {
  x: number;
  y: number;
}

interface Footprint {
  x: number;
  y: number;
  rotation: number;
  isLeft: boolean;
  createdAt: number;
  seed: number;
}

interface InkDrop {
  x: number;
  y: number;
  radius: number;
  createdAt: number;
}

// ── Constants ──────────────────────────────────────────

const LIFETIME = 20000;
const DROP_LIFETIME = 15000;
const BLEED_MS = 500;
const BASE_STRIDE = 40;
const STRIDE_WIDTH = 6;
const PATH_BUFFER_SIZE = 12;

// ── Easing helpers ─────────────────────────────────────

function easeOutCubic(t: number) {
  return 1 - (1 - t) * (1 - t) * (1 - t);
}

function easeInQuad(t: number) {
  return t * t;
}

function lerpAngle(a: number, b: number, t: number) {
  const diff = Math.atan2(Math.sin(b - a), Math.cos(b - a));
  return a + diff * t;
}

// ── Drawing ────────────────────────────────────────────

function drawFoot(
  ctx: CanvasRenderingContext2D,
  fp: Footprint,
  now: number,
) {
  const age = now - fp.createdAt;
  if (age > LIFETIME) return;

  // Ink bleed: easeOutCubic for smooth material spread
  const bleedT = Math.min(1, age / BLEED_MS);
  const bleed = easeOutCubic(bleedT);

  // Alpha: quick appear, very slow fade
  let alpha: number;
  if (age < BLEED_MS) {
    alpha = 0.5 * bleed;
  } else {
    const fadeT = (age - BLEED_MS) / (LIFETIME - BLEED_MS);
    alpha = 0.5 * (1 - easeInQuad(fadeT));
  }
  if (alpha <= 0.005) return;

  const scale = 0.8 + 0.2 * bleed;

  ctx.save();
  ctx.translate(fp.x, fp.y);
  ctx.rotate(fp.rotation);
  ctx.scale(scale, scale);
  ctx.globalAlpha = alpha;

  const mirror = fp.isLeft ? 1 : -1;
  ctx.scale(mirror, 1);

  const ink = `rgba(58, 32, 10, ${0.65 * bleed})`;
  const stroke = `rgba(40, 22, 10, ${0.4 * bleed})`;

  // ── Sole ─────────────────────────────────────────
  ctx.fillStyle = ink;
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 0.5;
  ctx.lineJoin = "round";

  ctx.beginPath();
  ctx.moveTo(-3, 9);
  ctx.bezierCurveTo(-4.4, 6.5, -4.6, 2, -4, -1);
  ctx.bezierCurveTo(-3.6, -3.2, -3.2, -5, -3.6, -6.5);
  ctx.bezierCurveTo(-4, -7.8, -3.4, -8.8, -2.2, -8.8);
  ctx.lineTo(2.6, -8.8);
  ctx.bezierCurveTo(3.8, -8.8, 4.3, -7.8, 3.9, -6.5);
  ctx.bezierCurveTo(3.4, -5, 3.6, -3.2, 4, -1);
  ctx.bezierCurveTo(4.6, 2, 4.2, 6.5, 3, 9);
  ctx.bezierCurveTo(2, 10.8, -2, 10.8, -3, 9);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // ── Arch highlight ───────────────────────────────
  ctx.globalAlpha = alpha * 0.25;
  ctx.fillStyle = "rgba(230, 215, 185, 0.6)";
  ctx.beginPath();
  ctx.ellipse(-0.3, 2, 1.6, 3.2, 0.08, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = alpha;

  // ── Toes (staggered bleed) ───────────────────────
  const toes: [number, number, number, number][] = [
    [-3.0, -10.2, 1.4, 1.7],
    [-1.0, -11.5, 1.35, 1.65],
    [1.0, -11.9, 1.3, 1.55],
    [2.8, -11.3, 1.15, 1.4],
    [4.1, -10.0, 1.0, 1.2],
  ];

  ctx.fillStyle = ink;
  ctx.strokeStyle = stroke;

  toes.forEach(([tx, ty, rx, ry], i) => {
    const delay = i * 0.07;
    const toeT = Math.max(0, Math.min(1, (bleed - delay) / (1 - delay)));
    if (toeT <= 0) return;

    const eased = easeOutCubic(toeT);
    ctx.save();
    ctx.globalAlpha = alpha * eased;
    ctx.beginPath();
    ctx.ellipse(tx, ty, rx * eased, ry * eased, 0.04 * (i - 2), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  });

  // ── Ink grain texture ────────────────────────────
  ctx.fillStyle = stroke;
  const s = fp.seed;
  for (let i = 0; i < 6; i++) {
    const gx = ((s * (i + 1) * 7) % 6) - 3;
    const gy = ((s * (i + 1) * 13) % 14) - 4;
    const gr = 0.25 + ((s * (i + 1)) % 3) * 0.12;
    ctx.globalAlpha = alpha * 0.2 * bleed;
    ctx.beginPath();
    ctx.arc(gx, gy, gr, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

function drawDrop(ctx: CanvasRenderingContext2D, d: InkDrop, now: number) {
  const age = now - d.createdAt;
  if (age < 0 || age > DROP_LIFETIME) return;

  const t = age / DROP_LIFETIME;
  const alpha = 0.22 * (1 - t * t);
  const r = d.radius * (1 + t * 0.4);
  if (alpha <= 0) return;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.fillStyle = "rgba(58, 32, 10, 0.55)";
  ctx.beginPath();
  ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

// ── Component ──────────────────────────────────────────

export default function Footprints() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const state = useRef({
    prints: [] as Footprint[],
    drops: [] as InkDrop[],
    path: [] as Vec2[],              // recent mouse positions
    accDist: 0,                      // accumulated distance since last step
    lastStep: { x: 0, y: 0 },       // where the last step was placed
    smoothAngle: 0,
    isLeft: true,
    lastTime: 0,
    initialized: false,
    seedCounter: 0,
    animFrame: 0,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    if (!ctx) return;

    let dpr = 1;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    // ── Visibility handling ────────────────────────
    let paused = false;
    let pausedAt = 0;

    const onVisibility = () => {
      if (document.hidden) {
        paused = true;
        pausedAt = Date.now();
        cancelAnimationFrame(state.current.animFrame);
      } else {
        if (paused) {
          // Shift all timestamps forward so nothing expires while hidden
          const elapsed = Date.now() - pausedAt;
          const s = state.current;
          s.prints.forEach((p) => (p.createdAt += elapsed));
          s.drops.forEach((d) => (d.createdAt += elapsed));
          paused = false;
        }
        state.current.animFrame = requestAnimationFrame(render);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // ── Render loop ────────────────────────────────
    const render = () => {
      if (paused) return;
      const s = state.current;
      const now = Date.now();
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      // Prune expired
      s.prints = s.prints.filter((p) => now - p.createdAt < LIFETIME);
      s.drops = s.drops.filter((d) => now - d.createdAt < DROP_LIFETIME);

      // Draw drops behind prints
      for (const d of s.drops) drawDrop(ctx, d, now);
      for (const p of s.prints) drawFoot(ctx, p, now);

      s.animFrame = requestAnimationFrame(render);
    };
    state.current.animFrame = requestAnimationFrame(render);

    // ── Average direction from path buffer ─────────
    const getPathAngle = (): number => {
      const path = state.current.path;
      if (path.length < 2) return state.current.smoothAngle;

      // Weighted average of recent deltas (newer = heavier)
      let wx = 0, wy = 0, totalW = 0;
      for (let i = 1; i < path.length; i++) {
        const w = i * i;  // quadratic weight
        wx += (path[i].x - path[i - 1].x) * w;
        wy += (path[i].y - path[i - 1].y) * w;
        totalW += w;
      }
      if (totalW === 0) return state.current.smoothAngle;

      wx /= totalW;
      wy /= totalW;
      const len = Math.sqrt(wx * wx + wy * wy);
      if (len < 0.001) return state.current.smoothAngle;

      return Math.atan2(wy, wx) + Math.PI / 2;
    };

    // ── Place a footprint ──────────────────────────
    const placeStep = (x: number, y: number) => {
      const s = state.current;
      const angle = getPathAngle();
      s.smoothAngle = lerpAngle(s.smoothAngle, angle, 0.5);

      const side = s.isLeft ? -1 : 1;
      const perp = s.smoothAngle - Math.PI / 2;
      const ox = Math.cos(perp) * STRIDE_WIDTH * side;
      const oy = Math.sin(perp) * STRIDE_WIDTH * side;

      // Organic jitter
      const jx = (Math.random() - 0.5) * 2.5;
      const jy = (Math.random() - 0.5) * 2.5;
      const ja = (Math.random() - 0.5) * 0.12;

      const now = Date.now();
      s.seedCounter++;

      s.prints.push({
        x: x + ox + jx,
        y: y + oy + jy,
        rotation: s.smoothAngle + ja,
        isLeft: s.isLeft,
        createdAt: now,
        seed: s.seedCounter,
      });

      // Ink splatter
      if (Math.random() < 0.35) {
        const n = 1 + Math.floor(Math.random() * 3);
        for (let i = 0; i < n; i++) {
          s.drops.push({
            x: x + ox + (Math.random() - 0.5) * 18,
            y: y + oy + (Math.random() - 0.5) * 18,
            radius: 0.4 + Math.random() * 1.0,
            createdAt: now + Math.random() * 150,
          });
        }
      }

      s.isLeft = !s.isLeft;
      s.lastStep = { x, y };
    };

    // ── Mouse handler ──────────────────────────────
    const onMove = (e: MouseEvent) => {
      const s = state.current;
      const mx = e.clientX;
      const my = e.clientY;

      if (!s.initialized) {
        s.lastStep = { x: mx, y: my };
        s.path = [{ x: mx, y: my }];
        s.initialized = true;
        return;
      }

      // Add to path buffer
      s.path.push({ x: mx, y: my });
      if (s.path.length > PATH_BUFFER_SIZE) {
        s.path.shift();
      }

      // Accumulate distance from last step position
      const dx = mx - s.lastStep.x;
      const dy = my - s.lastStep.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      // When enough distance accumulated, interpolate step positions along path
      if (dist >= BASE_STRIDE) {
        // How many steps fit in this distance
        const steps = Math.floor(dist / BASE_STRIDE);
        const dirX = dx / dist;
        const dirY = dy / dist;

        for (let i = 1; i <= steps; i++) {
          const t = (i * BASE_STRIDE) / dist;
          const sx = s.lastStep.x + dx * t;
          const sy = s.lastStep.y + dy * t;
          placeStep(sx, sy);
        }
      }
    };

    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("visibilitychange", onVisibility);
      cancelAnimationFrame(state.current.animFrame);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ mixBlendMode: "multiply", zIndex: 1 }}
    />
  );
}
