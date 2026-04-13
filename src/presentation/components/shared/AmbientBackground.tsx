"use client";

import { useEffect, useRef } from "react";



const TAU = Math.PI * 2;

function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }

interface QParticle {
  x: number; y: number;
  vx: number; vy: number;
  sigma: number;
  targetSigma: number;
  hue: number;
  spinAngle: number;
  spinRadius: number;
  entangled: number;
  tunnelTimer: number;
  tunnelCooldown: number;
  opacity: number;
}

export default function AmbientBackground() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const raf = useRef(0);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let w = 0, h = 0;
    let particles: QParticle[] = [];

    const init = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * devicePixelRatio;
      canvas.height = h * devicePixelRatio;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);

      const count = Math.max(4, Math.min(6, Math.floor(w / 280)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          sigma: 80 + Math.random() * 60,
          targetSigma: 80 + Math.random() * 60,
          hue: i % 2 === 0 ? 190 : 260,
          spinAngle: Math.random() * TAU,
          spinRadius: 12 + Math.random() * 10,
          entangled: -1,
          tunnelTimer: 5 + Math.random() * 15,
          tunnelCooldown: 0,
          opacity: 1,
        });
      }

      for (let i = 0; i < particles.length - 1; i += 2) {
        particles[i].entangled = i + 1;
        particles[i + 1].entangled = i;
      }
    };

    const onMove = (e: MouseEvent) => { mouse.current.x = e.clientX; mouse.current.y = e.clientY; };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      const dt = 1 / 60;

      for (const p of particles) {

        p.tunnelTimer -= dt;
        if (p.tunnelCooldown > 0) p.tunnelCooldown -= dt;

        if (p.tunnelTimer <= 0 && p.tunnelCooldown <= 0) {

          p.opacity = 0;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.tunnelTimer = 8 + Math.random() * 15;
          p.tunnelCooldown = 1.5;
        }


        if (p.tunnelCooldown > 0) {
          p.opacity = lerp(p.opacity, 1, 0.03);
        } else {
          p.opacity = lerp(p.opacity, 1, 0.05);
        }


        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 300) {
          const strength = 1 - dist / 300;
          p.targetSigma = lerp(80, 20, strength);

          if (dist > 10) {
            p.vx += (dx / dist) * strength * 0.02;
            p.vy += (dy / dist) * strength * 0.02;
          }
        } else {
          p.targetSigma = 80 + Math.sin(Date.now() * 0.0005 + p.hue) * 30;
        }

        p.sigma = lerp(p.sigma, p.targetSigma, 0.02);


        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.998;
        p.vy *= 0.998;


        p.vx += (Math.random() - 0.5) * 0.015;
        p.vy += (Math.random() - 0.5) * 0.015;


        const margin = 100;
        if (p.x < -margin) p.x = w + margin;
        if (p.x > w + margin) p.x = -margin;
        if (p.y < -margin) p.y = h + margin;
        if (p.y > h + margin) p.y = -margin;

        p.spinAngle += 0.02;
      }

      for (const p of particles) {
        if (p.entangled < 0 || p.entangled < particles.indexOf(p)) continue;
        const partner = particles[p.entangled];
        if (!partner) continue;

        const pulse = 0.5 + 0.5 * Math.sin(Date.now() * 0.003);
        const alpha = 0.04 * pulse * Math.min(p.opacity, partner.opacity);

        ctx.beginPath();

        const cpx = (p.x + partner.x) / 2 + Math.sin(Date.now() * 0.001) * 40;
        const cpy = (p.y + partner.y) / 2 + Math.cos(Date.now() * 0.0012) * 40;
        ctx.moveTo(p.x, p.y);
        ctx.quadraticCurveTo(cpx, cpy, partner.x, partner.y);
        ctx.strokeStyle = `rgba(0, 212, 255, ${alpha})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (const p of particles) {
        const alpha = p.opacity * 0.12;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.sigma * 2.5);

        if (p.hue === 190) {
          grad.addColorStop(0, `rgba(0, 212, 255, ${alpha})`);
          grad.addColorStop(0.3, `rgba(0, 180, 230, ${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(0, 212, 255, 0)`);
        } else {
          grad.addColorStop(0, `rgba(123, 97, 255, ${alpha})`);
          grad.addColorStop(0.3, `rgba(100, 80, 220, ${alpha * 0.5})`);
          grad.addColorStop(1, `rgba(123, 97, 255, 0)`);
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.sigma * 2.5, 0, TAU);
        ctx.fillStyle = grad;
        ctx.fill();


        const ringCount = 3;
        for (let i = 1; i <= ringCount; i++) {
          const r = p.sigma * (0.6 + i * 0.5);
          const ringAlpha = alpha * 0.3 * (1 - i / (ringCount + 1));
          ctx.beginPath();
          ctx.arc(p.x, p.y, r, 0, TAU);
          ctx.strokeStyle = p.hue === 190
            ? `rgba(0, 212, 255, ${ringAlpha})`
            : `rgba(123, 97, 255, ${ringAlpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }


        const sx = p.x + Math.cos(p.spinAngle) * p.spinRadius;
        const sy = p.y + Math.sin(p.spinAngle) * p.spinRadius;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, TAU);
        ctx.fillStyle = p.hue === 190
          ? `rgba(0, 212, 255, ${p.opacity * 0.5})`
          : `rgba(123, 97, 255, ${p.opacity * 0.5})`;
        ctx.fill();


        const coreAlpha = p.opacity * (0.3 + 0.2 * (1 - p.sigma / 140));
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, TAU);
        ctx.fillStyle = p.hue === 190
          ? `rgba(0, 212, 255, ${coreAlpha})`
          : `rgba(123, 97, 255, ${coreAlpha})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    init();
    draw();
    window.addEventListener("resize", init);
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", init);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 pointer-events-none -z-10"
      aria-hidden
    />
  );
}
