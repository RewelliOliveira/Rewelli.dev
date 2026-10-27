"use client";

import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import { usePageVisible, usePrefersReducedMotion } from "@/lib/hooks";

export const BACKGROUND_SETTINGS = {
  count: 116,
  mobileCount: 50,
  mobileBreakpoint: 640,
  speedMin: 0.4,
  speedMax: 0.7,
  wind: 0,
  windVariation: 0.8,
  sizeMin: 1,
  sizeMax: 1,
  opacityMin: 0.15,
  opacityMax: 0.5,
  colorVar: "--primary",
  maxDpr: 2,
};

type Flake = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  phase: number;
  sway: number;
  alpha: number;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const colorRef = useRef("transparent");
  const drawRef = useRef<() => void>(() => {});
  const { resolvedTheme } = useTheme();
  const reduceMotion = usePrefersReducedMotion();
  const pageVisible = usePageVisible();
  const animate = !reduceMotion && pageVisible;

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      colorRef.current = getComputedStyle(document.documentElement)
        .getPropertyValue(BACKGROUND_SETTINGS.colorVar)
        .trim();
      drawRef.current();
    });
    return () => cancelAnimationFrame(frame);
  }, [resolvedTheme]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const settings = BACKGROUND_SETTINGS;
    const dpr = Math.min(window.devicePixelRatio || 1, settings.maxDpr);
    let width = 0;
    let height = 0;
    let flakes: Flake[] = [];
    let raf = 0;

    function build() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = Math.floor(width * dpr);
      canvas!.height = Math.floor(height * dpr);
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count =
        width < settings.mobileBreakpoint ? settings.mobileCount : settings.count;
      if (flakes.length === count) return;
      flakes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: rand(settings.sizeMin, settings.sizeMax),
        vy: rand(settings.speedMin, settings.speedMax),
        vx: rand(-1, 1),
        phase: Math.random() * Math.PI * 2,
        sway: rand(0.2, 0.9),
        alpha: rand(settings.opacityMin, settings.opacityMax),
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      ctx!.fillStyle = colorRef.current;
      for (const flake of flakes) {
        ctx!.globalAlpha = flake.alpha;
        ctx!.beginPath();
        ctx!.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
    }

    function loop(time: number) {
      for (const flake of flakes) {
        flake.y += flake.vy;
        flake.x +=
          settings.wind +
          flake.vx * settings.windVariation +
          Math.sin(time * 0.0012 + flake.phase) * flake.sway;
        if (flake.y - flake.r > height) {
          flake.y = -flake.r;
          flake.x = Math.random() * width;
        }
        if (flake.x < -flake.r) flake.x = width + flake.r;
        else if (flake.x > width + flake.r) flake.x = -flake.r;
      }
      draw();
      raf = requestAnimationFrame(loop);
    }

    function handleResize() {
      build();
      draw();
    }

    build();
    draw();
    drawRef.current = draw;
    if (animate) raf = requestAnimationFrame(loop);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      drawRef.current = () => {};
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 size-full"
    />
  );
}
