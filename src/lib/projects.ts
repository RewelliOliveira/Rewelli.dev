import { stacks, type StackId } from "@/data/stacks";

const stacksById = new Map<string, (typeof stacks)[number]>(
  stacks.map((stack) => [stack.id, stack]),
);

export function getStacks(ids: StackId[]) {
  return ids.flatMap((id) => stacksById.get(id) ?? []);
}

export function getDomain(url: string) {
  return new URL(url).hostname.replace(/^www\./, "");
}

export function getRepoName(url: string) {
  return url.replace(/^https?:\/\/(www\.)?github\.com\//, "").replace(/\/$/, "");
}
