import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { Reveal } from "@/components/motion/reveal";
import { ProjectCarousel } from "./project-carousel";
import { ProjectRail } from "./project-rail";

export async function Projects() {
  const t = await getTranslations("projects");
  const shown = projects.filter((project) => project.image);
  const slugs = shown.map((project) => project.slug);

  return (
    <section id="projects" aria-labelledby="projects-title" className="scroll-mt-8">
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
          slugs={slugs}
          items={shown.map((project) => ({
            image: project.image,
            alt: t("preview", { name: project.name }),
            title: project.name,
          }))}
        />
      </div>
      <div className="hidden lg:block">
        <ProjectRail
          label={t("carouselLabel")}
          hint={t("railHint")}
          slugs={slugs}
          items={shown.map((project) => ({
            src: project.image ?? "",
            alt: t("preview", { name: project.name }),
            title: project.name,
          }))}
        />
      </div>
    </section>
  );
}
