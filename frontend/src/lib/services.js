export const services = [
  {
    title: "Full-Stack Development",
    file: "app.tsx",
    desc: "Connect the interface, application logic, and data into one coherent web application.",
    points: [
      "React interfaces",
      "Node.js and Express APIs",
      "PostgreSQL integration",
    ],
    code: `import { db } from "./db";

export async function getProjects() {
  // fetch from PostgreSQL
  const rows = await db.query("SELECT * FROM projects");
  return rows.map((p) => p.title);
}`,
    output: [
      "$ node app.tsx",
      "✓ connected to database",
      "→ ['Portfolio', 'Shop', 'Dashboard']",
    ],
  },
  {
    title: "API Development",
    file: "api.ts",
    desc: "Build the connections that let your application exchange and manage data.",
    points: [
      "REST endpoint design",
      "Input validation and error states",
      "Integration with the frontend",
    ],
    code: `import express from "express";
const app = express();

app.post("/api/contact", (req, res) => {
  if (!req.body.email) return res.status(400).json({ error: "email required" });
  res.status(201).json({ ok: true });
});`,
    output: ["$ curl -X POST /api/contact", "← 201 Created", '{ "ok": true }'],
  },
  {
    title: "Frontend Development",
    file: "Button.tsx",
    desc: "Turn a design or product idea into a clear, usable web interface.",
    points: [
      "Reusable React components",
      "Interactive page states",
      "Accessible navigation and forms",
    ],
    code: `export function Button({ label, onClick }) {
  const [loading, setLoading] = useState(false);
  return (
    <button aria-busy={loading} onClick={onClick}>
      {label}
    </button>
  );
}`,
    output: ["$ vite build", "✓ 42 modules transformed", "✓ built in 1.2s"],
  },
  {
    title: "UI / UX Design",
    file: "tokens.css",
    desc: "Shape a product around the people who will use it and the tasks they need to complete.",
    points: [
      "Page structure and user flows",
      "Consistent visual patterns",
      "Clear interaction states",
    ],
    code: `:root {
  --accent: oklch(0.72 0.11 290);
  --radius: 12px;
  --font-display: "Instrument Serif";
  --space-4: 16px;
}`,
    output: [
      "$ design-lint tokens.css",
      "✓ contrast AA passed",
      "✓ 4 tokens applied",
    ],
  },
  {
    title: "Responsive Web",
    file: "layout.css",
    desc: "Make the same website feel considered across phones, tablets, and desktops.",
    points: [
      "Adaptive layouts",
      "Touch-friendly controls",
      "Cross-screen layout checks",
    ],
    code: `.grid {
  display: grid;
  grid-template-columns: 1fr;
}
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(2, 1fr); }
}`,
    output: [
      "$ check-screens",
      "✓ mobile 375px",
      "✓ tablet 768px  ✓ desktop 1280px",
    ],
  },
  {
    title: "SEO Optimization",
    file: "head.ts",
    desc: "Give your website a clear technical foundation for discoverability.",
    points: [
      "Page titles and descriptions",
      "Semantic content structure",
      "Social sharing metadata",
    ],
    code: `export const head = () => ({
  meta: [
    { title: "Rabina — Full-stack developer" },
    { name: "description", content: "Thoughtful web experiences" },
    { property: "og:type", content: "website" },
  ],
});`,
    output: [
      "$ lighthouse --only seo",
      "✓ SEO score: 100",
      "✓ meta tags found: 3",
    ],
  },
];
