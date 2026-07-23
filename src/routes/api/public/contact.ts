import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  subject: z.string().trim().min(2).max(150),
  message: z.string().trim().min(10).max(2000),
});

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return new Response("Invalid JSON", { status: 400 });
        }
        const parsed = schema.safeParse(body);
        if (!parsed.success) {
          return Response.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
        }

        const token = process.env.TELEGRAM_BOT_TOKEN;
        const chatId = process.env.TELEGRAM_CHAT_ID;

        // Not wired yet — accept the message so the UI shows success in dev.
        if (!token || !chatId) {
          console.log("[contact] pending Telegram setup", parsed.data);
          return Response.json({ ok: true, delivered: false, note: "Telegram not configured yet." });
        }

        const text =
          `📬 <b>New portfolio message</b>\n\n` +
          `<b>From:</b> ${escapeHtml(parsed.data.name)}\n` +
          `<b>Email:</b> ${escapeHtml(parsed.data.email)}\n` +
          `<b>Subject:</b> ${escapeHtml(parsed.data.subject)}\n\n` +
          escapeHtml(parsed.data.message);

        const tgRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
        });

        if (!tgRes.ok) {
          const errText = await tgRes.text();
          console.error("[contact] telegram error", tgRes.status, errText);
          return Response.json({ error: "Telegram delivery failed" }, { status: 502 });
        }

        return Response.json({ ok: true, delivered: true });
      },
    },
  },
});

function escapeHtml(s: string) {
  return s.replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[c] as string);
}
