import type { CSSProperties } from "react";

const ACTIVE_SURFACE = { light: "#f0f0f2", dark: "#1a1a1d" } as const;
const MIN_CONTRAST = 3;

function luminance(hex: string) {
  const value = parseInt(hex.slice(1), 16);
  const [r, g, b] = [value >> 16, (value >> 8) & 255, value & 255].map((channel) => {
    const c = channel / 255;
    return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function contrastRatio(a: string, b: string) {
  const [high, low] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (high + 0.05) / (low + 0.05);
}

export function stackIconVars(color: string): CSSProperties {
  const pick = (surface: string) =>
    contrastRatio(color, surface) >= MIN_CONTRAST ? color : undefined;
  return {
    "--icon-light": pick(ACTIVE_SURFACE.light),
    "--icon-dark": pick(ACTIVE_SURFACE.dark),
  } as CSSProperties;
}

export const stackIconBrand =
  "text-[var(--icon-light,currentColor)] dark:text-[var(--icon-dark,currentColor)]";