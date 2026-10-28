import type { ReactNode } from "react";
import { ExternalLink, Lock } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getTranslations } from "next-intl/server";
import type { Project } from "@/data/projects";
import { brandColors } from "@/data/stacks";
import { getDomain, getRepoName, getStacks } from "@/lib/projects";
import { stackIconBrand, stackIconVars } from "@/lib/stack-color";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function Fact({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0 space-y-2">
      <dt className="font-mono text-xs text-muted-foreground">{label}</dt>
      <dd className="min-w-0 text-sm">{children}</dd>
    </div>
  );
}

export async function ProjectFacts({ project }: { project: Project }) {
  const t = await getTranslations("projects");
  const tCommon = await getTranslations("common");
  const newTab = <span className="sr-only">{tCommon("newTab")}</span>;

  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-7 lg:grid-cols-1">
      <Fact label={t("status")}>
        <span className="flex items-center gap-2">
          <span
            aria-hidden
            className={cn(
              "size-2 rounded-full",
              project.url ? "bg-online" : "bg-muted-foreground/50",
            )}
          />
          {project.url ? t("online") : t("codeOnly")}
        </span>
      </Fact>

      <Fact label={t("site")}>
        {project.url ? (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex max-w-full items-center gap-1.5 font-mono transition-colors hover:text-highlight-foreground"
          >
            <span className="truncate">{getDomain(project.url)}</span>
            <ExternalLink className="size-3.5 shrink-0" aria-hidden />
            {newTab}
          </a>
        ) : (
          <span className="text-muted-foreground">—</span>
        )}
      </Fact>

      <Fact label={t("repo", { count: project.repos.length })}>
        {project.repos.length > 0 ? (
          <ul className="space-y-1.5 font-mono">
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
      </Fact>

      <Fact label={t("builtWith")}>
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
      </Fact>
    </dl>
  );
}
