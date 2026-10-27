"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
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
  const [activeId, setActiveId] = useState<StackId>(stacks[0].id);
  const active = stacks.find((stack) => stack.id === activeId) ?? stacks[0];
  const ActiveIcon = active.icon;

  return (
    <div className="mt-8 grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2 md:gap-6 md:p-5">
      <ul aria-label={t("list")} className="grid grid-cols-5 gap-2 self-start">
        {stacks.map(({ id, name, icon: Icon }) => {
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
                  "flex aspect-square w-full items-center justify-center rounded-lg border transition-[translate,color,border-color,background-color] duration-200",
                  isActive
                    ? "-translate-y-1 border-foreground/30 bg-muted text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                <Icon className="size-5 sm:size-6" aria-hidden />
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
