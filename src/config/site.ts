// EDIT THIS FILE to update your portfolio content.
export const siteConfig = {
  name: "Makbel Temesgen",
  handle: "@mak5maker",
  role: "Full-Stack • UI/UX • AI & Robotics",
  tagline:
    "13-year-old builder from Addis Ababa crafting AI products, human interfaces, and small robots that think.",
  location: "Addis Ababa, Ethiopia",
  email: "makushamaku7@gmail.com",
  phone: "+251972857878",
  telegram: "https://t.me/mak5maker",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  resumeUrl: "/resume.pdf",

  // Contact form → Telegram (wire up later)
  telegram_bot: {
    // Set these as server secrets (never in client code) when ready:
    // TELEGRAM_BOT_TOKEN, TELEGRAM_CHAT_ID
    endpoint: "/api/public/contact",
  },

  stats: [
    { label: "Age", value: "13" },
    { label: "Projects", value: "6+" },
    { label: "Certificates", value: "5" },
    { label: "Based in", value: "Addis Ababa" },
  ],

  skills: {
    Frontend: ["React", "TypeScript", "Tailwind", "Next.js", "Framer Motion"],
    Backend: ["Node.js", "Python", "FastAPI", "PostgreSQL", "Supabase"],
    "AI & ML": ["OpenAI", "LangChain", "PyTorch", "RAG", "Prompt Design"],
    "Robotics & Tools": ["Arduino", "Raspberry Pi", "Figma", "Git", "Linux"],
  },

  projects: [
    {
      title: "Tenaye AI",
      tag: "Medical",
      description:
        "An AI medical assistant that answers health questions in Amharic & English, with symptom triage and clinician-safe guardrails.",
      tech: ["Next.js", "OpenAI", "RAG", "Supabase"],
      link: "#",
      repo: "#",
    },
    {
      title: "Lex AI",
      tag: "Legal",
      description:
        "A lawyer's copilot — summarizes cases, drafts briefs, and searches Ethiopian statutes with citation-aware answers.",
      tech: ["Python", "FastAPI", "LangChain", "pgvector"],
      link: "#",
      repo: "#",
    },
    {
      title: "Robo-Lens",
      tag: "Robotics",
      description:
        "A small rover with on-device vision that maps a room and follows spoken commands over Wi-Fi.",
      tech: ["Raspberry Pi", "OpenCV", "Python"],
      link: "#",
      repo: "#",
    },
    {
      title: "Studyloop",
      tag: "EdTech",
      description:
        "Turns any PDF into spaced-repetition flashcards and quizzes, tailored to a student's weak spots.",
      tech: ["React", "TypeScript", "OpenAI"],
      link: "#",
      repo: "#",
    },
    {
      title: "Suk-Suk",
      tag: "Commerce",
      description:
        "A neighborhood-first marketplace prototype for Addis Ababa with Telegram checkout and local delivery.",
      tech: ["Next.js", "Telegram Bot", "Postgres"],
      link: "#",
      repo: "#",
    },
    {
      title: "Portfolio v3",
      tag: "Design",
      description:
        "This site — a study in ivory glassmorphism, motion, and restraint.",
      tech: ["TanStack Start", "Tailwind v4"],
      link: "#",
      repo: "#",
    },
  ],

  certificates: [
    { title: "Full-Stack Web Development", org: "freeCodeCamp", date: "2024", pdf: "#" },
    { title: "AI for Everyone", org: "DeepLearning.AI", date: "2024", pdf: "#" },
    { title: "Python for Data Science", org: "IBM", date: "2024", pdf: "#" },
    { title: "Prompt Engineering", org: "OpenAI Academy", date: "2025", pdf: "#" },
    { title: "Intro to Robotics", org: "MIT OCW", date: "2025", pdf: "#" },
  ],
};

export type SiteConfig = typeof siteConfig;
