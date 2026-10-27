"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export type TimelineItem = {
  id: string;
  period: string;
  current: boolean;
  role: string;
  place: string;
  summary: string;
};

export function ExperienceTimeline({ items }: { items: TimelineItem[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 55%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });

  return (
    <ol ref={ref} className="relative">
      <div
        aria-hidden
        className="absolute top-2 bottom-0 left-[0.4375rem] w-px overflow-hidden bg-border [mask-image:linear-gradient(to_bottom,black_80%,transparent)] sm:left-[calc(8rem+1.5rem+0.4375rem)]"
      >
        <motion.div style={{ scaleY }} className="absolute inset-0 origin-top bg-primary" />
      </div>
      {items.map((item, index) => (
        <motion.li
          key={item.id}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, delay: index * 0.06, ease: EASE_OUT }}
          className="group relative grid grid-cols-[0.9375rem_1fr] gap-x-4 pb-8 last:pb-0 sm:grid-cols-[8rem_0.9375rem_1fr] sm:gap-x-6 sm:pb-10"
        >
          <p className="col-start-2 row-start-1 font-mono text-xs text-muted-foreground sm:col-start-1 sm:pt-px sm:text-sm">
            {item.period}
          </p>
          <span
            aria-hidden
            className="relative col-start-1 row-start-1 mt-px grid size-[0.9375rem] place-items-center rounded-full border-2 border-border bg-background transition-colors duration-300 group-hover:border-primary sm:col-start-2 sm:mt-0.5"
          >
            {item.current && (
              <span className="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:animate-none" />
            )}
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.4, delay: index * 0.06 + 0.2, ease: EASE_OUT }}
              className={cn(
                "size-[0.3125rem] rounded-full",
                item.current ? "bg-primary" : "bg-muted-foreground/60",
              )}
            />
          </span>
          <div className="col-start-2 mt-1.5 min-w-0 sm:col-start-3 sm:row-start-1 sm:mt-0">
            <h3 className="font-medium text-pretty">
              {item.role}
              <span className="text-muted-foreground"> · {item.place}</span>
            </h3>
            <p className="mt-1 text-sm text-pretty text-muted-foreground">{item.summary}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
