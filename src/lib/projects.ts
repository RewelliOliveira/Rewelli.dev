import { createElement } from "react";
import { projectCategories, projects } from "@/data/projects";
import { stacks, type StackId } from "@/data/stacks";

const stacksById = new Map<string, (typeof stacks)[number]>(
  stacks.map((stack) => [stack.id, stack]),
);

export function getStacks(ids: StackId[]) {
  return ids.flatMap((id) => stacksById.get(id) ?? []);
}

export function renderStackIcon(id: StackId, className: string) {
  const icon = stacksById.get(id)?.icon;
  return icon ? createElement(icon, { className, "aria-hidden": true }) : null;
}

export function getProjectSections() {
  return projectCategories
    .map((category) => ({
      category,
      items: projects
        .filter((project) => project.category === category)
        .map((project, index) => ({ project, index })),
    }))
    .filter((section) => section.items.length > 0);
}

export function getStackUsage() {
  const usage: Record<string, number> = {};
  for (const project of projects) {
    for (const id of project.stacks) usage[id] = (usage[id] ?? 0) + 1;
  }
  return usage;
}

export function getDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export function getRepoName(url: string) {
  return url.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "");
}
