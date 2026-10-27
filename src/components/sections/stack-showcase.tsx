"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { EASE_OUT } from "@/components/motion/reveal";
import { stacks, type StackId } from "@/data/stacks";
import { cn } from "@/lib/utils";

export function StackShowcase({
  usage,
  totalProjects,
}: {
  usage: Record<string, number>;
  totalProjects: number;
}) {
  const t = useTranslations("stacks");
  const visibleStacks = stacks.filter((stack) => (usage[stack.id] ?? 0) > 0);
  const [activeId, setActiveId] = useState<StackId>(visibleStacks[0].id);
  const active = visibleStacks.find((stack) => stack.id === activeId) ?? visibleStacks[0];
  const ActiveIcon = active.icon;

  return (
    <div className="mt-8 grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2 md:gap-6 md:p-5">
      <ul aria-label={t("list")} className="grid grid-cols-5 gap-2 self-start">
        {visibleStacks.map(({ id, name, icon: Icon }) => {
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
                  "relative flex aspect-square w-full items-center justify-center rounded-lg border transition-[translate,color] duration-200",
                  isActive
                    ? "-translate-y-1 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="stack-active"
                    aria-hidden
                    className="absolute -inset-px rounded-lg border border-primary bg-muted"
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                  />
                )}
                <Icon className="relative size-5 sm:size-6" aria-hidden />
              </button>
            </li>
          );
        })}
      </ul>

      <div
        aria-live="polite"
        className="order-first flex min-h-48 items-center rounded-lg bg-muted p-6 md:order-none"
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
            <ActiveIcon className="size-16 shrink-0 sm:size-20" aria-hidden />
            <div>
              <p className="font-heading text-2xl font-medium tracking-tight">{active.name}</p>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                {t(`categories.${active.category}`)} ·{" "}
                {t("usage", { count: usage[active.id] ?? 0, total: totalProjects })}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
