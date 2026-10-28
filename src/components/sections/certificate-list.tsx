"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { useMediaQuery } from "@/lib/hooks";

export type CertificateItem = {
  slug: string;
  name: string;
  issuer: string;
  date: string;
  image: string;
  url?: string;
};

const PREVIEW_WIDTH = 256;
const PREVIEW_HEIGHT = 160;
const PREVIEW_OFFSET = 24;

export function CertificateList({
  items,
  verifyLabel,
  newTabLabel,
}: {
  items: CertificateItem[];
  verifyLabel: string;
  newTabLabel: string;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const canHover = useMediaQuery("(hover: hover) and (pointer: fine)");
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 });
  const springY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 });

  function track(event: PointerEvent) {
    const rect = listRef.current?.getBoundingClientRect();
    if (!rect) return;
    const left = event.clientX - rect.left + PREVIEW_OFFSET;
    x.set(Math.min(left, rect.width - PREVIEW_WIDTH));
    y.set(event.clientY - rect.top - PREVIEW_HEIGHT / 2);
  }

  function enter(event: PointerEvent) {
    track(event);
    springX.jump(x.get());
    springY.jump(y.get());
  }

  return (
    <div className="relative">
      <ul
        ref={listRef}
        onPointerEnter={canHover ? enter : undefined}
        onPointerMove={canHover ? track : undefined}
        onPointerLeave={() => setActive(null)}
        className="divide-y border-y"
      >
        {items.map((item, index) => {
          const content = (
            <>
              <div className="relative aspect-16/10 w-16 shrink-0 overflow-hidden rounded-sm border bg-card sm:hidden">
                <Image src={item.image} alt="" fill sizes="64px" className="object-contain" />
              </div>
              <p className="hidden font-mono text-sm text-muted-foreground sm:block">{item.date}</p>
              <div className="min-w-0">
                <h3 className="font-medium text-pretty transition-transform duration-300 ease-out sm:group-hover:translate-x-1">
                  {item.name}
                </h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  <span translate="no">{item.issuer}</span>
                  <span className="font-mono sm:hidden"> · {item.date}</span>
                </p>
              </div>
              {item.url && (
                <span className="inline-flex items-center gap-1 self-center text-sm font-medium text-muted-foreground transition-colors group-hover:text-highlight-foreground">
                  <span className="hidden sm:inline">{verifyLabel}</span>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden
                  />
                  <span className="sr-only">{newTabLabel}</span>
                </span>
              )}
            </>
          );
          const rowClass =
            "group grid grid-cols-[4rem_1fr_auto] items-center gap-x-4 py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-start sm:gap-x-6 sm:py-5";

          return (
            <motion.li
              key={item.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: index * 0.06, ease: EASE_OUT }}
              onPointerEnter={() => setActive(item.slug)}
            >
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className={rowClass}>
                  {content}
                </a>
              ) : (
                <div className={rowClass}>{content}</div>
              )}
            </motion.li>
          );
        })}
      </ul>

      {canHover && (
        <AnimatePresence>
          {active && (
            <motion.div
              aria-hidden
              style={{ x: springX, y: springY, width: PREVIEW_WIDTH, height: PREVIEW_HEIGHT }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2, ease: EASE_OUT }}
              className="pointer-events-none absolute top-0 left-0 z-10 overflow-hidden rounded-lg border bg-card shadow-xl"
            >
              {items.map((item) => (
                <motion.div
                  key={item.slug}
                  initial={false}
                  animate={{ opacity: item.slug === active ? 1 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-0"
                >
                  <Image src={item.image} alt="" fill sizes={`${PREVIEW_WIDTH}px`} className="object-contain" />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
