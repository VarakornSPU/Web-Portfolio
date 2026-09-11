import { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  MapPin,
  Phone,
  ArrowUpRight,
  Menu,
  X,
  Sparkles,
  Terminal,
  Layers,
  Award,
  BookOpen,
  Send,
  Sun,
  Moon,
  CheckCircle2,
  ExternalLink
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";

// ---------------------------------------------------------------------------
// Data — sourced from Varakorn's CV
// ---------------------------------------------------------------------------

const PROFILE = {
  name: "Varakorn Matures",
  role: "Computer Science Student — Full-Stack Developer",
  location: "Bangkok, Thailand",
  phone: "080-505-0744",
  email: "varakonmatures@gmail.com",
  github: "github.com/VarakornSPU",
  githubUrl: "https://github.com/VarakornSPU",
  status: "Looking for Co-op Education Placement",
};

const SKILLS = [
  { group: "Languages & Frameworks", icon: <Terminal size={18} />, items: ["JavaScript / React", "Node.js / Express.js", "C# / ASP.NET Core"] },
  { group: "Data & Database", icon: <Layers size={18} />, items: ["PostgreSQL", "SQL Server", "Entity Framework Core"] },
  { group: "Interfaces & API", icon: <Sparkles size={18} />, items: ["REST APIs", "Swagger / Postman", "JWT / OAuth"] },
  { group: "Tooling & Workflow", icon: <Award size={18} />, items: ["Git / GitHub", "MVC Architecture"] },
];

const PROJECTS = [
  {
    year: "2025",
    name: "Petshop E-Commerce",
    tag: "Full-Stack Web Application",
    tech: ["React", "Node.js", "Express.js", "PostgreSQL", "JWT", "Google OAuth"],
    problem: "Small pet-supply sellers need a real storefront — product catalog, cart, checkout and order tracking — not just a social-media page.",
    solution: "A full-stack e-commerce app covering product management, shopping cart, order management, payment workflow and shipping status.",
    role: "Built the application end to end: schema design, REST API, and the storefront UI.",
    outcome: "Shipped user authentication with Google OAuth, a documented REST API (Swagger), and PostgreSQL-backed data — a complete order lifecycle.",
    featured: true,
  },
  {
    year: "2026",
    name: "Mindi",
    tag: "AI Relationship Advice Chatbot",
    tech: ["React", "Node.js", "Express.js", "RAG", "REST API"],
    problem: "General-purpose chatbots give generic relationship advice with no grounding in a real knowledge base.",
    solution: "An AI-powered chatbot with authentication, persistent chat history and conversation memory, backed by Retrieval-Augmented Generation.",
    role: "Designed the retrieval layer: the system pulls relevant passages from a knowledge base and feeds them to the model as context.",
    outcome: "A chatbot that answers with context grounded in curated source material instead of the model's own unguided output.",
    featured: true,
  },
  {
    year: "2026",
    name: "Stepify",
    tag: "ASP.NET Core Web Application",
    tech: ["C#", "ASP.NET Core", "Entity Framework Core", "SQL Server"],
    problem: "Learning the MVC pattern properly means building a real app with it, not just following a tutorial.",
    solution: "An online shoe-store web app structured with ASP.NET Core MVC — Models, Controllers, Views and ViewComponents.",
    role: "Implemented the MVC architecture and the data layer.",
    outcome: "Database operations wired through Entity Framework Core against SQL Server, with a clean separation between data, logic and presentation.",
    featured: false,
  },
];

const EDUCATION = [
  {
    period: "2023 — Present",
    school: "Sripatum University",
    detail: "Faculty of Information Technology · B.Sc. in Computer Science and Software Development Innovation",
    meta: "GPAX 3.83",
  },
  {
    period: "2020 — 2023",
    school: "Debsirin School",
    detail: "Arts – Japanese Program",
    meta: "GPAX 3.90",
  },
];

const LANGUAGES = [
  { name: "Thai", level: "Native", pct: 100 },
  { name: "English", level: "Basic (Reading & Listening)", pct: 50 },
];

const NAV = [
  { id: "top", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

// ---------------------------------------------------------------------------

export default function Portfolio() {
  const [active, setActive] = useState("top");
  const [navOpen, setNavOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-30% 0px -50% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const goTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`pf-root ${darkMode ? "dark" : "light"}`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;500;700&display=swap');

        /* --- Theme Variables --- */
        .pf-root.dark {
          --bg: #090d16;
          --bg-card: #111827;
          --bg-card-hover: #1f293d;
          --border: rgba(255, 255, 255, 0.08);
          --border-glow: rgba(56, 189, 248, 0.4);
          --text-main: #f3f4f6;
          --text-muted: #9ca3af;
          --text-faint: #6b7280;
          --accent: #38bdf8;
          --accent-gradient: linear-gradient(135deg, #38bdf8 0%, #818cf8 100%);
          --accent-glow: rgba(56, 189, 248, 0.15);
          --chip-bg: rgba(56, 189, 248, 0.1);
          --chip-text: #38bdf8;
          --shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }

        .pf-root.light {
          --bg: #f8fafc;
          --bg-card: #ffffff;
          --bg-card-hover: #f1f5f9;
          --border: rgba(0, 0, 0, 0.08);
          --border-glow: rgba(14, 165, 233, 0.4);
          --text-main: #0f172a;
          --text-muted: #475569;
          --text-faint: #94a3b8;
          --accent: #0284c7;
          --accent-gradient: linear-gradient(135deg, #0284c7 0%, #4f46e5 100%);
          --accent-glow: rgba(2, 132, 199, 0.1);
          --chip-bg: rgba(2, 132, 199, 0.08);
          --chip-text: #0284c7;
          --shadow: 0 10px 30px -10px rgba(0,0,0,0.05);
        }

        .pf-root {
          font-family: 'Plus Jakarta Sans', sans-serif;
          background-color: var(--bg);
          color: var(--text-main);
          min-height: 100vh;
          display: flex;
          position: relative;
          transition: background-color 0.3s ease, color 0.3s ease;
          overflow-x: clip;
        }

        .pf-root * { box-sizing: border-box; }
        .pf-root h1,
        .pf-root h2,
        .pf-root h3 {
          color: var(--text-main);
        }
        .pf-mono { font-family: 'JetBrains Mono', monospace; }

        /* Cursor Glow Effect */
        .cursor-glow {
          pointer-events: none;
          position: fixed;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--accent-glow) 0%, transparent 70%);
          transition: transform 0.1s ease-out;
          transform: translate(-50%, -50%);
          z-index: 1;
        }

        /* ---------- Sidebar Rail ---------- */
        .pf-rail {
          width: 300px;
          flex-shrink: 0;
          border-right: 1px solid var(--border);
          padding: 2.5rem 2rem;
          position: sticky;
          top: 0;
          height: 100vh;
          max-height: 100vh;
          align-self: flex-start;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: var(--bg);
          z-index: 10;
        }

        .pf-profile-header {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .pf-avatar {
          width: 52px;
          height: 52px;
          border-radius: 14px;
          background: var(--accent-gradient);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 1.25rem;
          color: #fff;
          box-shadow: 0 4px 14px var(--accent-glow);
        }

        .pf-rail-name {
          font-size: 1rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
          white-space: nowrap;
        }

        .pf-rail-role {
          color: var(--text-muted);
          font-size: 0.8rem;
          margin-top: 0.2rem;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .pf-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          padding: 0.35rem 0.75rem;
          background: var(--chip-bg);
          color: var(--chip-text);
          border-radius: 20px;
          border: 1px solid var(--border);
          margin-bottom: 2rem;
          font-weight: 500;
        }

        .pf-status-dot {
          width: 7px;
          height: 7px;
          background: #10b981;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .pf-nav-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0.3rem;
        }

        .pf-nav-item button {
          all: unset;
          cursor: pointer;
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0.65rem 1rem;
          font-size: 0.9rem;
          color: var(--text-muted);
          border-radius: 8px;
          transition: all 0.2s ease;
          font-weight: 500;
        }

        .pf-nav-item button:hover {
          color: var(--text-main);
          background: var(--bg-card-hover);
        }

        .pf-nav-item.active button {
          color: var(--accent);
          background: var(--chip-bg);
          font-weight: 600;
        }

        .pf-rail-foot {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          padding-top: 1.5rem;
          border-top: 1px solid var(--border);
        }

        .pf-rail-foot-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .pf-icon-link {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          color: var(--text-muted);
          text-decoration: none;
          font-size: 0.82rem;
          transition: color 0.2s;
        }
        .pf-icon-link:hover { color: var(--accent); }

        .pf-theme-toggle {
          all: unset;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          border: 1px solid var(--border);
          color: var(--text-muted);
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-card);
          transition: all 0.2s;
        }
        .pf-theme-toggle:hover { color: var(--accent); border-color: var(--accent); }

        /* ---------- Mobile Topbar ---------- */
        .pf-topbar {
          display: none;
          position: sticky;
          top: 0;
          z-index: 50;
          background: var(--bg);
          border-bottom: 1px solid var(--border);
          padding: 1rem 1.25rem;
          align-items: center;
          justify-content: space-between;
          backdrop-filter: blur(10px);
        }

        .pf-mobile-menu {
          display: none;
          position: fixed;
          inset: 0;
          background: var(--bg);
          z-index: 100;
          padding: 1.5rem;
          flex-direction: column;
        }
        .pf-mobile-menu.open { display: flex; }

        .pf-menu-btn {
          all: unset;
          cursor: pointer;
          color: var(--text-main);
          display: flex;
          padding: 0.4rem;
          border-radius: 8px;
          border: 1px solid var(--border);
        }

        /* ---------- Main Content Layout ---------- */
        .pf-main {
          flex: 1;
          min-width: 0;
          z-index: 2;
        }

        .pf-section {
          padding: 6rem 4rem;
          border-bottom: 1px solid var(--border);
          scroll-margin-top: 2rem;
          text-align: left;
        }
        .pf-section:last-child { border-bottom: none; }

        #top {
          text-align: center;
        }

        #top .pf-eyebrow {
          justify-content: center;
        }

        #top .pf-lede {
          margin-left: auto;
          margin-right: auto;
        }

        #top .pf-cta-row {
          justify-content: center;
        }

        .pf-eyebrow {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 1rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .pf-eyebrow::before {
          content: '';
          display: inline-block;
          width: 20px;
          height: 2px;
          background: var(--accent);
        }

        .pf-h1 {
          font-size: clamp(2.5rem, 5vw, 4.2rem);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 1.5rem;
          letter-spacing: -0.02em;
        }

        .pf-h1 span {
          background: var(--accent-gradient);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .pf-h2 {
          font-size: clamp(1.8rem, 3vw, 2.5rem);
          font-weight: 700;
          margin-bottom: 2.5rem;
          letter-spacing: -0.01em;
        }

        .pf-lede {
          font-size: 1.15rem;
          color: var(--text-muted);
          max-width: 60ch;
          line-height: 1.7;
          margin-bottom: 2.5rem;
        }

        .pf-cta-row {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
        }

        .pf-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.85rem 1.6rem;
          border-radius: 10px;
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          cursor: pointer;
        }

        .pf-btn-solid {
          background: var(--accent-gradient);
          color: #fff;
          border: none;
          box-shadow: 0 4px 20px var(--accent-glow);
        }
        .pf-btn-solid:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 25px var(--accent-glow);
        }

        .pf-btn-outline {
          background: var(--bg-card);
          color: var(--text-main);
          border: 1px solid var(--border);
        }
        .pf-btn-outline:hover {
          border-color: var(--accent);
          background: var(--bg-card-hover);
        }

        /* ---------- Bento Grid About/Highlights ---------- */
        .pf-bento-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .pf-bento-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .pf-bento-card:hover {
          border-color: var(--border-glow);
          transform: translateY(-4px);
          box-shadow: var(--shadow);
        }

        .pf-bento-card.span-2 { grid-column: span 2; }
        .pf-bento-card.span-1 { grid-column: span 1; }

        .pf-bento-title {
          font-size: 1.15rem;
          font-weight: 700;
          margin-bottom: 0.75rem;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pf-bento-desc {
          font-size: 0.95rem;
          color: var(--text-muted);
          line-height: 1.6;
          margin: 0;
        }

        /* ---------- Skills Section ---------- */
        .pf-skills-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.5rem;
        }

        .pf-skill-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 14px;
          padding: 1.8rem;
          transition: all 0.2s;
        }
        .pf-skill-card:hover { border-color: var(--border-glow); }

        .pf-skill-group-title {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.2rem;
          display: flex;
          align-items: center;
          gap: 10px;
          color: var(--accent);
        }

        .pf-skill-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.6rem;
        }

        .pf-skill-chip {
          background: var(--chip-bg);
          color: var(--chip-text);
          border: 1px solid var(--border);
          padding: 0.45rem 0.9rem;
          border-radius: 8px;
          font-size: 0.85rem;
          font-weight: 500;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ---------- Projects Section ---------- */
        .pf-projects-list {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .pf-project-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 20px;
          padding: 2.5rem;
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: 2.5rem;
          transition: all 0.3s ease;
          position: relative;
        }

        .pf-project-card:hover {
          border-color: var(--border-glow);
          box-shadow: var(--shadow);
          transform: translateY(-2px);
        }

        .pf-project-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .pf-project-year {
          font-family: 'JetBrains Mono', monospace;
          color: var(--accent);
          font-size: 0.85rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }

        .pf-project-name {
          font-size: 1.6rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.01em;
        }

        .pf-project-tag {
          color: var(--text-muted);
          font-size: 0.9rem;
          margin-bottom: 1.5rem;
        }

        .pf-project-tech {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .pf-tech-chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.75rem;
          color: var(--text-muted);
          background: var(--bg);
          border: 1px solid var(--border);
          padding: 0.3rem 0.7rem;
          border-radius: 6px;
        }

        .pf-project-body dl {
          display: grid;
          grid-template-columns: 110px 1fr;
          gap: 1rem;
          margin: 0;
        }

        .pf-project-body dt {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          color: var(--accent);
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
          padding-top: 0.1rem;
        }

        .pf-project-body dd {
          margin: 0;
          color: var(--text-muted);
          font-size: 0.95rem;
          line-height: 1.65;
        }

        /* ---------- Education Section ---------- */
        .pf-edu-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 1.5rem;
        }

        .pf-edu-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          transition: all 0.2s;
        }
        .pf-edu-card:hover { border-color: var(--border-glow); }

        .pf-edu-period {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.82rem;
          color: var(--accent);
          margin-bottom: 0.4rem;
          font-weight: 600;
        }

        .pf-edu-school {
          font-size: 1.25rem;
          font-weight: 700;
          margin: 0 0 0.3rem 0;
        }

        .pf-edu-detail {
          color: var(--text-muted);
          font-size: 0.95rem;
        }

        .pf-edu-gpa {
          font-family: 'JetBrains Mono', monospace;
          font-size: 1rem;
          font-weight: 700;
          background: var(--chip-bg);
          color: var(--chip-text);
          padding: 0.6rem 1rem;
          border-radius: 12px;
          border: 1px solid var(--border);
          white-space: nowrap;
        }

        /* ---------- Contact Section ---------- */
        .pf-contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-top: 2rem;
        }

        .pf-contact-card {
          background: var(--bg-card);
          border: 1px solid var(--border);
          border-radius: 16px;
          padding: 2rem;
          text-decoration: none;
          color: var(--text-main);
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
          transition: all 0.3s ease;
          position: relative;
          cursor: pointer;
        }

        .pf-contact-card:hover {
          border-color: var(--accent);
          transform: translateY(-4px);
          box-shadow: var(--shadow);
        }

        .pf-contact-card-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: var(--chip-bg);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
        }

        .pf-contact-card-label {
          font-size: 0.78rem;
          color: var(--text-faint);
          font-family: 'JetBrains Mono', monospace;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .pf-contact-card-value {
          font-size: 1.05rem;
          font-weight: 600;
          word-break: break-word;
        }

        .pf-foot-note {
          margin-top: 4rem;
          font-size: 0.85rem;
          color: var(--text-faint);
          text-align: center;
          font-family: 'JetBrains Mono', monospace;
        }

        /* ---------- Responsive Media Queries ---------- */
        @media (max-width: 1100px) {
          .pf-root { flex-direction: column; }
          .pf-rail { display: none; }
          .pf-topbar {
            display: flex;
            width: 100%;
            flex: none;
          }
          .pf-main {
            width: 100%;
            flex: none;
          }
          .pf-section { padding: 4.5rem 3rem; }
          .pf-contact-grid { grid-template-columns: repeat(2, 1fr); }
        }

        @media (max-width: 1024px) {
          .pf-bento-grid { grid-template-columns: 1fr; }
          .pf-bento-card.span-2 { grid-column: span 1; }
          .pf-project-card { grid-template-columns: 1fr; gap: 1.5rem; }
        }

        @media (max-width: 860px) {
          .pf-section { padding: 4rem 1.5rem; }
          .pf-skills-grid { grid-template-columns: 1fr; }
          .pf-edu-card { flex-direction: column; align-items: flex-start; gap: 1rem; }
        }

        @media (max-width: 600px) {
          .pf-topbar { padding: 0.75rem 1rem; }
          .pf-section { padding: 3.5rem 1rem; }
          .pf-h1 { font-size: clamp(2.15rem, 12vw, 3.1rem); }
          .pf-h2 { font-size: 1.75rem; margin-bottom: 1.75rem; }
          .pf-lede { font-size: 1rem; }
          .pf-cta-row { flex-direction: column; }
          .pf-btn { justify-content: center; width: 100%; }
          .pf-bento-card,
          .pf-skill-card,
          .pf-project-card,
          .pf-edu-card,
          .pf-contact-card { padding: 1.25rem; }
          .pf-project-body dl { grid-template-columns: 1fr; gap: 0.35rem; }
          .pf-project-body dd { margin-bottom: 0.7rem; }
          .pf-contact-grid { grid-template-columns: 1fr; gap: 1rem; }
        }
      `}</style>

      {/* Mouse glowing follower */}
      <div className="cursor-glow" style={{ left: `${mousePos.x}px`, top: `${mousePos.y}px` }} />

      {/* Desktop Navigation Rail */}
      <nav className="pf-rail">
        <div>
          <div className="pf-profile-header">
            <div className="pf-avatar">VM</div>
            <div>
              <p className="pf-rail-name">{PROFILE.name}</p>
              <p className="pf-rail-role">Full-Stack Developer</p>
            </div>
          </div>
          <div className="pf-status-badge">
            <span className="pf-status-dot" /> Open to Co-op Placement
          </div>
          <ul className="pf-nav-list">
            {NAV.map((n) => (
              <li key={n.id} className={`pf-nav-item ${active === n.id ? "active" : ""}`}>
                <button onClick={() => goTo(n.id)}>{n.label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="pf-rail-foot">
          <div className="pf-rail-foot-row">
            <span style={{ fontSize: "0.8rem", color: "var(--text-faint)" }}>Appearance</span>
            <button className="pf-theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
              {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
          <a className="pf-icon-link" href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
            <FaGithub size={15} /> {PROFILE.github}
          </a>
          <span className="pf-icon-link">
            {PROFILE.email}
          </span>
        </div>
      </nav>

      {/* Mobile Topbar */}
      <div className="pf-topbar">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div className="pf-avatar" style={{ width: "36px", height: "36px", fontSize: "0.9rem" }}>VM</div>
          <span style={{ fontWeight: 700, fontSize: "1rem" }}>{PROFILE.name}</span>
        </div>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <button className="pf-theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle Theme">
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button className="pf-menu-btn" onClick={() => setNavOpen(true)} aria-label="Open Menu">
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Menu */}
      <div className={`pf-mobile-menu ${navOpen ? "open" : ""}`}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <span style={{ fontWeight: 700, fontSize: "1.2rem" }}>Navigation</span>
          <button className="pf-menu-btn" onClick={() => setNavOpen(false)} aria-label="Close Menu">
            <X size={22} />
          </button>
        </div>
        <ul className="pf-nav-list" style={{ gap: "0.8rem" }}>
          {NAV.map((n) => (
            <li key={n.id} className={`pf-nav-item ${active === n.id ? "active" : ""}`}>
              <button onClick={() => goTo(n.id)} style={{ fontSize: "1.2rem", padding: "0.8rem 1rem" }}>{n.label}</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content Area */}
      <main className="pf-main">
        {/* HERO SECTION */}
        <section id="top" className="pf-section">
          <p className="pf-eyebrow">Portfolio 2026</p>
          <h1 className="pf-h1">
            Computer Science Student <span>& Full-Stack Developer</span>
          </h1>
          <p className="pf-lede">
            Fourth-year Computer Science and Software Development Innovation student at Sripatum University. Experienced in building web applications using React, Node.js, and ASP.NET Core.
          </p>
          <div className="pf-cta-row">
            <button className="pf-btn pf-btn-solid" onClick={() => goTo("projects")}>
              Explore Projects <ArrowUpRight size={18} />
            </button>
            <button className="pf-btn pf-btn-outline" onClick={() => goTo("contact")}>
              Get in Touch
            </button>
          </div>
        </section>

        {/* ABOUT / BENTO GRID */}
        <section id="about" className="pf-section">
          <p className="pf-eyebrow">About Me</p>
          <h2 className="pf-h2">Engineering with purpose</h2>
          <div className="pf-bento-grid">
            <div className="pf-bento-card span-2">
              <p className="pf-bento-title"><Terminal size={20} color="var(--accent)" /> About Me</p>
              <p className="pf-bento-desc">
                Fourth-year Computer Science and Software Development Innovation student at Sripatum University
                with hands-on experience in full-stack web development using React, Node.js, Express.js, and PostgreSQL.
                Interested in building scalable, user-focused web applications through practical projects.
              </p>
            </div>
            <div className="pf-bento-card span-1">
              <p className="pf-bento-title"><MapPin size={20} color="var(--accent)" /> Location</p>
              <p className="pf-bento-desc">
                Based in <b>Bangkok, Thailand</b>. Currently seeking cooperative education opportunities to contribute to dynamic software teams.
              </p>
            </div>
            <div className="pf-bento-card span-1">
              <p className="pf-bento-title"><BookOpen size={20} color="var(--accent)" /> Academic Standing</p>
              <p className="pf-bento-desc">
                B.Sc. in Computer Science and Software Development Innovation at the Faculty of Information Technology.
                Current GPAX: <b>3.83</b>.
              </p>
            </div>
            <div className="pf-bento-card span-2">
              <p className="pf-bento-title"><Sparkles size={20} color="var(--accent)" /> Core Focus</p>
              <p className="pf-bento-desc">
                Full-stack web development with JavaScript, React, Node.js, Express.js, PostgreSQL, and REST APIs.
              </p>
            </div>
          </div>
        </section>

        {/* SKILLS SECTION */}
        <section id="skills" className="pf-section">
          <p className="pf-eyebrow">Technical Arsenal</p>
          <h2 className="pf-h2">Skills & Technologies</h2>
          <div className="pf-skills-grid">
            {SKILLS.map((g) => (
              <div key={g.group} className="pf-skill-card">
                <div className="pf-skill-group-title">
                  {g.icon} {g.group}
                </div>
                <div className="pf-skill-chip-row">
                  {g.items.map((i) => (
                    <span key={i} className="pf-skill-chip">{i}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "3rem", background: "var(--bg-card)", border: "1px solid var(--border)", borderRadius: "16px", padding: "2rem" }}>
            <p style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.5rem" }}>Language Proficiency</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem" }}>
              {LANGUAGES.map((l) => (
                <div key={l.name}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem", fontSize: "0.95rem", fontWeight: 600 }}>
                    <span>{l.name}</span>
                    <span className="pf-mono" style={{ color: "var(--accent)" }}>{l.level}</span>
                  </div>
                  <div style={{ width: "100%", height: "8px", background: "var(--bg)", borderRadius: "4px", overflow: "hidden", border: "1px solid var(--border)" }}>
                    <div style={{ width: `${l.pct}%`, height: "100%", background: "var(--accent-gradient)", borderRadius: "4px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS SECTION */}
        <section id="projects" className="pf-section">
          <p className="pf-eyebrow">Featured Work</p>
          <h2 className="pf-h2">What I've Built</h2>
          <div className="pf-projects-list">
            {PROJECTS.map((p) => (
              <article key={p.name} className="pf-project-card">
                <div className="pf-project-left">
                  <div>
                    <span className="pf-project-year">{p.year} — {p.tag}</span>
                    <h3 className="pf-project-name">{p.name}</h3>
                  </div>
                  <div className="pf-project-tech">
                    {p.tech.map((t) => (
                      <span key={t} className="pf-tech-chip">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="pf-project-body">
                  <dl>
                    <dt>Problem</dt>
                    <dd>{p.problem}</dd>
                    <dt>Solution</dt>
                    <dd>{p.solution}</dd>
                    <dt>My Role</dt>
                    <dd>{p.role}</dd>
                    <dt>Outcome</dt>
                    <dd>{p.outcome}</dd>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* EDUCATION SECTION */}
        <section id="education" className="pf-section">
          <p className="pf-eyebrow">Background</p>
          <h2 className="pf-h2">Education Journey</h2>
          <div className="pf-edu-grid">
            {EDUCATION.map((e) => (
              <div key={e.school} className="pf-edu-card">
                <div>
                  <div className="pf-edu-period">{e.period}</div>
                  <h3 className="pf-edu-school">{e.school}</h3>
                  <div className="pf-edu-detail">{e.detail}</div>
                </div>
                <div className="pf-edu-gpa">{e.meta}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT SECTION */}
        <section id="contact" className="pf-section">
          <p className="pf-eyebrow">Get in Touch</p>
          <h2 className="pf-h2">Let's build something great</h2>
          <p className="pf-lede">
            I am actively looking for cooperative education opportunities. Feel free to reach out via email or phone — I'm ready to send over my full CV.
          </p>
          <div className="pf-contact-grid">
            <div className="pf-contact-card">
              <div className="pf-contact-card-icon"><Phone size={22} /></div>
              <span className="pf-contact-card-label">Phone</span>
              <span className="pf-contact-card-value">{PROFILE.phone}</span>
            </div>
            <div className="pf-contact-card" onClick={copyEmail}>
              <div className="pf-contact-card-icon">
                {copied ? <CheckCircle2 size={22} color="#10b981" /> : <Send size={22} />}
              </div>
              <span className="pf-contact-card-label">Quick Copy Email</span>
              <span className="pf-contact-card-value">{copied ? "Copied to clipboard!" : PROFILE.email}</span>
            </div>
            <a className="pf-contact-card" href={PROFILE.githubUrl} target="_blank" rel="noreferrer">
              <div className="pf-contact-card-icon"><FaGithub size={22} /></div>
              <span className="pf-contact-card-label">GitHub Profile</span>
              <span className="pf-contact-card-value">{PROFILE.github} <ExternalLink size={14} style={{ display: "inline", marginLeft: "4px" }} /></span>
            </a>
          </div>
          <div className="pf-foot-note">
            © 2026 Varakorn Matures. Built with React & Modern CSS.
          </div>
        </section>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<Portfolio />);