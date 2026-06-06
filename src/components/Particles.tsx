"use client";
import { useEffect, useRef } from "react";

export const Particles = ({ count = 80, color = "#ffffff" }: { count?: number; color?: string }) => {
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
      r: Math.random() * 1.6 + 0.4,
      a: 0.4 + Math.random() * 0.6,
      scrollFactor: 0.3 + Math.random() * 1.0,
      xParallax: (Math.random() - 0.5) * 0.4, // subtle horizontal response per particle
    }));

    // Scroll-only movement: accumulate delta while scrolling; no motion when idle
    let lastScrollY = window.scrollY;
    let pendingY = 0; // accumulated pixel delta to apply on next frame
    const onScroll = () => {
      const current = window.scrollY;
      const dy = current - lastScrollY;
      lastScrollY = current;
      // invert direction (down scroll => upward particle movement)
      pendingY += -dy * 0.6; // responsiveness
    };

    const draw = () => {
      const { width, height } = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      const dyNormGlobal = pendingY / Math.max(1, height); // convert px to [0..1]

      for (const p of particles) {
        // apply only when there is scroll; particles remain stable otherwise
        if (dyNormGlobal !== 0) {
          p.y += dyNormGlobal * p.scrollFactor;
          p.x += dyNormGlobal * p.xParallax;
        }
        if (p.y < 0) p.y += 1;
        if (p.y > 1) p.y -= 1;
  if (p.x < 0) p.x += 1;
  if (p.x > 1) p.x -= 1;

        ctx.globalAlpha = p.a;
        ctx.beginPath();
        ctx.arc(p.x * width, p.y * height, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // reset pending delta after applying in this frame
      pendingY = 0;
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
  }, [count, color]);

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
