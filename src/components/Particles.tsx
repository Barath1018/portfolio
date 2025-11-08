"use client";
import { useEffect, useRef } from "react";

export const Particles = ({
  count = 5,
  color = "#ffffff",
  speed = 0.5, // CHANGED: Slower default speed
  boost = 1.5, // CHANGED: Default scroll boost is now 1.5
}: {
  count?: number;
  color?: string;
  speed?: number;
  boost?: number;
}) => {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.scale(dpr, dpr);
    };

    const onResize = () => {
      // reset transform before resize scale to avoid compounding
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      resize();
    };

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 2 + 0.5,
      a: 0.3 + Math.random() * 0.7,
      // CHANGED: Made fall speed slower and less random
      fallSpeed: 0.001 + Math.random() * 0.005,
      // CHANGED: Made horizontal drift gentler and centered
      drift: (Math.random() - 0.5) * 0.001,
      scrollBoost: 0.04 + Math.random() * 0.02,
      // CHANGED: Reduced wobble for a more vertical "snow" fall
      wobbleAmp: 0.005 + Math.random() * 0.01,
      wobbleFreq: 0.025 + Math.random() * 0.025,
      t: Math.random() * Math.PI * 0.5,
    }));

    // Track scroll velocity to momentarily accelerate snowfall when scrolling
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0; // px per frame equivalent (decays)
    const onScroll = () => {
      const current = window.scrollY;
      const dy = current - lastScrollY;
      lastScrollY = current;
      scrollVelocity = dy; // latest delta; will decay in animation loop
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      // Convert scrollVelocity to a normalized boost (positive or negative)
      const scrollNorm = Math.max(-60, Math.min(60, scrollVelocity)) / 60; // clamp to [-1,1]

      for (const p of particles) {
        // time component for wobble
        p.t += p.wobbleFreq * 0.01;
        // Base fall + scroll acceleration (scrolling down increases boost so they fall faster)
        // This calculation is the same, but the default 'speed' and 'boost' props are new
        const accel =
          p.fallSpeed * speed +
          Math.max(0, scrollNorm) * p.scrollBoost * 0.03 * boost;
        p.y += accel;
        // gentle horizontal drift + wobble
        p.x += p.drift + Math.sin(p.t) * p.wobbleAmp * 0.2;

        // wrap around
        if (p.y > 1) p.y -= 1;
        if (p.y < 0) p.y += 1;
        if (p.x < 0) p.x += 1;
        if (p.x > 1) p.x -= 1;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // decay scroll velocity toward 0 for smooth easing
      scrollVelocity *= 0.9;
      animationFrame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
    };
  }, [count, color, speed, boost]);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-40 pointer-events-none"
      style={{ width: "100%", height: "100%" }}
      aria-hidden="true"
    />
  );
};

export default Particles;