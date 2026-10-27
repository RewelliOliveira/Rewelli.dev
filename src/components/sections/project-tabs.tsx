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
        className="flex gap-1 overflow-x-auto scrollbar-none"
      >
        {tabs.map((tab) => {
          const isActive = tab.id === value;
          return (
            <Tabs.Trigger
              key={tab.id}
              value={tab.id}
              className="relative flex shrink-0 items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors hover:text-foreground focus-visible:-outline-offset-2 data-[state=active]:text-foreground"
            >
              {isActive && (
                <motion.span
                  layoutId="project-tab-active"
                  aria-hidden
                  className="absolute inset-0 rounded-md bg-muted"
                  transition={{ duration: 0.35, ease: EASE_OUT }}
                />
              )}
              <span className="relative">{tab.label}</span>
              <span
                className={cn(
                  "relative font-mono text-xs tabular-nums transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground",
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
            className="mt-8 outline-none"
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
