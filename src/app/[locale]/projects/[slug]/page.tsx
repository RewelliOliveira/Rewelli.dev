import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiGithub } from "react-icons/si";
import { getLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Reveal } from "@/components/motion/reveal";
import { ProjectFacts } from "@/components/project/project-facts";
import { ProjectHeroImage, ProjectLink } from "@/components/project/project-hero";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { localize } from "@/lib/localized";

const shown = projects.filter((project) => project.image);

function findProject(slug: string) {
  const index = shown.findIndex((project) => project.slug === slug);
  return index < 0 ? null : { project: shown[index], index };
}

function projectPath(locale: string, slug: string) {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return `${prefix}/projects/${slug}`;
}

export function generateStaticParams() {
  return shown.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[locale]/projects/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) return {};
  const locale = await getLocale();
  const { project } = found;
  const title = `${project.name} · ${profile.name}`;
  const description = localize(project.description, locale);

  return {
    title,
    description,
    alternates: {
      canonical: projectPath(locale, slug),
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, projectPath(l, slug)])),
        "x-default": projectPath(routing.defaultLocale, slug),
      },
    },
    openGraph: {
      type: "article",
      url: projectPath(locale, slug),
      title,
      description,
      images: project.image ? [project.image] : undefined,
    },
  };
}

export default async function ProjectPage({
  params,
}: PageProps<"/[locale]/projects/[slug]">) {
  const { slug } = await params;
  const found = findProject(slug);
  if (!found) notFound();

  const locale = await getLocale();
  const t = await getTranslations("project");
  const tProjects = await getTranslations("projects");
  const tCommon = await getTranslations("common");
  const { project, index } = found;
  const next = shown[(index + 1) % shown.length];
  const text = (value: Parameters<typeof localize>[0]) => localize(value, locale);
  const newTab = <span className="sr-only">{tCommon("newTab")}</span>;

  return (
    <div className="overflow-x-clip">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <main className="pb-16 sm:pb-24 md:pb-32">
          <Reveal onMount delay={0.3} y={8}>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-highlight-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden />
              {t("back")}
            </Link>
          </Reveal>

          <div className="mt-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6 sm:mt-14">
            <div className="min-w-0">
              <Reveal onMount delay={0.35} y={12}>
                <p className="font-mono text-sm text-muted-foreground tabular-nums">
                  {String(index + 1).padStart(2, "0")}
                  <span className="mx-1.5 opacity-50">/</span>
                  {String(shown.length).padStart(2, "0")}
                </p>
              </Reveal>
              <Reveal onMount delay={0.4} y={16}>
                <h1 className="mt-3 font-heading text-5xl font-medium tracking-tighter sm:text-7xl">
                  {project.name}
                </h1>
              </Reveal>
            </div>
            <Reveal onMount delay={0.5} y={12} className="flex flex-wrap gap-2">
              {project.url && (
                <Button asChild size="lg" className="px-3.5">
                  <a href={project.url} target="_blank" rel="noopener noreferrer">
                    {t("visit")}
                    <ArrowUpRight data-icon="inline-end" aria-hidden />
                    {newTab}
                  </a>
                </Button>
              )}
              {project.repos[0] && (
                <Button asChild size="lg" variant="outline" className="px-3.5">
                  <a href={project.repos[0].url} target="_blank" rel="noopener noreferrer">
                    <SiGithub data-icon="inline-start" aria-hidden />
                    {t("code")}
                    {newTab}
                  </a>
                </Button>
              )}
            </Reveal>
          </div>

          <Reveal onMount delay={0.45} y={12}>
            <p className="mt-6 max-w-2xl text-lg text-pretty text-muted-foreground sm:text-xl">
              {text(project.description)}
            </p>
          </Reveal>

          <ProjectHeroImage
            slug={project.slug}
            src={project.image ?? ""}
            alt={tProjects("preview", { name: project.name })}
            className="mt-10 aspect-16/10 w-full rounded-xl border bg-card object-cover sm:mt-14"
          />

          <div className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-24">
            <Reveal className="lg:sticky lg:top-10 lg:self-start">
              <ProjectFacts project={project} />
            </Reveal>

            <div className="space-y-20 sm:space-y-28">
              <section aria-labelledby="about-title">
                <Reveal>
                  <h2 id="about-title" className="font-mono text-sm text-muted-foreground">
                    {t("about")}
                  </h2>
                </Reveal>
                <div className="mt-6 max-w-2xl space-y-5">
                  {project.overview.map((paragraph, i) => (
                    <Reveal key={i} as="p" delay={i * 0.06} className="text-xl leading-relaxed text-pretty first:text-foreground not-first:text-muted-foreground sm:text-2xl sm:leading-relaxed">
                      {text(paragraph)}
                    </Reveal>
                  ))}
                </div>
              </section>

              <section aria-labelledby="highlights-title">
                <Reveal>
                  <h2 id="highlights-title" className="font-mono text-sm text-muted-foreground">
                    {t("highlights")}
                  </h2>
                </Reveal>
                <ol className="mt-6 grid gap-x-10 sm:grid-cols-2">
                  {project.highlights.map((highlight, i) => (
                    <Reveal
                      key={i}
                      as="li"
                      delay={(i % 2) * 0.08}
                      className="border-t py-6"
                    >
                      <span className="font-mono text-xs text-highlight-foreground tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="mt-3 font-heading text-lg font-medium tracking-tight">
                        {text(highlight.title)}
                      </h3>
                      <p className="mt-1.5 text-pretty text-muted-foreground">
                        {text(highlight.text)}
                      </p>
                    </Reveal>
                  ))}
                </ol>
              </section>

              <section aria-labelledby="internals-title">
                <Reveal>
                  <h2 id="internals-title" className="font-mono text-sm text-muted-foreground">
                    {t("internals")}
                  </h2>
                </Reveal>
                <ul className="mt-6 max-w-2xl">
                  {project.internals.map((note, i) => (
                    <Reveal
                      key={i}
                      as="li"
                      delay={i * 0.05}
                      className="grid grid-cols-[1.5rem_minmax(0,1fr)] border-b py-4 text-pretty first:pt-0"
                    >
                      <span aria-hidden className="mt-3 h-px w-3 bg-highlight" />
                      {text(note)}
                    </Reveal>
                  ))}
                </ul>
              </section>
            </div>
          </div>

          {next.slug !== project.slug && (
            <Reveal className="mt-24 sm:mt-32">
              <ProjectLink
                slug={next.slug}
                src={next.image ?? ""}
                radius={9}
                className="group grid items-center gap-6 border-t pt-8 sm:grid-cols-[minmax(0,1fr)_18rem]"
              >
                <div>
                  <p className="font-mono text-sm text-muted-foreground">{t("next")}</p>
                  <p className="mt-2 flex items-center gap-3 font-heading text-4xl font-medium tracking-tighter transition-colors group-hover:text-highlight-foreground sm:text-5xl">
                    {next.name}
                    <ArrowRight
                      className="size-7 transition-transform duration-300 group-hover:translate-x-1.5 sm:size-9"
                      aria-hidden
                    />
                  </p>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={next.image}
                  alt=""
                  className="aspect-16/10 w-full rounded-xl border bg-card object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </ProjectLink>
            </Reveal>
          )}
        </main>
        <Footer />
      </div>
    </div>
  );
}
