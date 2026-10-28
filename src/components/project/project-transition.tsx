"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { motion } from "motion/react";
import { useRouter } from "@/i18n/navigation";
import { usePrefersReducedMotion } from "@/lib/hooks";

type Box = {
  left: number;
  top: number;
  width: number;
  height: number;
  borderRadius: number;
};

type Flight = {
  slug: string;
  src: string;
  from: Box;
  to: Box | null;
  veiled: boolean;
};

type ProjectTransition = {
  flight: Flight | null;
  open: (slug: string, src: string, from: DOMRect | null, radius?: number) => void;
  land: (slug: string, element: HTMLElement) => void;
};

const FLIGHT_EASE = [0.76, 0, 0.24, 1] as const;

const Context = createContext<ProjectTransition | null>(null);

export function projectHref(slug: string) {
  return `/projects/${slug}`;
}

export function ProjectTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();
  const [flight, setFlight] = useState<Flight | null>(null);
  const timeout = useRef(0);

  const open = useCallback<ProjectTransition["open"]>(
    (slug, src, from, radius = 0) => {
      if (reducedMotion || !from || !from.width || !from.height) {
        router.push(projectHref(slug));
        return;
      }
      setFlight({
        slug,
        src,
        from: {
          left: from.left,
          top: from.top,
          width: from.width,
          height: from.height,
          borderRadius: radius,
        },
        to: null,
        veiled: false,
      });
    },
    [reducedMotion, router],
  );

  const land = useCallback<ProjectTransition["land"]>((slug, element) => {
    const rect = element.getBoundingClientRect();
    const to: Box = {
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      borderRadius: parseFloat(getComputedStyle(element).borderTopLeftRadius) || 0,
    };
    setFlight((current) =>
      current && current.slug === slug && !current.to ? { ...current, to } : current,
    );
  }, []);

  const onVeiled = () => {
    if (!flight || flight.veiled) return;
    setFlight({ ...flight, veiled: true });
    router.push(projectHref(flight.slug));
    // Se a página não chegar a medir o destino, desfaz a transição.
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => {
      setFlight((current) => (current && !current.to ? null : current));
    }, 3000);
  };

  useEffect(() => () => window.clearTimeout(timeout.current), []);

  const value = useMemo(() => ({ flight, open, land }), [flight, open, land]);
  const flying = Boolean(flight?.veiled && flight.to);

  return (
    <Context.Provider value={value}>
      {children}
      {flight && (
        <div aria-hidden className="pointer-events-none fixed inset-0 z-100">
          <motion.div
            className="absolute inset-0 bg-background"
            initial={{ opacity: 0 }}
            animate={{ opacity: flying ? 0 : 1 }}
            transition={
              flying
                ? { duration: 0.5, delay: 0.25, ease: "easeOut" }
                : { duration: 0.25, ease: "easeOut" }
            }
            onAnimationComplete={onVeiled}
          />
          <motion.img
            src={flight.src}
            alt=""
            draggable={false}
            className="absolute object-cover"
            initial={flight.from}
            animate={flying && flight.to ? flight.to : flight.from}
            transition={{ duration: 0.85, ease: FLIGHT_EASE }}
            onAnimationComplete={() => {
              if (flying) setFlight(null);
            }}
          />
        </div>
      )}
    </Context.Provider>
  );
}

export function useProjectTransition() {
  const value = useContext(Context);
  if (!value) throw new Error("useProjectTransition precisa do ProjectTransitionProvider");
  return value;
}
