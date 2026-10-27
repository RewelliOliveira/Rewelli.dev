import { projects } from "@/data/projects";
import { stacks, type StackId } from "@/data/stacks";

const stackNames = new Map<string, string>(stacks.map((stack) => [stack.id, stack.name]));

export function getStackNames(ids: StackId[]) {
  return ids.map((id) => stackNames.get(id) ?? id);
}

/** Quantos projetos usam cada stack. */
export function getStackUsage() {
  const usage: Record<string, number> = {};
  for (const project of projects) {
    for (const id of project.stacks) usage[id] = (usage[id] ?? 0) + 1;
  }
  return usage;
}

/** "https://abyss-one-phi.vercel.app/" -> "abyss-one-phi.vercel.app" */
export function getDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

/** "https://github.com/user/repo" -> "user/repo" */
export function getRepoName(url: string) {
  return url.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "");
}
