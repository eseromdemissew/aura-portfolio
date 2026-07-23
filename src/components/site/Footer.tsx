import { siteConfig } from "@/config/site";
import { Github, Linkedin, Mail, Send } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-background/60 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 sm:flex-row sm:items-center">
        <div>
          <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} — built with care in {siteConfig.location}.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a href={`mailto:${siteConfig.email}`} className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-colors hover:bg-accent" aria-label="Email">
            <Mail className="h-4 w-4" />
          </a>
          <a href={siteConfig.telegram} className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-colors hover:bg-accent" aria-label="Telegram">
            <Send className="h-4 w-4" />
          </a>
          <a href={siteConfig.github} className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-colors hover:bg-accent" aria-label="GitHub">
            <Github className="h-4 w-4" />
          </a>
          <a href={siteConfig.linkedin} className="grid h-10 w-10 place-items-center rounded-xl border border-border transition-colors hover:bg-accent" aria-label="LinkedIn">
            <Linkedin className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
