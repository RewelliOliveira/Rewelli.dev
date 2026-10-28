"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { motion } from "motion/react";
import { EASE_OUT } from "@/components/motion/reveal";
import { Link } from "@/i18n/navigation";
import { projectHref, useProjectTransition } from "./project-transition";

export function ProjectHeroImage({
  slug,
  src,
  alt,
  className,
}: {
  slug: string;
  src: string;
  alt: string;
  className?: string;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const { flight, land } = useProjectTransition();
  const waiting = flight?.slug === slug;
  const measured = Boolean(flight?.to);
  const [arrived] = useState(waiting);

  useEffect(() => {
    if (!waiting || measured) return;
    // Espera a navegação levar a página ao topo antes de medir o destino.
    let frame = requestAnimationFrame(() => {
      frame = requestAnimationFrame(() => {
        if (ref.current) land(slug, ref.current);
      });
    });
    return () => cancelAnimationFrame(frame);
  }, [waiting, measured, slug, land]);

  return (
    <motion.img
      ref={ref}
      src={src}
      alt={alt}
      className={className}
      initial={arrived ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: waiting ? 0 : 1, y: 0 }}
      transition={arrived ? { duration: 0 } : { duration: 0.7, delay: 0.15, ease: EASE_OUT }}
    />
  );
}

export function ProjectLink({
  slug,
  src,
  radius,
  className,
  children,
}: {
  slug: string;
  src: string;
  radius?: number;
  className?: string;
  children: ReactNode;
}) {
  const { open } = useProjectTransition();

  const onClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    const image = event.currentTarget.querySelector("img");
    open(slug, src, image?.getBoundingClientRect() ?? null, radius);
  };

  return (
    <Link href={projectHref(slug)} onClick={onClick} className={className}>
      {children}
    </Link>
  );
}
