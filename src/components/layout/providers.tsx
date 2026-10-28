"use client";

import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { ProjectTransitionProvider } from "@/components/project/project-transition";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        <TooltipProvider delayDuration={300}>
          <ProjectTransitionProvider>{children}</ProjectTransitionProvider>
        </TooltipProvider>
      </MotionConfig>
    </ThemeProvider>
  );
}
