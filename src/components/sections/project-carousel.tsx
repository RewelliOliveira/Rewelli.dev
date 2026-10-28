"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  projectHref,
  useProjectTransition,
} from "@/components/project/project-transition";
import CardSwap, { type CardSwapItem } from "@/components/ui/card-swap";
import { useRouter } from "@/i18n/navigation";
import { useMediaQuery } from "@/lib/hooks";

export function ProjectCarousel({
  items,
  slugs,
  label,
  hint,
}: {
  items: CardSwapItem[];
  slugs: string[];
  label: string;
  hint: string;
}) {
  const { resolvedTheme } = useTheme();
  const isMobile = !useMediaQuery("(min-width: 640px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();
  const { open } = useProjectTransition();
  const [front, setFront] = useState(0);

  useEffect(() => {
    if (!isDesktop) slugs.forEach((slug) => router.prefetch(projectHref(slug)));
  }, [isDesktop, slugs, router]);

  return (
    <div className="mt-6 sm:mt-8">
      <div className="h-70 w-full sm:h-150">
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
          onChange={setFront}
          onCardClick={(index, rect) => {
            const image = items[index]?.image;
            if (index === front && image) open(slugs[index], image, rect, 12);
          }}
        />
      </div>

      <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}
