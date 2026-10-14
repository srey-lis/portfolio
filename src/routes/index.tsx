import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Braces,
  Check,
  ChevronDown,
  Code2,
  Database,
  Download,
  ExternalLink,
  Github,
  Mail,
  Menu,
  Moon,
  Phone,
  Smartphone,
  Sparkles,
  Sun,
  LoaderCircle,
  Send,
  Terminal,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { portfolioContent } from "@/data/portfolio-content";
import { sendTelegramMessage } from "@/lib/send-telegram-message";

const {
  identity,
  hero,
  about: aboutContent,
  stats,
  navigation: nav,
  roles,
  projects,
  skills,
  strengths,
  certificates,
  interests,
  timeline,
  reference,
  contact,
  technologies,
} = portfolioContent;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: `${portfolioContent.identity.name} — ${portfolioContent.identity.title}`,
      },
      {
        name: "description",
        content: portfolioContent.identity.description,
      },
      {
        property: "og:title",
        content: `${portfolioContent.identity.name} — ${portfolioContent.identity.title}`,
      },
      {
        property: "og:description",
        content: portfolioContent.identity.socialDescription,
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let frame = 0;
    const tick = (time: number) => {
      const progress = Math.min((time - start) / 1100, 1);
      setValue(Math.round(end * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [end, inView]);
  return (
    <span ref={ref}>
      {String(value).padStart(2, "0")}
      {suffix}
    </span>
  );
}

function NetworkBackground() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const element = canvas.current;
    const ctx = element?.getContext("2d");
    if (!element || !ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0,
      height = 0,
      frame = 0;
    const nodes = Array.from({ length: 33 }, (_, i) => ({
      x: ((i * 73 + 21) % 101) / 101,
      y: ((i * 47 + 13) % 97) / 97,
      size: i % 6 === 0 ? 2.3 : 1.2,
      phase: i * 0.7,
    }));
    const resize = () => {
      width = element.clientWidth;
      height = element.clientHeight;
      element.width = width * devicePixelRatio;
      element.height = height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);
    const render = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((n) => ({
        x: n.x * width + (reduced ? 0 : Math.sin(time * 0.00035 + n.phase) * 15),
        y: n.y * height + (reduced ? 0 : Math.cos(time * 0.00028 + n.phase) * 12),
        size: n.size,
      }));
      points.forEach((p, i) => {
        points.slice(i + 1).forEach((q) => {
          const dist = Math.hypot(p.x - q.x, p.y - q.y);
          if (dist < 210) {
            ctx.strokeStyle = `rgba(75, 191, 224, ${0.13 * (1 - dist / 210)})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        });
        ctx.fillStyle = i % 5 === 0 ? "rgba(166, 127, 255, .7)" : "rgba(98, 211, 231, .65)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      if (!reduced) frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas aria-hidden="true" ref={canvas} className="network-canvas" />;
}

function SectionHeading({
  number,
  label,
  title,
  description,
}: {
  number: string;
  label: string;
  title: React.ReactNode;
  description?: string;
}) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <div className="section-kicker mb-5">
        <span>
          {number} / {label}
        </span>
      </div>
      <h2 className="section-title max-w-[760px]">{title}</h2>
      {description && (
        <p className="mt-5 max-w-[600px] text-base leading-8 text-muted-foreground">
          {description}
        </p>
      )}
    </Reveal>
  );
}

function Index() {
  const [role, setRole] = useState(0);
  const [typed, setTyped] = useState(0);
  const [filter, setFilter] = useState("All");
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<"idle" | "success" | "error">("idle");
  const [form, setForm] = useState({ name: "", telegram: "", message: "" });
  const [showLoader, setShowLoader] = useState(true);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  useEffect(() => {
    const saved = window.localStorage.getItem("portfolio-theme");
    if (saved === "light") {
      document.documentElement.classList.add("light");
      setTheme("light");
    }
  }, []);
  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("light", next === "light");
    window.localStorage.setItem("portfolio-theme", next);
    setTheme(next);
  };
  useEffect(() => {
    const timer = setTimeout(() => setShowLoader(false), 850);
    return () => clearTimeout(timer);
  }, []);
  useEffect(() => {
    const current = roles[role] ?? roles[0] ?? "Developer";
    const timer = setTimeout(
      () => {
        if (typed < current.length) setTyped(typed + 1);
        else {
          setTyped(0);
          setRole((role + 1) % roles.length);
        }
      },
      typed < current.length ? 65 : 1900,
    );
    return () => clearTimeout(timer);
  }, [role, typed]);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus("idle");
    try {
      await sendTelegramMessage({ data: form });
      setSendStatus("success");
      setForm({ name: "", telegram: "", message: "" });
    } catch {
      setSendStatus("error");
    } finally {
      setIsSending(false);
    }
  };
  return (
    <div className="site">
      <AnimatePresence>
        {showLoader && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="fixed inset-0 z-50 grid place-items-center bg-background"
          >
            <div className="text-center">
              <div className="mono text-3xl font-bold text-gradient">
                {identity.name.toUpperCase()}
                <span className="text-foreground">.</span>
              </div>
              <div className="mt-5 h-[2px] w-28 overflow-hidden bg-secondary">
                <motion.div
                  className="h-full bg-primary"
                  initial={{ x: "-100%" }}
                  animate={{ x: "0%" }}
                  transition={{ duration: 0.7 }}
                />
              </div>
              <div className="mono mt-4 text-[10px] uppercase text-muted-foreground">
                Initializing workspace
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <header className="site-header">
        <div className="header-inner">
          <a
            href="#home"
            className="flex items-center gap-3"
            aria-label={`${identity.name}, back to top`}
          >
            <span className="brand-mark">{identity.initials}</span>
            <span className="mono text-[15px] font-bold tracking-wide">
              {identity.name.toUpperCase()}
              <span className="text-primary">.</span>
            </span>
            <span className="mono ml-3 hidden border-l border-border pl-4 text-[10px] text-muted-foreground sm:inline">
              / DEV PORTFOLIO
            </span>
          </a>
          <nav aria-label="Main navigation" className="desktop-nav flex items-center gap-7">
            {nav.map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                {item}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="mono hidden items-center gap-2 text-[10px] text-muted-foreground lg:flex">
              <span className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_12px_var(--primary)]" />{" "}
              OPEN TO OPPORTUNITIES
            </span>
            <Button
              variant="outline"
              size="icon"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button
              variant="outline"
              size="icon"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              className="md:hidden"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        {menuOpen && (
          <nav
            aria-label="Mobile navigation"
            className="flex flex-col gap-0 border-t border-border bg-background px-5 py-3 md:hidden"
          >
            {nav.map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                className="nav-link border-b border-border py-4"
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      <main>
        <section id="home" className="hero">
          <div className="grid-bg absolute inset-0" />
          <NetworkBackground />
          <div className="hero-content">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
                className="mono mb-7 flex items-center gap-3 text-xs text-primary"
              >
                <span className="inline-block h-2 w-2 rounded-full bg-primary" /> {hero.greeting}
              </motion.div>
              <motion.h1
                className="hero-title"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.12, duration: 0.75 }}
              >
                {identity.displayName}
                <span className="text-gradient">.</span>
                <br />
                <span className="text-gradient">{hero.tagline}</span>
              </motion.h1>
              <div className="mono mt-7 h-7 text-sm text-soft sm:text-base">
                <span className="text-primary">&gt; </span>
                {(roles[role] ?? "Developer").slice(0, typed)}
                <span className="ml-0.5 animate-pulse text-primary">_</span>
              </div>
              <p className="hero-description mt-6 text-sm text-muted-foreground sm:text-base">
                {hero.description}
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button asChild variant="command" size="command">
                  <a href="#projects">
                    Explore my work <ArrowUpRight />
                  </a>
                </Button>
                <Button asChild variant="commandOutline" size="command">
                  <a href="#contact">
                    Let’s connect <ArrowRight />
                  </a>
                </Button>
                <Button asChild variant="commandOutline" size="command">
                  <a href={identity.cvPath} download={identity.cvFilename}>
                    Download CV <Download />
                  </a>
                </Button>
              </div>
              <div className="mono mt-14 flex items-center gap-3 text-[10px] uppercase text-muted-foreground">
                <ArrowDown className="h-4 w-4 animate-bounce text-primary" /> SCROLL TO EXPLORE{" "}
                <span className="ml-3 h-px w-16 bg-border" />
              </div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="portrait-wrap"
            >
              <div className="portrait-frame">
                <img
                  src={identity.portrait}
                  alt={`Portrait of ${identity.name}`}
                  width={1024}
                  height={1280}
                />
              </div>
              <div className="tech-chip glass -left-8 top-[12%]">
                <Code2 className="h-4 w-4 text-primary" /> HTML / CSS
              </div>
              <div className="tech-chip glass -right-6 top-[27%]">
                <Braces className="h-4 w-4 text-violet" /> C++
              </div>
              <div className="tech-chip glass -left-10 bottom-[28%]">
                <Smartphone className="h-4 w-4 text-primary" /> Flutter
              </div>
              <div className="tech-chip glass -right-5 bottom-[15%]">
                <Database className="h-4 w-4 text-primary" /> MySQL
              </div>
              <div className="tech-chip glass left-[30%] -bottom-3">
                <Terminal className="h-4 w-4 text-violet" /> Laravel
              </div>
            </motion.div>
          </div>
          <div className="absolute bottom-0 z-10 w-full border-t border-border/60 bg-background/60">
            <div className="mono mx-auto flex max-w-[1320px] justify-between gap-4 px-5 py-4 text-[9px] uppercase text-muted-foreground md:px-12">
              <span>DESIGN · DEVELOP · CONNECT</span>
              <span className="hidden sm:inline">PORTFOLIO / 2026</span>
              <span>
                STATUS: EXPLORING IDEAS <span className="text-primary">●</span>
              </span>
            </div>
          </div>
        </section>

        <section id="about" className="section section-alt">
          <div className="section-inner">
            <SectionHeading
              number="01"
              label="THE PERSON BEHIND THE CODE"
              title={
                <>
                  Curious by nature. <span className="text-gradient">Driven to build.</span>
                </>
              }
            />
            <div className="grid gap-14 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
              <Reveal>
                <p className="text-xl leading-relaxed text-foreground md:text-2xl">
                  {aboutContent.introduction}
                </p>
                {aboutContent.paragraphs.map((paragraph, index) => (
                  <p
                    key={paragraph}
                    className={`${index === 0 ? "mt-7" : "mt-5"} max-w-[650px] leading-8 text-muted-foreground`}
                  >
                    {paragraph}
                  </p>
                ))}
                <div className="mono mt-8 inline-flex items-center gap-3 border-l-2 border-primary pl-4 text-xs text-soft">
                  <Sparkles className="h-4 w-4 text-primary" /> {aboutContent.highlight}
                </div>
                <div className="mono mt-8 grid gap-3 text-xs text-soft sm:grid-cols-2">
                  {aboutContent.facts.map(([label, value]) => (
                    <span key={label}>
                      {label} / {value}
                    </span>
                  ))}
                </div>
              </Reveal>
              <Reveal
                delay={0.1}
                className="grid grid-cols-2 gap-px border border-border bg-border"
              >
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-surface p-6 sm:p-8">
                    <div
                      className={`stat-value ${stat.value === null ? "text-foreground" : "text-gradient"}`}
                    >
                      {stat.value === null ? "—" : <Counter end={stat.value} />}
                    </div>
                    <div className="mono mt-4 text-[10px] uppercase text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </Reveal>
            </div>
          </div>
        </section>

        <section id="skills" className="section">
          <div className="section-inner">
            <SectionHeading
              number="02"
              label="MY TOOLKIT"
              title={
                <>
                  A versatile stack for <span className="text-gradient">real-world problems.</span>
                </>
              }
              description="From interfaces to infrastructure, I enjoy working across the layers that make great products possible."
            />
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {skills.map((skill, i) => {
                const Icon = skill.icon;
                return (
                  <Reveal
                    key={skill.title}
                    delay={i * 0.07}
                    className="panel skill-panel p-6 sm:p-7"
                  >
                    <div className="mb-9 flex items-start justify-between">
                      <div className="grid h-11 w-11 place-items-center border border-primary/20 bg-primary/10 text-primary">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="mono text-[10px] text-muted-foreground">0{i + 1} / 06</span>
                    </div>
                    <h3 className="text-lg font-semibold">{skill.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{skill.summary}</p>
                    <div className="mt-8 flex flex-wrap gap-2">
                      {skill.items.map((item) => (
                        <span
                          key={item}
                          className="mono border border-border bg-secondary/40 px-3 py-2 text-[11px] text-soft"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <div className="mt-12 grid gap-8 border-t border-border pt-10 md:grid-cols-3">
              <div>
                <h3 className="mono mb-4 text-xs uppercase text-primary">Professional strengths</h3>
                <p className="text-sm leading-7 text-muted-foreground">{strengths}</p>
              </div>
              <div>
                <h3 className="mono mb-4 text-xs uppercase text-primary">Certificates</h3>
                <p className="text-sm leading-7 text-muted-foreground">{certificates}</p>
              </div>
              <div>
                <h3 className="mono mb-4 text-xs uppercase text-primary">Interests</h3>
                <p className="text-sm leading-7 text-muted-foreground">{interests}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="section section-alt">
          <div className="section-inner">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <SectionHeading
                number="03"
                label="SELECTED WORK"
                title={
                  <>
                    Ideas made <span className="text-gradient">real.</span>
                  </>
                }
                description="A selection of projects where curiosity turned into working systems."
              />
              <div className="mb-12 flex flex-wrap gap-2">
                {["All", ...new Set(projects.map((project) => project.category))].map((item) => (
                  <Button
                    key={item}
                    variant={filter === item ? "filterActive" : "filter"}
                    size="filter"
                    onClick={() => setFilter(item)}
                    aria-pressed={filter === item}
                  >
                    {item}
                  </Button>
                ))}
              </div>
            </div>
            <motion.div layout className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {projects
                  .filter((p) => filter === "All" || p.category === filter)
                  .map((project) => {
                    const Icon = project.icon;
                    return (
                      <motion.article
                        layout
                        key={project.title}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.3 }}
                        className="panel project-card overflow-hidden"
                      >
                        <div className="project-image relative">
                          <img
                            src={project.image}
                            alt={`${project.title} project concept preview`}
                            width={1280}
                            height={960}
                            loading="lazy"
                          />
                          <span className="mono absolute left-4 top-4 border border-border bg-background/85 px-3 py-2 text-[10px] uppercase backdrop-blur-md">
                            {project.category}
                          </span>
                        </div>
                        <div className="p-6">
                          <div className="mono mb-3 flex items-center justify-between text-[10px] text-muted-foreground">
                            <span>PROJECT / {project.number}</span>
                            <Icon className="h-4 w-4 text-primary" />
                          </div>
                          <h3 className="text-xl font-semibold">{project.title}</h3>
                          <p className="mt-3 min-h-[96px] text-sm leading-6 text-muted-foreground">
                            {project.description}
                          </p>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                className="mono border border-border px-2 py-1.5 text-[9px] text-soft"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                          <div className="mt-6 flex items-center gap-5 border-t border-border pt-5">
                            {project.repoUrl ? (
                              <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mono flex items-center gap-2 text-[10px] text-foreground hover:text-primary"
                              >
                                <Github className="h-4 w-4" /> Source code
                              </a>
                            ) : (
                              <span className="mono flex items-center gap-2 text-[10px] text-muted-foreground">
                                <Github className="h-4 w-4" /> Code unavailable
                              </span>
                            )}
                            {project.demoUrl ? (
                              <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="mono flex items-center gap-2 text-[10px] text-foreground hover:text-primary"
                              >
                                <ExternalLink className="h-4 w-4" /> Live demo
                              </a>
                            ) : (
                              <span className="mono flex items-center gap-2 text-[10px] text-muted-foreground">
                                <ExternalLink className="h-4 w-4" /> Demo unavailable
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.article>
                    );
                  })}
              </AnimatePresence>
            </motion.div>
          </div>
        </section>

        <section id="journey" className="section">
          <div className="section-inner">
            <SectionHeading
              number="04"
              label="EXPERIENCE & EDUCATION"
              title={
                <>
                  Learning by <span className="text-gradient">doing.</span>
                </>
              }
              description="The places and roles shaping my path in technology."
            />
            <div className="relative mx-auto max-w-[900px] pl-10 md:pl-16">
              <div className="timeline-line" />
              {timeline.map((entry, i) => {
                const Icon = entry.icon;
                return (
                  <Reveal
                    key={`${entry.title}-${entry.text}`}
                    delay={i * 0.1}
                    className="relative mb-10 last:mb-0"
                  >
                    <span className="absolute -left-[39px] top-1 h-[15px] w-[15px] rounded-full border-2 border-primary bg-background shadow-[0_0_16px_var(--primary)] md:-left-[63px]" />
                    <div className="panel p-6 md:p-8">
                      <div className="mono mb-4 flex items-center justify-between text-[10px] text-primary">
                        <span>{entry.phase}</span>
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold md:text-2xl">{entry.title}</h3>
                      <p className="mt-3 max-w-[600px] text-sm leading-7 text-muted-foreground">
                        {entry.text}
                      </p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
            <div className="mx-auto mt-12 max-w-[900px] border-t border-border pt-7">
              <div className="mono text-[10px] uppercase text-primary">Reference</div>
              <p className="mt-3 text-sm text-soft">{reference}</p>
            </div>
          </div>
        </section>

        <section id="github" className="section section-alt">
          <div className="section-inner">
            <SectionHeading
              number="05"
              label="DEVELOPER ACTIVITY"
              title={
                <>
                  Build. Learn. <span className="text-gradient">Repeat.</span>
                </>
              }
              description="A snapshot of the technologies and projects behind my work."
            />
            <div className="grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
              <Reveal className="panel overflow-hidden p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <Github className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">Development activity</h3>
                  </div>
                  <span className="mono text-[10px] text-muted-foreground">
                    ILLUSTRATIVE ACTIVITY MAP
                  </span>
                </div>
                <div className="mt-8 overflow-x-auto pb-2">
                  <div className="grid min-w-[620px] grid-flow-col grid-rows-7 gap-[5px]">
                    {Array.from({ length: 364 }, (_, i) => {
                      const level = (i * 17 + Math.floor(i / 7) * 11 + 13) % 13;
                      return (
                        <div
                          key={i}
                          className="heat-cell"
                          data-level={
                            level > 10 ? 4 : level > 7 ? 3 : level > 4 ? 2 : level > 2 ? 1 : 0
                          }
                        />
                      );
                    })}
                  </div>
                </div>
                <div className="mono mt-5 flex items-center justify-between gap-4 text-[10px] text-muted-foreground">
                  <span>CONCEPTUAL VISUALIZATION · NOT LIVE GITHUB DATA</span>
                  <div className="flex items-center gap-1">
                    LESS{" "}
                    {[0, 1, 2, 3, 4].map((level) => (
                      <span key={level} className="heat-cell h-3 w-3" data-level={level} />
                    ))}{" "}
                    MORE
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1} className="panel p-6 md:p-8">
                <div className="mono mb-7 text-[10px] uppercase text-primary">
                  TECHNOLOGIES I WORK WITH
                </div>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((item) => (
                    <span
                      key={item}
                      className="mono border border-border bg-secondary/40 px-3 py-2 text-[11px] text-soft"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mono mt-9 border-t border-border pt-5 text-[10px] leading-6 text-muted-foreground">
                  REPOSITORY LINKS AND LIVE STATISTICS WILL APPEAR WHEN A GITHUB PROFILE IS
                  CONNECTED.
                </div>
              </Reveal>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {projects.map((project) => (
                <Reveal
                  key={project.title}
                  className="flex items-center justify-between border border-border bg-background px-5 py-4"
                >
                  <div className="min-w-0">
                    <div className="mono text-[9px] uppercase text-primary">
                      {project.category} / PROJECT
                    </div>
                    <div className="mt-1 truncate text-sm font-medium">{project.title}</div>
                  </div>
                  <ArrowUpRight className="ml-3 h-4 w-4 shrink-0 text-muted-foreground" />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section">
          <div className="section-inner">
            <div className="grid gap-14 lg:grid-cols-[1fr_.9fr] lg:gap-24">
              <div>
                <SectionHeading
                  number="06"
                  label="GET IN TOUCH"
                  title={
                    <>
                      Have an idea? <span className="text-gradient">Let’s talk.</span>
                    </>
                  }
                  description="I’m interested in internships, collaborations, and opportunities to work on meaningful technology."
                />
                <Reveal>
                  <div className="mono mb-3 text-[10px] text-primary">CURRENTLY OPEN TO</div>
                  <p className="max-w-md text-xl leading-relaxed">{contact.availability}</p>
                  <div className="mt-10 flex flex-wrap gap-3">
                    <a
                      href={contact.phoneHref}
                      className="panel mono flex items-center gap-2 px-4 py-3 text-xs text-foreground hover:border-primary"
                    >
                      <Phone className="h-4 w-4 text-primary" /> {contact.phone}
                    </a>
                    {contact.email ? (
                      <a
                        href={`mailto:${contact.email}`}
                        className="panel mono flex items-center gap-2 px-4 py-3 text-xs text-foreground hover:border-primary"
                      >
                        <Mail className="h-4 w-4 text-primary" /> {contact.email}
                      </a>
                    ) : (
                      <span
                        className="panel mono flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground"
                        title="Email address not provided"
                      >
                        <Mail className="h-4 w-4 text-primary" /> Email —
                      </span>
                    )}
                    {contact.github ? (
                      <a
                        href={contact.github}
                        target="_blank"
                        rel="noreferrer"
                        className="panel mono flex items-center gap-2 px-4 py-3 text-xs text-foreground hover:border-primary"
                      >
                        <Github className="h-4 w-4 text-primary" /> GitHub
                      </a>
                    ) : (
                      <span
                        className="panel mono flex items-center gap-2 px-4 py-3 text-xs text-muted-foreground"
                        title="GitHub profile not provided"
                      >
                        <Github className="h-4 w-4 text-primary" /> GitHub —
                      </span>
                    )}
                  </div>
                </Reveal>
              </div>
              <Reveal delay={0.1} className="panel p-6 md:p-8">
                <div className="mb-7 flex items-center justify-between">
                  <span className="mono text-xs text-primary">&gt; NEW_MESSAGE</span>
                  <span className="h-2 w-2 rounded-full bg-primary" />
                </div>
                <form onSubmit={submitMessage} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <label className="block">
                      <span className="mono mb-2 block text-[10px] uppercase text-soft">
                        Your name
                      </span>
                      <input
                        className="input-field"
                        required
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                      />
                    </label>
                    <label className="block">
                      <span className="mono mb-2 block text-[10px] uppercase text-soft">
                        Your Telegram
                      </span>
                      <input
                        className="input-field"
                        required
                        type="text"
                        placeholder="@username or t.me/username"
                        autoComplete="off"
                        pattern="\s*(@?[A-Za-z0-9_]{5,32}|(?:https?://)?(?:www\.)?t\.me/[A-Za-z0-9_]{5,32})\s*"
                        title="Enter your Telegram username or a t.me link to your profile"
                        value={form.telegram}
                        onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                      />
                    </label>
                  </div>
                  <label className="block">
                    <span className="mono mb-2 block text-[10px] uppercase text-soft">
                      Your message
                    </span>
                    <textarea
                      className="input-field min-h-[155px] resize-y"
                      required
                      placeholder="Tell me what you’re thinking..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                    />
                  </label>
                  <Button
                    variant="command"
                    size="command"
                    type="submit"
                    className="w-full"
                    disabled={isSending}
                  >
                    {isSending ? (
                      <>
                        Sending <LoaderCircle className="animate-spin" />
                      </>
                    ) : sendStatus === "success" ? (
                      <>
                        Message sent <Check />
                      </>
                    ) : (
                      <>
                        Send message <Send />
                      </>
                    )}
                  </Button>
                  <p
                    className="mono text-center text-[10px] leading-5 text-muted-foreground"
                    aria-live="polite"
                  >
                    {sendStatus === "success"
                      ? "MESSAGE SENT TO TELEGRAM"
                      : sendStatus === "error"
                        ? "MESSAGE COULD NOT BE SENT. PLEASE TRY AGAIN."
                        : "YOUR MESSAGE WILL BE SENT PRIVATELY TO TELEGRAM."}
                  </p>
                </form>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer px-5 py-8 md:px-12">
        <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="brand-mark !h-7 !w-7 !text-sm">{identity.initials}</span>
            <span className="mono text-xs font-bold">
              {identity.name.toUpperCase()}
              <span className="text-primary">.</span>
            </span>
            <span className="mono ml-3 text-[10px] text-muted-foreground">
              DESIGNED TO BUILD WHAT’S NEXT.
            </span>
          </div>
          <div className="mono flex items-center gap-6 text-[10px] text-muted-foreground">
            <span>
              © {new Date().getFullYear()} {identity.name.toUpperCase()}
            </span>
            <a
              href="#home"
              className="flex items-center gap-1 transition-colors hover:text-primary"
            >
              BACK TO TOP <ChevronDown className="h-3 w-3 rotate-180" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
