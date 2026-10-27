"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Tabs } from "radix-ui";

export type ProjectTab = {
  id: string;
  label: string;
  count: number;
  content: ReactNode;
};

export function ProjectTabs({ tabs, label }: { tabs: ProjectTab[]; label: string }) {
  return (
    <Tabs.Root defaultValue={tabs[0]?.id} className="mt-8">
      <Tabs.List
        aria-label={label}
        className="flex gap-1 overflow-x-auto rounded-xl border bg-card p-1 [scrollbar-width:none]"
      >
        {tabs.map((tab) => (
          <Tabs.Trigger
            key={tab.id}
            value={tab.id}
            className="flex shrink-0 items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-muted data-[state=active]:text-foreground"
          >
            {tab.label}
            <span className="font-mono text-xs text-muted-foreground">{tab.count}</span>
          </Tabs.Trigger>
        ))}
      </Tabs.List>

      {tabs.map((tab) => (
        <Tabs.Content key={tab.id} value={tab.id} className="mt-6 outline-none">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            {tab.content}
          </motion.div>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
