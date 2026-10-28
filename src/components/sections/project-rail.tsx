"use client";

import { useEffect } from "react";
import {
  projectHref,
  useProjectTransition,
} from "@/components/project/project-transition";
import FlexCarousel, {
  type FlexCarouselItem,
} from "@/components/ui/flex-carousel";
import { useRouter } from "@/i18n/navigation";
import { useMediaQuery } from "@/lib/hooks";

export function ProjectRail({
  items,
  slugs,
  label,
  hint,
}: {
  items: FlexCarouselItem[];
  slugs: string[];
  label: string;
  hint: string;
}) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const router = useRouter();
  const { open } = useProjectTransition();

  useEffect(() => {
    if (isDesktop) slugs.forEach((slug) => router.prefetch(projectHref(slug)));
  }, [isDesktop, slugs, router]);

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
            focusOnClick={false}
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
            wheel={false}
            onSelect={(index, item, rect) => open(slugs[index], item.src, rect)}
          />
        )}
      </div>

      <p className="mt-2 text-center font-mono text-xs text-muted-foreground">
        {hint}
      </p>
    </div>
  );
}
