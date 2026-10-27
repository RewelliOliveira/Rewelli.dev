"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { EASE_OUT } from "@/components/motion/reveal";
import CardSwap, { type CardSwapItem } from "@/components/ui/card-swap";
import { useMediaQuery } from "@/lib/hooks";

export function ProjectCarousel({
  items,
  details,
  label,
  hint,
}: {
  items: CardSwapItem[];
  details: ReactNode[];
  label: string;
  hint: string;
}) {
  const { resolvedTheme } = useTheme();
  const isMobile = !useMediaQuery("(min-width: 640px)");
  const [front, setFront] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="mt-6 sm:mt-8">
      <div className="h-70 w-full sm:h-[600px]">
        <CardSwap
          items={items}
          ariaLabel={label}
          theme={resolvedTheme === "light" ? "light" : "dark"}
          width={520}
          height={360}
          cardDistance={isMobile ? 30 : 60}
          verticalDistance={isMobile ? 35 : 70}
          depth={isMobile ? 60 : 90}
          skewAmount={isMobile ? 3 : 6}
          visibleCards={isMobile ? 2 : 4}
          cardRadius={18}
          speed={1}
          bounce={0.35}
          parallax={isMobile ? 0 : 0.5}
          hoverSpread={isMobile ? 0 : 0.12}
          dim={0.5}
          draggable
          wheel
          onChange={(index) => {
            setFront(index);
            setOpenIndex(null);
          }}
          onCardClick={(index) => {
            if (index === front) setOpenIndex((open) => (open === index ? null : index));
          }}
        />
      </div>

      <p
        className="mt-2 text-center font-mono text-xs text-muted-foreground transition-opacity duration-300 data-[hidden]:opacity-0"
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
