"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import FlexCarousel, {
  type FlexCarouselItem,
} from "@/components/ui/flex-carousel";
import { useMediaQuery } from "@/lib/hooks";

export function ProjectRail({
  items,
  details,
  label,
  hint,
}: {
  items: FlexCarouselItem[];
  details: ReactNode[];
  label: string;
  hint: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-8">
      <div className="relative left-1/2 h-140 w-screen -translate-x-1/2">
        {isDesktop && (
          <FlexCarousel
            items={items}
            ariaLabel={label}
            preset="liquid"
            intro="rise"
            cardHeight={0.5}
            gap={12}
            squeeze={0.2}
            focusOnClick
            captions
            fit="natural"
            radius={0}
            lensWidth={0.74}
            lensHeight={1.18}
            tilt={62}
            roundness={1}
            bend={0.34}
            reach={0.38}
            curl="twist"
            dispersion={0.45}
            liquid={0}
            followCursor={false}
            autoplay={false}
            interval={4}
            captureWheel={false}
            onChange={() => setOpenIndex(null)}
            onSelect={(index) => setOpenIndex(index)}
          />
        )}
      </div>

      <p
        className="mt-2 text-center font-mono text-xs text-muted-foreground transition-opacity duration-300 data-hidden:opacity-0"
        data-hidden={openIndex !== null ? "" : undefined}
      >
        {hint}
      </p>

      <AnimatePresence mode="wait" initial={false}>
        {openIndex !== null && (
          <motion.div
            key={openIndex}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.35, ease: EASE_OUT }}
            className="mt-4"
          >
            {details[openIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
