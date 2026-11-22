"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { ParticleName } from "./particles"

const INK = "#14213d"
const PAPER = "#f1ece1"
const CORAL = "#e4572e"

const disciplines = ["AI & Apps", "LLM Security", "Education"]

const capabilities = [
  {
    no: "01 / AI & APPS",
    title: "Apps that listen.",
    body: "Android products where AI does the heavy lifting quietly — instant voice translation, study companions and Arabic-first experiences that feel native.",
    tags: ["ANDROID", "VOICE AI", "LLMS"],
  },
  {
    no: "02 / LLM SECURITY",
    title: "Models that hold up.",
    body: "Prompt injection, jailbreaks and guardrails. Learning how language models fail so the systems built on them can be trusted.",
    tags: ["PROMPT INJECTION", "AI RED TEAMING", "GUARDRAILS"],
  },
  {
    no: "03 / SECURITY FOUNDATIONS",
    title: "A base that doesn't crack.",
    body: "Active Directory, red teaming and secure code review — the offensive habits that shape how I design every product.",
    tags: ["ACTIVE DIRECTORY", "RED TEAM", "CODE REVIEW"],
  },
]

const work = [
  {
    kind: "FEATURED · ANDROID",
    name: "Tarjuman",
    ar: "تُرجُمَان",
    sub: "Instant voice translation in your ear",
    body: "Speak your language and hear the other person in yours. Live conversation translation across 29 languages, with 990 ready phrases and a 197-country guide that work offline. Free on Android.",
    rows: [
      ["LANGUAGES", "29"],
      ["OFFLINE", "990 phrases · 197-country guide"],
      ["PLATFORM", "Android"],
      ["PRICE", "Free"],
    ],
    href: "https://tarjuman.academysenpai.com/",
    cta: "Visit Tarjuman",
  },
  {
    kind: "ANDROID",
    name: "Murshidi",
    ar: "مُرشدي",
    sub: "Organize your study, focus more",
    body: "An Android app for university students: plan the semester, keep track of what matters and stay focused.",
    rows: [
      ["AUDIENCE", "University students"],
      ["PLATFORM", "Android"],
    ],
    href: "https://murshidi.academysenpai.com",
    cta: "Visit Murshidi",
  },
]

const platforms = [
  {
    name: "Senpai Academy",
    body: "The main educational hub for cybersecurity students — guides, roadmaps and Arabic study resources.",
    href: "https://academysenpai.com/",
    tags: ["EDUCATION", "HUB"],
  },
  {
    name: "Senpai Type",
    body: "A clean typing practice platform built for the community.",
    href: "https://senpai-type.pages.dev/",
    tags: ["WEB", "PRACTICE"],
  },
]

