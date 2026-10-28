import { ExternalLink, Lock } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getLocale, getTranslations } from "next-intl/server";
import { projects, type Project } from "@/data/projects";
import { brandColors } from "@/data/stacks";
import type { Locale } from "@/i18n/routing";
import { localize } from "@/lib/localized";
import { getDomain, getRepoName, getStacks } from "@/lib/projects";
import { stackIconBrand, stackIconVars } from "@/lib/stack-color";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/motion/reveal";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProjectCarousel } from "./project-carousel";
import { ProjectRail } from "./project-rail";

export async function Projects() {
  const locale = await getLocale();
  const t = await getTranslations("projects");
  const shown = projects.filter((project) => project.image);
  const details = shown.map((project) => (
    <ProjectPanel key={project.slug} project={project} locale={locale} />
  ));

  return (
    <section aria-labelledby="projects-title">
      <Reveal className="flex items-baseline justify-between gap-4">
        <h2
          id="projects-title"
          className="font-heading text-3xl font-medium tracking-tighter sm:text-4xl"
        >
          {t("title")}
        </h2>
        <p className="font-mono text-sm text-muted-foreground tabular-nums">
          {t("count", { count: shown.length })}
        </p>
      </Reveal>
      <div className="lg:hidden">
        <ProjectCarousel
          label={t("carouselLabel")}
          hint={t("hint")}
          items={shown.map((project) => ({
            image: project.image,
            alt: t("preview", { name: project.name }),
            title: project.name,
          }))}
          details={details}
        />
      </div>
      <div className="hidden lg:block">
        <ProjectRail
          label={t("carouselLabel")}
          hint={t("railHint")}
          items={shown.map((project) => ({
            src: project.image ?? "",
            alt: t("preview", { name: project.name }),
            title: project.name,
          }))}
          details={details}
        />
      </div>
    </section>
  );
}

async function ProjectPanel({
  project,
  locale,
}: {
  project: Project;
  locale: Locale;
}) {
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");
  const newTab = <span className="sr-only">{tCommon("newTab")}</span>;

  return (
    <article className="overflow-hidden rounded-xl border bg-card text-card-foreground transition-colors duration-300 hover:border-highlight/40">
      <div className="grid gap-6 p-4 md:grid-cols-[1fr_1.1fr] md:gap-8 md:p-5">
        <div className="min-w-0">
          <h3 className="font-heading text-xl font-medium tracking-tight">
            {project.name}
          </h3>
          <p className="mt-1.5 text-muted-foreground">
            {localize(project.description, locale)}
          </p>
        </div>

        <dl className="grid grid-cols-[minmax(0,5.5rem)_minmax(0,1fr)] gap-x-3 sm:grid-cols-[minmax(0,7.5rem)_minmax(0,1fr)] sm:gap-x-4 gap-y-3 border-t pt-5 text-sm md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <dt className="text-muted-foreground">{t("site")}</dt>
          <dd className="min-w-0 font-mono">
            {project.url ? (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex max-w-full items-center gap-1.5 transition-colors hover:text-highlight-foreground"
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

          <dt className="text-muted-foreground">
            {t("repo", { count: project.repos.length })}
          </dt>
          <dd className="min-w-0 font-mono">
            {project.repos.length > 0 ? (
              <ul className="space-y-1.5">
                {project.repos.map((repo) => (
                  <li key={repo.url}>
                    <a
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex max-w-full items-center gap-1.5 transition-colors hover:text-highlight-foreground"
                    >
                      {repo.part ? (
                        <span className="shrink-0 rounded-sm border px-1.5 text-xs text-muted-foreground">
                          {t(`parts.${repo.part}`)}
                        </span>
                      ) : (
                        <SiGithub
                          className={cn("size-3.5 shrink-0", stackIconBrand)}
                          style={stackIconVars(brandColors.github)}
                          aria-hidden
                        />
                      )}
                      <span className="truncate">
                        {repo.part
                          ? getRepoName(repo.url).split("/").pop()
                          : getRepoName(repo.url)}
                      </span>
                      {newTab}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-muted-foreground">
                <Lock className="size-3.5 shrink-0" aria-hidden />
                {t("private")}
              </span>
            )}
          </dd>

          <dt className="text-muted-foreground">{t("builtWith")}</dt>
          <dd>
            <ul className="flex flex-wrap gap-1.5">
              {getStacks(project.stacks).map(({ id, name, icon: Icon, color }) => (
                <li key={id}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span
                        tabIndex={0}
                        aria-label={name}
                        className="flex size-8 items-center justify-center rounded-md border text-foreground transition-colors hover:border-highlight/50 hover:bg-highlight-soft focus-visible:bg-highlight-soft"
                      >
                        <Icon
                          className={cn("size-4", stackIconBrand)}
                          style={stackIconVars(color)}
                          aria-hidden
                        />
                      </span>
                    </TooltipTrigger>
                    <TooltipContent sideOffset={4}>{name}</TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </dd>
        </dl>
      </div>
    </article>
  );
}
