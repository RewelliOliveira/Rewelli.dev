import { getTranslations } from "next-intl/server";
import { projects } from "@/data/projects";
import { getStackUsage } from "@/lib/projects";
import { StackShowcase } from "./stack-showcase";

export async function Stacks() {
  const t = await getTranslations("stacks");

  return (
    <section aria-labelledby="stacks-title">
      <h2 id="stacks-title" className="font-heading text-3xl font-medium tracking-tight">
        {t("title")}
      </h2>
      <StackShowcase usage={getStackUsage()} totalProjects={projects.length} />
    </section>
  );
}
