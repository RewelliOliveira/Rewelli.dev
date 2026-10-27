"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { EASE_OUT } from "@/components/motion/reveal";
import { stacks, type StackId } from "@/data/stacks";
import { stackIconBrand, stackIconVars } from "@/lib/stack-color";
import { cn } from "@/lib/utils";

export function StackShowcase() {
  const t = useTranslations("stacks");
  const [activeId, setActiveId] = useState<StackId>(stacks[0].id);
  const active =
    stacks.find((stack) => stack.id === activeId) ?? stacks[0];
  const ActiveIcon = active.icon;

  return (
    <div className="mt-8 grid gap-4 rounded-xl border bg-card p-3 md:grid-cols-2 md:gap-5 md:p-4">
      <ul aria-label={t("list")} className="grid grid-cols-5 gap-2 self-start">
        {stacks.map(({ id, name, icon: Icon, color }) => {
          const isActive = id === activeId;
          return (
            <li key={id}>
              <button
                type="button"
                aria-label={name}
                aria-pressed={isActive}
                onMouseEnter={() => setActiveId(id)}
                onFocus={() => setActiveId(id)}
                onClick={() => setActiveId(id)}
                className={cn(
                  "relative flex aspect-square w-full items-center justify-center rounded-md border text-foreground transition-colors duration-200",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="stack-active"
                    aria-hidden
                    className="absolute -inset-px rounded-md border border-foreground/25 bg-muted"
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  />
                )}
                <Icon
                  className={cn(
                    "relative size-5 sm:size-6",
                    stackIconBrand,
                  )}
                  style={stackIconVars(color)}
                  aria-hidden
                />
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="order-first flex min-h-48 items-center rounded-md border bg-muted p-6 md:order-0"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex items-center gap-5"
          >
            <ActiveIcon
              className={cn("size-16 shrink-0 sm:size-20", stackIconBrand)}
              style={stackIconVars(active.color)}
              aria-hidden
            />
            <p className="font-heading text-2xl font-medium tracking-tight sm:text-3xl">
              {active.name}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
