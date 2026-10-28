"use client";

import { useTheme } from "next-themes";
import { useCallback } from "react";
import { flushSync } from "react-dom";

const STYLE_ID = "theme-transition-styles";

export type AnimationStart = "top-left" | "top-right" | "bottom-left" | "bottom-right";

const CLIP_POSITIONS: Record<AnimationStart, string> = {
  "top-left": "0% 0%",
  "top-right": "100% 0%",
  "bottom-left": "0% 100%",
  "bottom-right": "100% 100%",
};

// Troca o tema usando a View Transitions API com a animação circular do Skiper26
export const useThemeToggle = ({ start = "top-right" }: { start?: AnimationStart } = {}) => {
  const { resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    // flushSync garante que a classe .dark já esteja no DOM quando a transição tira o snapshot
    const switchTheme = () => flushSync(() => setTheme(next));

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!document.startViewTransition || reducedMotion) {
      switchTheme();
      return;
    }

    let styleElement = document.getElementById(
      STYLE_ID,
    ) as HTMLStyleElement | null;
    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = STYLE_ID;
      document.head.appendChild(styleElement);
    }
    styleElement.textContent = createAnimation(start);

    document.startViewTransition(switchTheme);
  }, [resolvedTheme, setTheme, start]);

  return { toggleTheme };
};

const createAnimation = (start: AnimationStart) => {
  const position = CLIP_POSITIONS[start];

  return `
    ::view-transition-group(root) {
      animation-duration: 1s;
      animation-timing-function: var(--expo-out);
    }

    ::view-transition-new(root) {
      animation-name: reveal-${start};
    }

    ::view-transition-old(root),
    .dark::view-transition-old(root) {
      animation: none;
      z-index: -1;
    }

    @keyframes reveal-${start} {
      from {
        clip-path: circle(0% at ${position});
      }
      to {
        clip-path: circle(150% at ${position});
      }
    }
  `;
};

/**
 * Skiper 26 Theme_buttons_002 — React + CSS + transition view api  https://developer.chrome.com/docs/web-platform/view-transitions/
 * Orignal concept from rudrodip
 * Inspired by from https://github.com/rudrodip/theme-toggle-effect
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the rudrodip . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.me
 * Twitter: https://x.com/Gur__vi
 */
