import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("font-heading text-base font-medium tracking-tight", className)}>
      reuli<span className="text-primary">.dev</span>
    </span>
  );
}
