import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Github, Send, Mail } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${siteConfig.name} — ${siteConfig.role}` },
      { name: "description", content: siteConfig.tagline },
      { property: "og:title", content: `${siteConfig.name} — Portfolio` },
      { property: "og:description", content: siteConfig.tagline },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-8 pb-16 sm:pt-16 sm:pb-24">
        <div className="animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Available for collaborations · {siteConfig.location}
          </span>
        </div>

        <h1 className="mt-6 animate-rise font-display text-5xl leading-[1.02] tracking-tight sm:text-7xl md:text-8xl" style={{ animationDelay: "80ms" }}>
          Hi, I'm <span className="text-gradient">Makbel</span>.<br />
          I build software that <span className="italic">thinks</span>.
        </h1>

        <p className="mt-6 max-w-2xl animate-rise text-lg text-muted-foreground sm:text-xl" style={{ animationDelay: "160ms" }}>
          {siteConfig.tagline}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3 animate-rise" style={{ animationDelay: "240ms" }}>
          <Link to="/projects" className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.03]">
            View work
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-6 py-3 text-sm font-medium backdrop-blur transition-colors hover:bg-accent">
            Contact me
          </Link>
          <div className="ml-2 hidden items-center gap-1 sm:flex">
            <a href={`mailto:${siteConfig.email}`} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-accent" aria-label="Email"><Mail className="h-4 w-4" /></a>
            <a href={siteConfig.telegram} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-accent" aria-label="Telegram"><Send className="h-4 w-4" /></a>
            <a href={siteConfig.github} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:bg-accent" aria-label="GitHub"><Github className="h-4 w-4" /></a>
          </div>
        </div>

        {/* Stats card */}
        <div className="mt-14 grid grid-cols-2 gap-3 rounded-3xl glass-strong p-4 sm:grid-cols-4 sm:p-6 animate-rise" style={{ animationDelay: "320ms" }}>
          {siteConfig.stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-background/50 p-4">
              <p className="font-display text-3xl font-semibold text-gradient">{s.value}</p>
              <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured work preview */}
      <Section eyebrow="Selected" title="Recent work" intro="A few things I'm proud of lately.">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.projects.slice(0, 3).map((p, i) => (
            <article key={p.title} className="group relative overflow-hidden rounded-3xl glass p-6 transition-transform hover:-translate-y-1 animate-rise" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="absolute right-4 top-4 rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-primary">{p.tag}</div>
              <div className="mb-16 h-24 rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent" />
              <h3 className="text-lg font-semibold">{p.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{p.description}</p>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link to="/projects" className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all">
            See all projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Section>
    </>
  );
}
