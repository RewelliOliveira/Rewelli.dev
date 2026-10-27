import { getTranslations } from "next-intl/server";
import { Reveal } from "@/components/motion/reveal";
import { StackShowcase } from "./stack-showcase";

export async function Stacks() {
  const t = await getTranslations("stacks");

  return (
    <section aria-labelledby="stacks-title">
      <Reveal>
        <h2 id="stacks-title" className="font-heading text-3xl font-medium tracking-tight">
          {t("title")}
        </h2>
      </Reveal>
      <StackShowcase />
    </section>
  );
}
