import { createFileRoute } from "@tanstack/react-router";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `About — ${siteConfig.name}` },
      { name: "description", content: `About ${siteConfig.name}: ${siteConfig.role} based in ${siteConfig.location}.` },
      { property: "og:title", content: `About — ${siteConfig.name}` },
      { property: "og:description", content: siteConfig.tagline },
    ],
  }),
  component: About,
});

const timeline = [
  { when: "2025", what: "Building Tenaye AI and Lex AI — AI copilots for medicine and law." },
  { when: "2024", what: "Shipped 4 production side-projects and earned 5 certifications." },
  { when: "2023", what: "Went deep on React, TypeScript, and design systems." },
  { when: "2022", what: "Wrote first line of code. Never looked back." },
];

function About() {
  return (
    <>
      <Section eyebrow="About" title="A curious 13-year-old who ships." intro={siteConfig.tagline}>
        <div className="grid gap-8 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl glass-strong p-6">
            <div className="aspect-square w-full rounded-2xl bg-gradient-to-br from-primary/30 via-primary/10 to-transparent grid place-items-center">
              <span className="font-display text-8xl font-semibold text-gradient">M</span>
            </div>
            <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
              <div><dt className="text-muted-foreground">Name</dt><dd className="font-medium">{siteConfig.name}</dd></div>
              <div><dt className="text-muted-foreground">Handle</dt><dd className="font-medium">{siteConfig.handle}</dd></div>
              <div><dt className="text-muted-foreground">Based</dt><dd className="font-medium">{siteConfig.location}</dd></div>
              <div><dt className="text-muted-foreground">Age</dt><dd className="font-medium">13</dd></div>
            </dl>
          </div>

          <div>
            <div className="rounded-3xl glass p-6">
              <h3 className="font-display text-2xl font-semibold">The short version</h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                I fell in love with programming because it felt like a superpower — a way to
                turn a stubborn idea into something real by midnight. Today I focus on the
                intersection of AI, thoughtful interfaces, and small autonomous machines. I
                care about tools that respect the person using them.
              </p>
              <p className="mt-3 text-muted-foreground leading-relaxed">
                Outside of code: robots, chess, and a slightly unreasonable amount of coffee
                (rooibos, technically).
              </p>
            </div>

            <div className="mt-6 rounded-3xl glass p-6">
              <h3 className="font-display text-2xl font-semibold">Timeline</h3>
              <ol className="mt-5 space-y-4">
                {timeline.map((t) => (
                  <li key={t.when} className="grid grid-cols-[80px_1fr] items-start gap-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-center text-xs font-semibold text-primary">{t.when}</span>
                    <p className="text-sm leading-relaxed">{t.what}</p>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </Section>

      <Section eyebrow="Toolbox" title="Skills & tools">
        <div className="grid gap-4 sm:grid-cols-2">
          {Object.entries(siteConfig.skills).map(([group, items]) => (
            <div key={group} className="rounded-3xl glass p-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{group}</h4>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((s) => (
                  <span key={s} className="rounded-full border border-border bg-background/50 px-3 py-1.5 text-sm">{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
