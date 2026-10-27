"use client";

import { useState, type ReactNode } from "react";
import { motion } from "motion/react";
import { Tabs } from "radix-ui";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type ProjectTab = {
  id: string;
  label: string;
  count: number;
  content: ReactNode;
};

export function ProjectTabs({
  tabs,
  label,
}: {
  tabs: ProjectTab[];
  label: string;
}) {
  const [value, setValue] = useState(tabs[0]?.id);

  return (
    <Tabs.Root value={value} onValueChange={setValue} className="mt-8">
      <Tabs.List
        aria-label={label}
        className="flex gap-1 overflow-x-auto rounded-xl border bg-card p-1 scrollbar-none"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === value;
          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="relative flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:text-foreground"
            >
              {isActive && (
                <motion.span
                  layoutId="project-tab-active"
                  aria-hidden
                  className="absolute inset-0 rounded-lg bg-muted"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                />
              )}
              <span className="relative">{tab.label}</span>
              <span
                className={cn(
                  "relative rounded-full px-1.5 font-mono text-xs transition-colors",
                  isActive
                    ? "bg-highlight text-foreground dark:text-background"
                    : "text-muted-foreground",
                )}
              >
                {tab.count}
              </span>
            </Tabs.Trigger>
          );
        })}
      </Tabs.List>

      {tabs.map((tab) => {
        const isActive = tab.id === value;
        return (
          <Tabs.Content
            key={tab.id}
            value={tab.id}
            forceMount
            hidden={!isActive}
            className="mt-6 outline-none"
          >
            <motion.div
              initial={false}
              animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              {tab.content}
            </motion.div>
          </Tabs.Content>
        );
      })}
    </Tabs.Root>
  );
}
