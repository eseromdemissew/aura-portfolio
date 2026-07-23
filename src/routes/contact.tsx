import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Section } from "@/components/site/Section";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: `Contact — ${siteConfig.name}` },
      { name: "description", content: `Get in touch with ${siteConfig.name}.` },
      { property: "og:title", content: `Contact — ${siteConfig.name}` },
      { property: "og:description", content: `Get in touch with ${siteConfig.name}.` },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Enter your name").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  subject: z.string().trim().min(2, "Add a subject").max(150),
  message: z.string().trim().min(10, "A bit more detail?").max(2000),
});

function Contact() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0]?.message ?? "Please check the form");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(siteConfig.telegram_bot.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });
      if (!res.ok) throw new Error(await res.text());
      toast.success("Message sent — I'll be in touch soon.");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      toast.error("Couldn't send right now. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Section eyebrow="Contact" title="Let's build something." intro="Have a project, a question, or just want to say hi? The inbox is open.">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          <div className="rounded-3xl glass p-6">
            <h3 className="font-display text-lg font-semibold">Get in touch directly</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><Mail className="h-4 w-4" /></span>
                <a href={`mailto:${siteConfig.email}`} className="hover:underline">{siteConfig.email}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><Phone className="h-4 w-4" /></span>
                <a href={`tel:${siteConfig.phone}`} className="hover:underline">{siteConfig.phone}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><Send className="h-4 w-4" /></span>
                <a href={siteConfig.telegram} className="hover:underline">Telegram · {siteConfig.handle}</a>
              </li>
              <li className="flex items-center gap-3">
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary"><MapPin className="h-4 w-4" /></span>
                {siteConfig.location}
              </li>
            </ul>
          </div>
          <div className="rounded-3xl glass p-6 text-sm text-muted-foreground">
            <p className="font-medium text-foreground">Response time</p>
            <p className="mt-1">Usually within 24 hours. Messages sent via this form are delivered straight to my Telegram once the bot is wired up.</p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="rounded-3xl glass-strong p-6 sm:p-8 space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name">
              <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="input" placeholder="Your name" />
            </Field>
            <Field label="Email">
              <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="input" placeholder="you@example.com" />
            </Field>
          </div>
          <Field label="Subject">
            <input required value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input" placeholder="What's this about?" />
          </Field>
          <Field label="Message">
            <textarea required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="input resize-none" placeholder="Tell me a bit about your idea…" />
          </Field>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-[1.01] disabled:opacity-70"
          >
            {loading ? <><Loader2 className="h-4 w-4 animate-spin" /> Sending…</> : <>Send message <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></>}
          </button>
        </form>
      </div>

      <style>{`
        .input {
          width: 100%;
          border-radius: 0.875rem;
          border: 1px solid var(--color-border);
          background: color-mix(in oklab, white 70%, transparent);
          padding: 0.75rem 1rem;
          font-size: 0.95rem;
          outline: none;
          transition: border-color .15s, box-shadow .15s;
        }
        .input:focus {
          border-color: var(--color-primary);
          box-shadow: 0 0 0 4px color-mix(in oklab, var(--color-primary) 15%, transparent);
        }
      `}</style>
    </Section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
