"use client";

import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/reveal";
import { useNowMonth } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export type ExperienceItem = {
  id: string;
  start: string;
  end?: string;
  kind: "work" | "education";
  role: string;
  place: string;
  summary: string;
};

const toMonth = (date: string) => {
  const [month, year] = date.split("/").map(Number);
  return year * 12 + month - 1;
};

export function ExperienceColumns({ items }: { items: ExperienceItem[] }) {
  const t = useTranslations("experience");
  const now = useNowMonth();

  const duration = (months: number) => {
    const y = Math.floor(months / 12);
    const m = months % 12;
    return [y && t("years", { count: y }), m && t("months", { count: m })].filter(Boolean).join(" · ");
  };

  const columns = [
    { kind: "work", label: t("legendWork") },
    { kind: "education", label: t("legendEducation") },
  ] as const;

  return (
    <Reveal className="grid gap-10 sm:grid-cols-2 sm:gap-0">
      {columns.map((column, columnIndex) => {
        const columnItems = items.filter((item) => item.kind === column.kind);

        return (
          <div key={column.kind} className={cn(columnIndex === 0 ? "sm:pr-8" : "sm:border-l sm:pl-8")}>
            <h3 className="pb-3 font-mono text-xs tracking-wider text-muted-foreground uppercase">{column.label}</h3>

            <ol className="group/list border-b">
              {columnItems.map((item) => {
                const isCurrent = !item.end;
                const start = toMonth(item.start);
                const end = item.end ? toMonth(item.end) : now;
                const planned = now !== null && item.end !== undefined && toMonth(item.end) > now;

                return (
                  <li
                    key={item.id}
                    className="group border-t py-5 transition-opacity duration-300 group-hover/list:not-hover:opacity-45"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <p className="font-medium text-pretty transition-colors group-hover:text-highlight-foreground">
                          {item.role}
                        </p>
                        <p className="text-sm text-muted-foreground">{item.place}</p>
                      </div>
                      {isCurrent && (
                        <span aria-hidden className="relative mt-1.5 size-2.5 shrink-0">
                          <span className="absolute inset-0 animate-ping rounded-full bg-primary/50 motion-reduce:animate-none" />
                          <span className="absolute inset-0 rounded-full border-2 border-background bg-primary" />
                        </span>
                      )}
                    </div>

                    <p className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted-foreground">
                      <span>
                        {item.start} — {item.end ?? t("present")}
                      </span>
                      {end !== null && <span>· {duration(end - start + 1)}</span>}
                      {planned && (
                        <span className="rounded-full border border-dashed border-primary/50 px-1.5 text-[0.6875rem] text-primary">
                          {t("legendPlanned")}
                        </span>
                      )}
                    </p>

                    <p className="mt-3 max-w-prose text-sm text-pretty text-muted-foreground">{item.summary}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        );
      })}
    </Reveal>
  );
}
