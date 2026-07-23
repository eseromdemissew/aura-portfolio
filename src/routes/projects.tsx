import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/Section";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: `Projects — ${siteConfig.name}` },
      { name: "description", content: `Selected projects by ${siteConfig.name}, spanning AI, web, and robotics.` },
      { property: "og:title", content: `Projects — ${siteConfig.name}` },
      { property: "og:description", content: "AI, web, and robotics projects." },
    ],
  }),
  component: Projects,
});

function Projects() {
  const tags = useMemo(() => ["All", ...Array.from(new Set(siteConfig.projects.map((p) => p.tag)))], []);
  const [active, setActive] = useState<string>("All");

  const list = active === "All" ? siteConfig.projects : siteConfig.projects.filter((p) => p.tag === active);

  return (
    <Section eyebrow="Work" title="Projects" intro="Shipping is a skill. Here are a few of my favorites.">
      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm transition-all",
              active === t
                ? "border-primary bg-primary text-primary-foreground shadow-sm"
                : "border-border bg-background/60 hover:bg-accent",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p, i) => (
          <article
            key={p.title}
            className="group relative flex flex-col overflow-hidden rounded-3xl glass p-6 transition-all hover:-translate-y-1 hover:shadow-xl animate-rise"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="mb-5 h-32 rounded-2xl bg-gradient-to-br from-primary/25 via-primary/5 to-transparent" />
            <div className="mb-2 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">{p.tag}</span>
            </div>
            <p className="text-sm text-muted-foreground">{p.description}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tech.map((t) => (
                <span key={t} className="rounded-md border border-border bg-background/60 px-2 py-0.5 text-xs text-muted-foreground">{t}</span>
              ))}
            </div>
            <div className="mt-5 flex items-center gap-3 pt-4 border-t border-border/60">
              <a href={p.link} className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline">
                Live <ExternalLink className="h-3.5 w-3.5" />
              </a>
              <a href={p.repo} className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
                Code <Github className="h-3.5 w-3.5" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
