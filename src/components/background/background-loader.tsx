"use client";

import dynamic from "next/dynamic";

const AnimatedBackground = dynamic(() => import("./animated-background"), {
  ssr: false,
});

export function BackgroundLoader() {
  return <AnimatedBackground />;
}
