import Image from "next/image";
import { ArrowUpRight, ExternalLink, GitBranch } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { projects, type Project } from "@/data/projects";
import type { Locale } from "@/i18n/routing";
import { localize } from "@/lib/localized";
import { getDomain, getRepoName, getStackNames } from "@/lib/projects";
import { cn } from "@/lib/utils";

export async function Projects() {
  const locale = await getLocale();
  const t = await getTranslations("projects");

  return (
    <section aria-labelledby="projects-title">
      <div className="flex items-baseline justify-between gap-4">
        <h2 id="projects-title" className="font-heading text-3xl font-medium tracking-tight">
          {t("title")}
        </h2>
        <p className="font-mono text-sm text-muted-foreground">
          {t("count", { count: projects.length })}
        </p>
      </div>
      <ol className="mt-8 space-y-6">
        {projects.map((project, index) => (
          <li key={project.slug}>
            <ProjectPanel project={project} index={index} locale={locale} />
          </li>
        ))}
      </ol>
    </section>
  );
}

async function ProjectPanel({
  project,
  index,
  locale,
}: {
  project: Project;
  index: number;
  locale: Locale;
}) {
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");
  const newTab = <span className="sr-only">{tCommon("newTab")}</span>;

  const preview = (
    <Image
      src={project.image}
      alt={t("preview", { name: project.name })}
      fill
      sizes="(min-width: 768px) 460px, 100vw"
      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
    />
  );

  return (
    <article className="overflow-hidden rounded-xl border bg-card text-card-foreground">
      <div className="flex items-center gap-3 border-b px-4 py-2.5 font-mono text-xs text-muted-foreground">
        <span className="text-foreground">{String(index + 1).padStart(2, "0")}</span>
        <span>{t("label")}</span>
        {project.featured && (
          <span className="ml-auto rounded-full border border-primary/40 bg-primary/10 px-2 py-0.5 text-primary">
            {t("featured")}
          </span>
        )}
      </div>

      <div className="grid gap-6 p-4 md:grid-cols-[1.15fr_1fr] md:gap-8 md:p-5">
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block aspect-[16/10] overflow-hidden rounded-lg border bg-muted"
          >
            {preview}
            <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-md bg-background/90 px-2 py-1 text-xs font-medium text-foreground shadow-sm backdrop-blur">
              {t("openSite")}
              <ArrowUpRight className="size-3.5" aria-hidden />
            </span>
            {newTab}
          </a>
        ) : (
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg border bg-muted">
            {preview}
          </div>
        )}

        <div className="min-w-0">
          <h3 className="font-heading text-2xl font-medium tracking-tight">{project.name}</h3>
          <p className="mt-1.5 text-muted-foreground">{localize(project.description, locale)}</p>

          <dl className="mt-5 grid grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] gap-x-4 gap-y-3 border-t pt-5 text-sm">
            <dt className="text-muted-foreground">{t("site")}</dt>
            <dd className="min-w-0 font-mono">
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex max-w-full items-center gap-1.5 hover:text-primary"
                >
                  <span className="truncate">{getDomain(project.url)}</span>
                  <ExternalLink className="size-3.5 shrink-0" aria-hidden />
                  {newTab}
                </a>
              ) : (
                <span className="text-muted-foreground">—</span>
              )}
            </dd>

            <dt className="text-muted-foreground">{t("status")}</dt>
            <dd className="flex items-center gap-2">
              <span
                aria-hidden
                className={cn(
                  "size-2 rounded-full",
                  project.url ? "bg-online" : "bg-muted-foreground/50",
                )}
              />
              {project.url ? t("online") : t("codeOnly")}
            </dd>

            <dt className="text-muted-foreground">{t("year")}</dt>
            <dd className="font-mono">{project.year}</dd>

            <dt className="text-muted-foreground">{t("repo")}</dt>
            <dd className="min-w-0 font-mono">
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1.5 hover:text-primary"
              >
                <GitBranch className="size-3.5 shrink-0" aria-hidden />
                <span className="truncate">{getRepoName(project.repo)}</span>
                {newTab}
              </a>
            </dd>

            <dt className="text-muted-foreground">{t("builtWith")}</dt>
            <dd>{getStackNames(project.stacks).join(", ")}</dd>
          </dl>
        </div>
      </div>
    </article>
  );
}
