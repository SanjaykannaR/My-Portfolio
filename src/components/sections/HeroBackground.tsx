"use client";

import { useRef, useEffect } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

interface Particle {
  x: number;
  y: number;
  angle: number;
  baseRadius: number;
  phase: number;
  rotationOffset: number;
  size: number;
  life: number;
  dotOpacity: number;
}

const FOLLOW_SPEED = 0.025;

export function HeroBackground() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, prevX: -1000, prevY: -1000, moved: false });
  const centerRef = useRef({ x: 0, y: 0 });
  const spreadRef = useRef(1);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const frameMouseRef = useRef({ x: -1000, y: -1000 });
  const lastMoveTimeRef = useRef<number>(0);
  const swarmOpacityRef = useRef<number>(0);

  useEffect(() => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    centerRef.current = { x: cx, y: cy };
    mouseRef.current = { x: cx, y: cy, prevX: cx, prevY: cy, moved: false };
    startTimeRef.current = Date.now();
    lastMoveTimeRef.current = Date.now();

    const particles: Particle[] = [];
    const layers = [
      { start: 0, count: 30, radius: 30, spread: 15, size: [4, 7], opacity: [0.5, 0.3] },
      { start: 30, count: 30, radius: 65, spread: 20, size: [6, 9], opacity: [0.4, 0.25] },
      { start: 60, count: 20, radius: 105, spread: 25, size: [8, 11], opacity: [0.3, 0.2] },
    ];
    for (const layer of layers) {
      for (let j = 0; j < layer.count; j++) {
        const angle = (j / layer.count) * Math.PI * 2 + (Math.random() - 0.5) * 0.5;
        const radius = layer.radius + (Math.random() - 0.5) * layer.spread;
        particles.push({
          x: cx + (Math.random() - 0.5) * 500,
          y: cy + (Math.random() - 0.5) * 500,
          angle,
          baseRadius: radius,
          phase: Math.random() * Math.PI * 2,
          rotationOffset: Math.random() * Math.PI * 2,
          size: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
          life: 0,
          dotOpacity: layer.opacity[0] + Math.random() * (layer.opacity[1] - layer.opacity[0]),
        });
      }
    }
    particlesRef.current = particles;
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const mouse = mouseRef.current;
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.moved) mouse.moved = true;
      lastMoveTimeRef.current = Date.now();
    };

    window.addEventListener("mousemove", handleMouse);

    const handleTouch = (e: TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        handleMouse({ clientX: touch.clientX, clientY: touch.clientY } as MouseEvent);
      }
    };
    window.addEventListener("touchmove", handleTouch, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const baseColor = isLight ? "#022c22" : "#10b981";
    const maxOpacity = isLight ? 0.9 : 0.75;

    const animate = (time: number) => {
      const dt = lastTimeRef.current ? Math.min((time - lastTimeRef.current) / 1000, 0.05) : 0.016;
      lastTimeRef.current = time;
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);

      const mouse = mouseRef.current;
      const center = centerRef.current;
      const particles = particlesRef.current;

      const targetX = mouse.x > -500 ? mouse.x : w / 2;
      const targetY = mouse.y > -500 ? mouse.y : h / 2;

      center.x += (targetX - center.x) * FOLLOW_SPEED;
      center.y += (targetY - center.y) * FOLLOW_SPEED;

      const fm = frameMouseRef.current;
      const frameDist = fm.x > -500
        ? Math.sqrt((mouse.x - fm.x) ** 2 + (mouse.y - fm.y) ** 2)
        : 0;
      fm.x = mouse.x;
      fm.y = mouse.y;

      const targetSpread = Math.min(1 + frameDist / 20, 4);
      spreadRef.current += (targetSpread - spreadRef.current) * 0.06;

      const idleTime = (Date.now() - lastMoveTimeRef.current) / 1000;
      const targetSwarmOpacity = idleTime > 1.2 ? 0 : 1;
      const fadeSpeed = targetSwarmOpacity > swarmOpacityRef.current ? 0.08 : 0.04;
      swarmOpacityRef.current += (targetSwarmOpacity - swarmOpacityRef.current) * fadeSpeed;

      const s = spreadRef.current;

      for (const p of particles) {
        p.angle += 0.003;

        const waveTime = elapsed * 0.5;
        const radialWave = Math.sin(p.baseRadius * 0.025 - waveTime) * 6;
        const angleWave = Math.sin(p.angle * 2 + waveTime * 0.7) * 4;
        const verticalWave = Math.sin(p.baseRadius * 0.02 - elapsed * 0.4 + p.phase) * 3;

        const radius = (p.baseRadius + radialWave + angleWave) * s;
        const tx = center.x + Math.cos(p.angle) * radius;
        const ty = center.y + Math.sin(p.angle) * radius + verticalWave;

        const moveSpeed = 0.06 + 0.04 * s;
        p.x += (tx - p.x) * moveSpeed;
        p.y += (ty - p.y) * moveSpeed;

        if (p.life < 1) {
          p.life += dt * 0.8;
          if (p.life > 1) p.life = 1;
        }

        const rot = p.rotationOffset + elapsed * 0.3;
        const s2 = p.size * 1.2;
        ctx.save();
        ctx.globalAlpha = p.life * p.dotOpacity * maxOpacity * swarmOpacityRef.current;
        ctx.fillStyle = baseColor;
        ctx.translate(p.x, p.y);
        ctx.rotate(rot);
        ctx.beginPath();
        ctx.moveTo(0, -s2);
        ctx.lineTo(s2 * 0.866, s2 * 0.5);
        ctx.lineTo(-s2 * 0.866, s2 * 0.5);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [isLight]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
}
