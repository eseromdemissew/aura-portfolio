import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Award, Download, Eye, X } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/certificates")({
  head: () => ({
    meta: [
      { title: `Certificates — ${siteConfig.name}` },
      { name: "description", content: `Certifications earned by ${siteConfig.name}.` },
      { property: "og:title", content: `Certificates — ${siteConfig.name}` },
      { property: "og:description", content: "Certifications earned." },
    ],
  }),
  component: Certificates,
});

function Certificates() {
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <Section eyebrow="Credentials" title="Certificates" intro="Preview or download the full PDF for each certificate.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {siteConfig.certificates.map((c, i) => (
          <div key={c.title} className="group flex flex-col rounded-3xl glass p-6 transition-transform hover:-translate-y-1 animate-rise" style={{ animationDelay: `${i * 60}ms` }}>
            <div className="mb-5 grid h-36 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 via-primary/5 to-transparent">
              <Award className="h-12 w-12 text-primary" />
            </div>
            <h3 className="text-base font-semibold">{c.title}</h3>
            <p className="text-sm text-muted-foreground">{c.org}</p>
            <p className="mt-1 text-xs text-muted-foreground">{c.date}</p>
            <div className="mt-5 flex gap-2 pt-4 border-t border-border/60">
              <button
                onClick={() => setPreview(c.pdf)}
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-border bg-background/60 px-3 py-2 text-sm transition-colors hover:bg-accent"
              >
                <Eye className="h-4 w-4" /> Preview
              </button>
              <a
                href={c.pdf}
                download
                className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.03]"
              >
                <Download className="h-4 w-4" /> PDF
              </a>
            </div>
          </div>
        ))}
      </div>

      {preview && (
        <div className="fixed inset-0 z-[60] grid place-items-center bg-ink/40 p-4 backdrop-blur-sm" onClick={() => setPreview(null)}>
          <div className="relative h-[85vh] w-full max-w-4xl overflow-hidden rounded-3xl glass-strong" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPreview(null)} className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80" aria-label="Close">
              <X className="h-4 w-4" />
            </button>
            {preview === "#" ? (
              <div className="grid h-full place-items-center text-center p-8">
                <div>
                  <Award className="mx-auto h-16 w-16 text-primary" />
                  <p className="mt-4 text-lg font-semibold">Certificate preview</p>
                  <p className="mt-1 text-sm text-muted-foreground">Add your PDF URL in <code className="rounded bg-accent px-1.5 py-0.5">src/config/site.ts</code> to display it here.</p>
                </div>
              </div>
            ) : (
              <iframe src={preview} title="Certificate" className="h-full w-full" />
            )}
          </div>
        </div>
      )}
    </Section>
  );
}
