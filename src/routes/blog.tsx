import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { X, Calendar, MapPin } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/Section";

type Moment = {
  title: string;
  date: string;
  location?: string;
  tag: string;
  blurb: string;
  image: string;
};

const moments: Moment[] = [
  {
    title: "First rover rolls",
    date: "Mar 2025",
    location: "Addis Ababa",
    tag: "Robotics",
    blurb: "Robo-Lens took its first autonomous lap around the living room — mapped, dodged the cat, and made it home.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Late-night RAG breakthrough",
    date: "Feb 2025",
    location: "Home lab",
    tag: "AI",
    blurb: "Tenaye AI finally answered an Amharic symptom query with a clean citation. 2 a.m. victory tea followed.",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Hackathon huddle",
    date: "Jan 2025",
    tag: "Community",
    blurb: "Youngest on the team, loudest on the whiteboard. Shipped a working demo before sunrise.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Sketching Suk-Suk",
    date: "Dec 2024",
    tag: "Design",
    blurb: "Fifty paper wireframes for a neighborhood marketplace. Three survived. One shipped.",
    image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Soldering Sunday",
    date: "Nov 2024",
    location: "Workshop",
    tag: "Hardware",
    blurb: "Rewired the Pi camera mount so it stops staring at the ceiling. Small win, big pride.",
    image: "https://images.unsplash.com/photo-1581090700227-1e37b190418e?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Talk at school",
    date: "Oct 2024",
    location: "Addis Ababa",
    tag: "Speaking",
    blurb: "Explained neural networks to a class of ninth-graders using only fruit and yarn. It worked.",
    image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Portfolio v3 ships",
    date: "Sep 2024",
    tag: "Design",
    blurb: "Ivory glass, drifting mesh, and a whole lot of restraint. This site, right here.",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Coffee & code",
    date: "Aug 2024",
    location: "Addis Ababa",
    tag: "Life",
    blurb: "Buna, laptop, and a stubborn TypeScript error. Standard Saturday.",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80",
  },
];

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: `Blog & Moments — ${siteConfig.name}` },
      { name: "description", content: `A gallery of moments, milestones and mid-build snapshots from ${siteConfig.name}.` },
      { property: "og:title", content: `Blog & Moments — ${siteConfig.name}` },
      { property: "og:description", content: "Milestones, mid-build snapshots and small wins." },
    ],
  }),
  component: Blog,
});

function Blog() {
  const tags = useMemo(() => ["All", ...Array.from(new Set(moments.map((m) => m.tag)))], []);
  const [tag, setTag] = useState<string>("All");
  const [open, setOpen] = useState<Moment | null>(null);

  const filtered = tag === "All" ? moments : moments.filter((m) => m.tag === tag);

  return (
    <Section
      eyebrow="Blog"
      title="Moments"
      intro="A running gallery of milestones, mid-build snapshots, and small wins from the workbench."
    >
      <div className="mb-8 flex flex-wrap gap-2">
        {tags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={
              "rounded-full border px-4 py-1.5 text-sm transition-colors " +
              (tag === t
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-background/60 text-muted-foreground hover:text-foreground")
            }
          >
            {t}
          </button>
        ))}
      </div>

      <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
        {filtered.map((m, i) => (
          <button
            key={m.title}
            onClick={() => setOpen(m)}
            className="mb-5 block w-full break-inside-avoid overflow-hidden rounded-3xl glass p-0 text-left transition-transform hover:-translate-y-1 animate-rise"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <div className="relative overflow-hidden">
              <img
                src={m.image}
                alt={m.title}
                loading="lazy"
                className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-xs font-medium backdrop-blur">
                {m.tag}
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {m.date}</span>
                {m.location && (
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {m.location}</span>
                )}
              </div>
              <h3 className="mt-2 text-base font-semibold">{m.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground line-clamp-2">{m.blurb}</p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
        >
          <div
            className="relative w-full max-w-3xl overflow-hidden rounded-3xl glass-strong"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(null)}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            <img src={open.image} alt={open.title} className="max-h-[60vh] w-full object-cover" />
            <div className="p-6">
              <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                <span className="rounded-full bg-accent px-2.5 py-1 font-medium text-accent-foreground">{open.tag}</span>
                <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {open.date}</span>
                {open.location && (
                  <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {open.location}</span>
                )}
              </div>
              <h3 className="mt-3 text-2xl font-semibold">{open.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{open.blurb}</p>
            </div>
          </div>
        </div>
      )}
    </Section>
  );
}