const certs = [
  ["CRTOM", "Certified Red Team Operations Management", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/d657f0cea24f0a01"],
  ["CCEP", "Certified Cybersecurity Educator Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/f0bca6d0009ba4a4"],
  ["CLLMSE", "Certified LLM Security Expert", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/9b6a7262b25aa53c"],
  ["CTIGA", "Certified Threat Intelligence & Governance Analyst", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/b8450d92d9436a88"],
  ["CLLMSP", "Certified LLM Security Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/390ef6e2fcffb8ef"],
  ["CCPP", "Certified C++ Practitioner Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/8123078bdedc5980"],
  ["CECB", "Certified Encryption and Cryptography Beginners", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/6fe91601f35c090a"],
  ["CHTAP", "Certified Human Trafficking Awareness Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/9ef3043a12d06c4d"],
  ["CSCRB", "Certified Security Code Review Beginners", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/592dd1205b5e4acd"],
  ["CCF", "Certified Cybersecurity Foundations", "Hackviser", "https://hackviser.com/verify?id=HV-CORE-GO4EUP42"],
]

const story = [
  ["01", "Security", "Started with cybersecurity — Active Directory, red teaming and a habit of breaking things to understand them."],
  ["02", "Teaching", "Founded Senpai Academy to put advanced topics into clear Arabic for students."],
  ["03", "Shipping", "Built and launched Android apps: Tarjuman and Murshidi."],
  ["04", "Now", "Going deep on AI — LLMs, agents and how to keep them safe."],
]

const links = [
  ["GITHUB", "@ROBIN-SENPAI", "https://github.com/ROBIN-SENPAI"],
  ["TELEGRAM", "Senpai Academy channel", "https://t.me/SENPAI_ACADMEY"],
  ["TRYHACKME", "ROBiN", "https://tryhackme.com/p/ROBiN"],
]

const marquee = ["AI", "LLMs", "Android", "Voice AI", "LLM Security", "Red Teaming", "Active Directory", "Arabic-first", "Education"]

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Head({ no, label, title, sub }: { no: string; label: string; title: string; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="font-mono text-[11px] tracking-[0.25em] opacity-60">
        {no} <span className="mx-2">/</span> {label}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
      {sub && <p className="mt-5 max-w-xl text-base leading-relaxed opacity-70 md:text-lg">{sub}</p>}
    </Reveal>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider" style={{ borderColor: `${INK}33` }}>
      {children}
    </span>
  )
}

export default function V2() {
  const [loaded, setLoaded] = useState(false)
  const [count, setCount] = useState(0)
  const [epoch, setEpoch] = useState(0)

  useEffect(() => {
    let seen = false
    try {
      seen = sessionStorage.getItem("mbf-intro") === "1" || window.matchMedia("(prefers-reduced-motion: reduce)").matches
    } catch {}
    if (seen) {
      setLoaded(true)
      return
    }
    let n = 0
    const id = setInterval(() => {
      n += 4 + Math.random() * 6
      if (n >= 100) {
        n = 100
        clearInterval(id)
        try {
          sessionStorage.setItem("mbf-intro", "1")
        } catch {}
        setTimeout(() => setLoaded(true), 250)
      }
      setCount(Math.round(n))
    }, 55)
    return () => clearInterval(id)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setEpoch((e) => e + 1), 900)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      className="relative min-h-screen overflow-x-hidden font-[family-name:var(--font-v2)]"
      style={{ background: PAPER, color: INK, scrollBehavior: "smooth" }}
    >
      <style>{`html{scroll-behavior:smooth} ::selection{background:${CORAL};color:#fff} a:focus-visible,button:focus-visible{outline:2px solid ${CORAL};outline-offset:4px} @media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}*{animation:none!important}}`}</style>

      <AnimatePresence>
        {!loaded && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-end justify-between p-6 md:p-10"
            style={{ background: PAPER }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="font-mono text-[11px] tracking-[0.25em] opacity-60">LOADING MODELS…</p>
            <p className="text-7xl font-bold tabular-nums md:text-9xl">{String(count).padStart(3, "0")}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO */}
      <header className="relative h-[100svh] min-h-[560px]">
        <ParticleName text="BAQIR" />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-5 font-mono text-[10px] tracking-[0.2em] md:p-8 md:text-[11px]">
          <span>MBF / PORTFOLIO</span>
          <span>STATUS: LEARNING AI</span>
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-8">
          <div className="font-mono text-[10px] tracking-[0.2em] md:text-[11px]">
            <p>
              <span style={{ color: CORAL }}>●</span> BUILDING · SHIPPING · SECURING
            </p>
            <p className="mt-2 opacity-60">ITERATION {String(epoch).padStart(4, "0")}</p>
            <p className="mt-4 opacity-60">TOUCH THE PARTICLES</p>
          </div>
          <p className="text-5xl font-bold md:text-8xl" style={{ color: CORAL }}>
            ↓
          </p>
        </div>
      </header>

      {/* INTRO */}
      <section className="px-5 pb-24 pt-10 md:px-12 md:pb-36">
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <h1 className="text-5xl font-bold leading-[1.02] tracking-tight md:text-8xl">
              Hi, I&apos;m Mohammed<span style={{ color: CORAL }}>.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed opacity-75 md:text-2xl">
              A developer building AI-powered Arabic apps and educational platforms — and learning how to keep
              intelligent systems secure.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-6 font-mono text-xs tracking-[0.2em] md:text-sm">
            {disciplines.map((d, i) => (
              <span key={d}>
                <span style={{ color: CORAL }}>{String(i + 1).padStart(2, "0")}</span> {d.toUpperCase()}
              </span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* MISSION */}
      <section className="px-5 py-20 md:px-12 md:py-32" style={{ borderTop: `1px solid ${INK}22` }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] opacity-60">01 / MISSION</p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">Make technology speak our language.</h2>
          </Reveal>
          <Reveal delay={0.1} className="space-y-6 text-lg leading-relaxed opacity-80 md:text-xl">
            <p>
              I build products and knowledge in Arabic that make advanced technology practical and accessible.
              I&apos;m the founder of <strong>Senpai Academy</strong>, and my work has been recognized by several Iraqi
              universities, with first place in multiple technical competitions.
            </p>
            <p>
              Today my focus is artificial intelligence: shipping apps that use it well, and understanding how it can be
              attacked so it can be defended.
            </p>
            <div className="grid grid-cols-3 gap-4 pt-6 font-mono text-[10px] tracking-[0.2em] md:text-xs">
              {[
                ["4", "LIVE PLATFORMS"],
                ["10", "CERTIFICATIONS"],
                ["1ST", "PLACE · COMPETITIONS"],
              ].map(([v, l]) => (
                <div key={l}>
                  <p className="text-4xl font-bold md:text-5xl" style={{ color: CORAL }}>
                    {v}
                  </p>
                  <p className="mt-2 opacity-60">{l}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CAPABILITIES */}
      <section className="px-5 py-20 md:px-12 md:py-32" style={{ background: INK, color: PAPER }}>
        <div className="mx-auto max-w-6xl">
          <Head
            no="02"
            label="CAPABILITIES"
            title="Three disciplines. One standard."
            sub="Where intelligence, product and security meet — every detail treated like it matters."
          />
          <div className="grid gap-px md:grid-cols-3" style={{ background: `${PAPER}22` }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.08} className="h-full">
                <div style={{ background: INK }} className="flex h-full flex-col gap-5 p-7 md:p-9">
                  <p className="font-mono text-[11px] tracking-[0.2em]" style={{ color: CORAL }}>
                    {c.no}
                  </p>
                  <h3 className="text-3xl font-bold tracking-tight">{c.title}</h3>
                  <p className="leading-relaxed opacity-70">{c.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-wider" style={{ borderColor: `${PAPER}33` }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* MARQUEE */}
      <div className="overflow-hidden py-6 font-mono text-sm tracking-[0.25em]" style={{ borderBlock: `1px solid ${INK}22` }}>
        <div className="flex w-max animate-[v2marquee_30s_linear_infinite] gap-10 whitespace-nowrap">
          {[...marquee, ...marquee, ...marquee].map((m, i) => (
            <span key={i}>
              {m.toUpperCase()} <span style={{ color: CORAL }}>/</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes v2marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* WORK */}
      <section className="px-5 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Head no="03" label="SELECTED WORK" title="Things I've built." sub="Two Android apps and the platforms behind the academy." />

          <div className="space-y-6">
            {work.map((w) => (
              <Reveal key={w.name}>
                <a
                  href={w.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid gap-8 rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 md:grid-cols-[1.2fr_1fr] md:p-12"
                  style={{ background: "#fffaf0", border: `1px solid ${INK}22` }}
                >
                  <div>
                    <p className="font-mono text-[11px] tracking-[0.25em]" style={{ color: CORAL }}>
                      {w.kind}
                    </p>
                    <h3 className="mt-4 flex flex-wrap items-baseline gap-x-4 text-5xl font-bold tracking-tight md:text-7xl">
                      {w.name}
                      <span className="font-[family-name:var(--font-ar)] text-3xl font-extrabold opacity-60 md:text-5xl" dir="rtl">
                        {w.ar}
                      </span>
                    </h3>
                    <p className="mt-3 text-xl font-medium opacity-80">{w.sub}</p>
                    <p className="mt-5 max-w-lg leading-relaxed opacity-70">{w.body}</p>
                    <span className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs tracking-[0.2em] transition-colors" style={{ background: INK, color: PAPER }}>
                      {w.cta.toUpperCase()} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <dl className="self-end font-mono text-[11px] tracking-[0.15em]">
                    {w.rows.map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between" style={{ borderTop: `1px solid ${INK}22` }}>
                        <dt className="opacity-50">{k}</dt>
                        <dd className="sm:text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                </a>
              </Reveal>
            ))}

            <div className="grid gap-6 md:grid-cols-2">
              {platforms.map((p) => (
                <Reveal key={p.name}>
                  <a
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex h-full flex-col justify-between gap-8 rounded-3xl p-7 transition-transform duration-500 hover:-translate-y-1 md:p-9"
                    style={{ border: `1px solid ${INK}33` }}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{p.name}</h3>
                      <ArrowUpRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: CORAL }} />
                    </div>
                    <div>
                      <p className="leading-relaxed opacity-70">{p.body}</p>
                      <div className="mt-5 flex gap-2">
                        {p.tags.map((t) => (
                          <Tag key={t}>{t}</Tag>
                        ))}
                      </div>
                    </div>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section className="px-5 py-20 md:px-12 md:py-32" style={{ background: "#e9e2d2" }}>
        <div className="mx-auto max-w-6xl">
          <Head no="04" label="CREDENTIALS" title="Verified, not just claimed." sub="Ten certifications — each one links to its verification page." />
          <div>
            {certs.map(([ac, title, issuer, href], i) => (
              <Reveal key={ac} delay={Math.min(i, 5) * 0.03}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 md:grid-cols-[110px_1fr_160px_auto] md:gap-8"
                  style={{ borderTop: `1px solid ${INK}22` }}
                >
                  <span className="font-mono text-xs tracking-[0.2em] md:text-sm" style={{ color: CORAL }}>
                    {ac}
                  </span>
                  <span className="text-base font-medium leading-snug transition-transform duration-300 group-hover:translate-x-1 md:text-xl">{title}</span>
                  <span className="hidden font-mono text-[11px] tracking-[0.15em] opacity-50 md:block">{issuer.toUpperCase()}</span>
                  <ArrowUpRight className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${INK}22` }} />
          </div>
        </div>
      </section>

      {/* STORY */}
      <section className="px-5 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Head no="05" label="STORY" title="Learned by building." sub="Security first, then teaching, then shipping — now AI." />
          <div className="grid gap-px sm:grid-cols-2 md:grid-cols-4" style={{ background: `${INK}22` }}>
            {story.map(([n, t, b], i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 p-7" style={{ background: PAPER }}>
                  <p className="text-5xl font-bold" style={{ color: i === 3 ? CORAL : `${INK}33` }}>
                    {n}
                  </p>
                  <h3 className="text-2xl font-bold">{t}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer className="px-5 py-20 md:px-12 md:py-32" style={{ background: INK, color: PAPER }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className="font-mono text-[11px] tracking-[0.25em] opacity-60">06 / CONTACT</p>
            <h2 className="mt-4 text-5xl font-bold leading-[1] tracking-tight md:text-8xl">
              Let&apos;s build something that matters<span style={{ color: CORAL }}>.</span>
            </h2>
            <p className="mt-6 max-w-xl text-lg opacity-70">Have an idea, a project or a question about AI, apps or security? Reach out.</p>
          </Reveal>
          <div className="mt-14">
            {links.map(([k, v, href]) => (
              <a
                key={k}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-6"
                style={{ borderTop: `1px solid ${PAPER}22` }}
              >
                <span className="font-mono text-xs tracking-[0.25em] opacity-60">{k}</span>
                <span className="text-xl font-medium transition-transform duration-300 group-hover:-translate-x-1 md:text-3xl">{v}</span>
                <ArrowUpRight className="h-5 w-5" style={{ color: CORAL }} />
              </a>
            ))}
            <div style={{ borderTop: `1px solid ${PAPER}22` }} />
          </div>
          <div className="mt-14 flex items-center justify-between font-mono text-[11px] tracking-[0.2em] opacity-60">
            <span>© {new Date().getFullYear()} MOHAMMED BAQIR FIRAS</span>
            <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }) }}>
              ↑ TOP
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
