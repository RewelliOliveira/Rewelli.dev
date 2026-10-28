import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Experience } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Stacks } from "@/components/sections/stacks";

export default function Home() {
  return (
    <div className="overflow-x-clip">
      <Header />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <main className="space-y-16 pb-16 sm:space-y-24 sm:pb-24 md:space-y-32 md:pb-32">
          <Hero />
          <Projects />
          <Stacks />
          <Experience />
        </main>
        <Footer />
      </div>
    </div>
  );
}
