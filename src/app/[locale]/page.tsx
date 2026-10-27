import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stacks } from "@/components/sections/stacks";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-[960px] px-4 sm:px-6">
      <Header />
      <main className="space-y-24 pb-24 md:space-y-32">
        <Hero />
        <Projects />
        <Stacks />
        <Experience />
      </main>
      <Footer />
    </div>
  );
}
