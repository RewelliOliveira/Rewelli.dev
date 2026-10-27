"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

export const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const tags = {
  div: motion.div,
  li: motion.li,
  p: motion.p,
};

export function Reveal({
  children,
  as = "div",
  delay = 0,
  y = 16,
  scale = 1,
  duration = 0.5,
  onMount = false,
  className,
}: {
  children: ReactNode;
  as?: keyof typeof tags;
  delay?: number;
  y?: number;
  scale?: number;
  duration?: number;
  onMount?: boolean;
  className?: string;
}) {
  const Tag = tags[as];
  const visible = { opacity: 1, y: 0, scale: 1 };

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, scale }}
      {...(onMount
        ? { animate: visible }
        : { whileInView: visible, viewport: { once: true, margin: "-80px" } })}
      transition={{ duration, delay, ease: EASE_OUT }}
    >
      {children}
    </Tag>
  );
}
