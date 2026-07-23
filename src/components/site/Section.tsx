import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Section({
  eyebrow,
  title,
  intro,
  children,
  className,
  id,
}: {
  eyebrow?: string;
  title?: string;
  intro?: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("mx-auto max-w-6xl px-6 py-16 sm:py-24", className)}>
      {(eyebrow || title || intro) && (
        <div className="mb-10 max-w-2xl animate-rise">
          {eyebrow && (
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              {eyebrow}
            </p>
          )}
          {title && <h2 className="text-3xl font-semibold sm:text-5xl">{title}</h2>}
          {intro && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{intro}</p>}
        </div>
      )}
      {children}
    </section>
  );
}
