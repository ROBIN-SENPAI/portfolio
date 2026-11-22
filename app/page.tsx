"use client"

import type React from "react"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { Signal } from "./signal"

const BLACK = "#0a0a0a"
const PANEL = "#141414"
const ORANGE = "#ff5a00"
const WHITE = "#f5f2ee"

const nav = [
  ["About", "#about"],
  ["Focus", "#focus"],
  ["Work", "#work"],
  ["Credentials", "#credentials"],
  ["Contact", "#contact"],
]

const focus = [
  {
    no: "01",
    title: "AI Apps",
    body: "Android products where AI works quietly in the background — live voice translation, study companions, Arabic-first experiences.",
    tags: ["Android", "Voice AI", "LLMs"],
  },
  {
    no: "02",
    title: "LLM Security",
    body: "Prompt injection, jailbreaks and guardrails. Learning how language models fail so the systems built on them can be trusted.",
    tags: ["Prompt injection", "AI red teaming", "Guardrails"],
  },
  {
    no: "03",
    title: "Security Base",
    body: "Active Directory, red teaming and secure code review — the offensive habits that shape how every product gets designed.",
    tags: ["Active Directory", "Red team", "Code review"],
  },
]

const certs: [string, string, string, string, boolean][] = [
  ["CLLMSE", "Certified LLM Security Expert", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/9b6a7262b25aa53c", true],
  ["CLLMSP", "Certified LLM Security Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/390ef6e2fcffb8ef", true],
  ["CRTOM", "Certified Red Team Operations Management", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/d657f0cea24f0a01", false],
  ["CCEP", "Certified Cybersecurity Educator Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/f0bca6d0009ba4a4", false],
  ["CTIGA", "Certified Threat Intelligence & Governance Analyst", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/b8450d92d9436a88", false],
  ["CCPP", "Certified C++ Practitioner Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/8123078bdedc5980", false],
  ["CECB", "Certified Encryption and Cryptography Beginners", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/6fe91601f35c090a", false],
  ["CHTAP", "Certified Human Trafficking Awareness Professional", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/9ef3043a12d06c4d", false],
  ["CSCRB", "Certified Security Code Review Beginners", "Red Team Leaders", "https://courses.redteamleaders.com/exam-completion/592dd1205b5e4acd", false],
  ["CCF", "Certified Cybersecurity Foundations", "Hackviser", "https://hackviser.com/verify?id=HV-CORE-GO4EUP42", false],
]

const path = [
  ["01", "Break", "Cybersecurity first: Active Directory, red teaming, curiosity about how things fail."],
  ["02", "Teach", "Senpai Academy — advanced topics explained in clear Arabic."],
  ["03", "Ship", "Two Android apps released: Tarjuman and Murshidi."],
  ["04", "Now", "Deep into AI: LLMs, agents, and keeping them safe."],
]

const links = [
  ["GitHub", "@ROBIN-SENPAI", "https://github.com/ROBIN-SENPAI"],
  ["Telegram", "Senpai Academy channel", "https://t.me/SENPAI_ACADMEY"],
  ["TryHackMe", "ROBiN", "https://tryhackme.com/p/ROBiN"],
]

const band = ["AI", "Android", "LLM Security", "Voice", "Red Team", "Arabic-first", "Education"]

const D = "font-[family-name:var(--font-display)] uppercase tracking-tight"
const M = "font-[family-name:var(--font-geist-mono)]"
const AR = "font-[family-name:var(--font-ar)]"

function Reveal({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <p className={`${M} inline-flex items-center gap-3 text-[11px] tracking-[0.3em] uppercase`} style={{ color: ORANGE }}>
      <span className="h-[2px] w-8" style={{ background: ORANGE }} />
      {children}
    </p>
  )
}

function Phone({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="relative mx-auto w-[210px] rounded-[34px] border-[6px] p-3"
      style={{ borderColor: "#262626", background: BLACK, aspectRatio: "9 / 17" }}
    >
      <div className="absolute left-1/2 top-2 h-1.5 w-12 -translate-x-1/2 rounded-full" style={{ background: "#262626" }} />
      <div className="flex h-full flex-col justify-between rounded-[22px] p-4" style={{ background: PANEL }}>
        {children}
      </div>
    </div>
  )
}

function TarjumanScreen() {
  return (
    <Phone>
      <p className={`${M} text-[8px] tracking-[0.25em]`} style={{ color: ORANGE }}>
        EN → AR · LIVE
      </p>
      <div className="flex items-end justify-center gap-1.5 py-6">
        {[18, 34, 52, 28, 62, 40, 22, 48, 30].map((h, i) => (
          <span
            key={i}
            className="w-2 rounded-full"
            style={{ height: h, background: i % 2 ? ORANGE : WHITE, animation: `bounce-bar 1.${i}s ease-in-out ${i * 0.1}s infinite alternate` }}
          />
        ))}
      </div>
      <div className="space-y-2">
        <div className="h-2 w-4/5 rounded-full" style={{ background: "#2a2a2a" }} />
        <div className="h-2 w-3/5 rounded-full" style={{ background: "#2a2a2a" }} />
        <div className="mx-auto mt-4 flex h-11 w-11 items-center justify-center rounded-full" style={{ background: ORANGE }}>
          <span className="h-3 w-3 rounded-full" style={{ background: BLACK }} />
        </div>
      </div>
    </Phone>
  )
}

function MurshidiScreen() {
  return (
    <Phone>
      <p className={`${M} text-[8px] tracking-[0.25em]`} style={{ color: ORANGE }}>
        TODAY · FOCUS
      </p>
      <div className="space-y-3 py-4">
        {[true, true, false, false].map((done, i) => (
          <div key={i} className="flex items-center gap-3">
            <span
              className="flex h-4 w-4 items-center justify-center rounded-[4px] border-2 text-[9px] font-bold"
              style={{ borderColor: ORANGE, background: done ? ORANGE : "transparent", color: BLACK }}
            >
              {done ? "✓" : ""}
            </span>
            <span className="h-2 rounded-full" style={{ width: `${70 - i * 12}%`, background: "#2a2a2a" }} />
          </div>
        ))}
      </div>
      <div className="rounded-2xl p-3" style={{ background: ORANGE, color: BLACK }}>
        <p className={`${M} text-[8px] tracking-[0.2em]`}>FOCUS TIMER</p>
        <p className={`${D} text-3xl`}>25:00</p>
      </div>
    </Phone>
  )
}

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-x-hidden font-[family-name:var(--font-body)]" style={{ background: BLACK, color: WHITE }}>
      <style>{`
        html{scroll-behavior:smooth}
        ::selection{background:${ORANGE};color:${BLACK}}
        @keyframes bounce-bar{from{transform:scaleY(.45)}to{transform:scaleY(1)}}
        @keyframes slide{from{transform:translateX(0)}to{transform:translateX(-50%)}}
        .row-hover:hover .row-bg{transform:scaleY(1)}
        @media (prefers-reduced-motion: reduce){*{animation:none!important}}
      `}</style>

      {/* NAV */}
      <nav className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-5 py-4 backdrop-blur-md md:px-10" style={{ background: "rgba(10,10,10,0.8)", borderBottom: "1px solid #222" }}>
        <a href="#" className={`${D} text-2xl`}>
          MBF<span style={{ color: ORANGE }}>.</span>
        </a>
        <div className={`${M} hidden gap-8 text-[11px] uppercase tracking-[0.2em] md:flex`}>
          {nav.map(([l, h]) => (
            <a key={l} href={h} className="transition-colors hover:text-[#ff5a00]">
              {l}
            </a>
          ))}
        </div>
        <a href="#contact" className={`${M} rounded-none px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em]`} style={{ background: ORANGE, color: BLACK }}>
          Say hi
        </a>
      </nav>

      {/* HERO */}
      <header className="relative flex h-[100svh] min-h-[620px] flex-col justify-center overflow-hidden px-5 md:px-10">
        <Signal />
        <div className="relative z-10 pt-16">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className={`${M} mb-5 inline-block px-3 py-1 text-[11px] font-bold uppercase tracking-[0.3em]`}
            style={{ background: ORANGE, color: BLACK }}
          >
            AI · Apps · Security
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className={`${D} text-[19.5vw] leading-[0.85] sm:text-[17vw] md:text-[13vw]`}
          >
            Mohammed
            <br />
            <span style={{ color: ORANGE }}>Baqir</span> Firas
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 max-w-md text-base leading-relaxed opacity-75 md:text-xl"
          >
            I build Arabic-first apps powered by AI — and learn how to break and defend what they run on.
          </motion.p>
        </div>
      </header>

      {/* BAND */}
      <div className="-rotate-1 overflow-hidden py-4" style={{ background: ORANGE, color: BLACK }}>
        <div className="flex w-max gap-10 whitespace-nowrap" style={{ animation: "slide 28s linear infinite" }}>
          {[...band, ...band, ...band, ...band].map((b, i) => (
            <span key={i} className={`${D} text-3xl md:text-5xl`}>
              {b} <span className="mx-4">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <section id="about" className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-6xl gap-14 md:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <Label>About</Label>
            <h2 className={`${D} mt-6 text-5xl leading-[0.95] md:text-8xl`}>
              Technology should speak <span style={{ color: ORANGE }}>our language.</span>
            </h2>
            <p className="mt-8 max-w-xl text-lg leading-relaxed opacity-75">
              I&apos;m a software developer and the founder of Senpai Academy. I make advanced technology practical and
              accessible in Arabic — and right now, my full focus is artificial intelligence. My work has been recognized by
              several Iraqi universities, with first place in multiple technical competitions.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="grid grid-cols-2 gap-3 self-end">
            {[
              ["04", "Live platforms"],
              ["10", "Certifications"],
              ["02", "LLM security certs"],
              ["1st", "Place · competitions"],
            ].map(([v, l]) => (
              <div key={l} className="p-5" style={{ border: `2px solid ${ORANGE}` }}>
                <p className={`${D} text-5xl md:text-6xl`} style={{ color: ORANGE }}>
                  {v}
                </p>
                <p className={`${M} mt-2 text-[10px] uppercase tracking-[0.2em] opacity-70`}>{l}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      {/* FOCUS */}
      <section id="focus" className="px-5 pb-24 md:px-10 md:pb-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <Label>Focus</Label>
            <h2 className={`${D} mt-6 text-5xl leading-[0.95] md:text-7xl`}>Three lanes. One standard.</h2>
          </Reveal>
          <div className="grid gap-4 md:grid-cols-3">
            {focus.map((f, i) => (
              <Reveal key={f.no} delay={i * 0.08}>
                <div
                  className="group flex h-full flex-col justify-between gap-10 p-7 transition-colors duration-300 hover:bg-[#ff5a00] hover:text-black md:p-8"
                  style={{ background: PANEL, border: "2px solid #262626" }}
                >
                  <p className={`${D} text-7xl transition-colors group-hover:text-black`} style={{ color: ORANGE }}>
                    {f.no}
                  </p>
                  <div>
                    <h3 className={`${D} text-4xl`}>{f.title}</h3>
                    <p className="mt-3 leading-relaxed opacity-75">{f.body}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {f.tags.map((t) => (
                        <span key={t} className={`${M} border px-2.5 py-1 text-[10px] uppercase tracking-wider`} style={{ borderColor: "currentColor" }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="px-5 py-24 md:px-10 md:py-36" style={{ background: PANEL }}>
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-14">
            <Label>Work</Label>
            <h2 className={`${D} mt-6 text-5xl leading-[0.95] md:text-8xl`}>
              Shipped <span style={{ color: ORANGE }}>products.</span>
            </h2>
          </Reveal>

          {/* Tarjuman */}
          <Reveal>
            <a
              href="https://tarjuman.academysenpai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-10 p-6 transition-colors duration-300 hover:border-[#ff5a00] md:grid-cols-[1.2fr_1fr] md:p-12"
              style={{ background: BLACK, border: "2px solid #262626" }}
            >
              <div className="flex flex-col justify-between gap-8">
                <div>
                  <p className={`${M} text-[11px] uppercase tracking-[0.3em]`} style={{ color: ORANGE }}>
                    Featured · Android
                  </p>
                  <h3 className={`${AR} mt-4 text-6xl font-extrabold leading-tight md:text-8xl`} dir="rtl" style={{ textAlign: "left" }}>
                    تُرجُمَان
                  </h3>
                  <p className={`${D} text-3xl md:text-4xl`}>Tarjuman</p>
                  <p className="mt-4 text-xl font-medium">Speak your language. Hear theirs, in your ear.</p>
                  <p className="mt-3 max-w-lg leading-relaxed opacity-70">
                    Live voice translation across 29 languages, with 990 ready phrases and a 197-country guide that work
                    offline. Free on Android.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
                  <div className={`${M} flex gap-8 text-[11px] uppercase tracking-[0.15em]`}>
                    {[
                      ["29", "Languages"],
                      ["990", "Phrases"],
                      ["197", "Countries"],
                    ].map(([v, l]) => (
                      <div key={l}>
                        <p className={`${D} text-4xl`} style={{ color: ORANGE }}>
                          {v}
                        </p>
                        {l}
                      </div>
                    ))}
                  </div>
                  <span className={`${M} inline-flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]`} style={{ background: ORANGE, color: BLACK }}>
                    Visit <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </div>
              <TarjumanScreen />
            </a>
          </Reveal>

          {/* Murshidi */}
          <Reveal className="mt-5">
            <a
              href="https://murshidi.academysenpai.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group grid gap-10 p-6 transition-colors duration-300 hover:border-[#ff5a00] md:grid-cols-[1fr_1.2fr] md:p-12"
              style={{ background: BLACK, border: "2px solid #262626" }}
            >
              <div className="order-2 md:order-1">
                <MurshidiScreen />
              </div>
              <div className="order-1 flex flex-col justify-between gap-8 md:order-2">
                <div>
                  <p className={`${M} text-[11px] uppercase tracking-[0.3em]`} style={{ color: ORANGE }}>
                    Android
                  </p>
                  <h3 className={`${AR} mt-4 text-6xl font-extrabold leading-tight md:text-8xl`} dir="rtl" style={{ textAlign: "left" }}>
                    مُرشدي
                  </h3>
                  <p className={`${D} text-3xl md:text-4xl`}>Murshidi</p>
                  <p className="mt-4 text-xl font-medium">Organize your study. Focus more.</p>
                  <p className="mt-3 max-w-lg leading-relaxed opacity-70">
                    An Android app for university students — plan the semester, track what matters and stay focused.
                  </p>
                </div>
                <span className={`${M} inline-flex w-fit items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-[0.2em]`} style={{ background: ORANGE, color: BLACK }}>
                  Visit <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* Platforms */}
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            {[
              ["Senpai Academy", "The main educational hub for cybersecurity students — guides, roadmaps and Arabic study resources.", "https://academysenpai.com/", "academysenpai.com"],
              ["Senpai Type", "A clean typing practice platform built for the community.", "https://senpai-type.pages.dev/", "senpai-type.pages.dev"],
            ].map(([n, b, h, host]) => (
              <Reveal key={n}>
                <a
                  href={h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex h-full flex-col justify-between gap-10 p-7 transition-colors duration-300 hover:bg-[#ff5a00] hover:text-black md:p-9"
                  style={{ background: BLACK, border: "2px solid #262626" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <h3 className={`${D} text-4xl md:text-5xl`}>{n}</h3>
                    <ArrowUpRight className="h-7 w-7 shrink-0 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" style={{ color: "inherit" }} />
                  </div>
                  <div>
                    <p className="leading-relaxed opacity-75">{b}</p>
                    <p className={`${M} mt-4 text-[11px] tracking-wider opacity-60`}>{host}</p>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section id="credentials" className="px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <Label>Credentials</Label>
            <h2 className={`${D} mt-6 text-5xl leading-[0.95] md:text-8xl`}>
              Ten certs. <span style={{ color: ORANGE }}>All verifiable.</span>
            </h2>
          </Reveal>
          <div style={{ borderTop: "2px solid #262626" }}>
            {certs.map(([ac, title, issuer, href, ai]) => (
              <a
                key={ac}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="row-hover group relative grid grid-cols-[auto_1fr_auto] items-center gap-4 overflow-hidden py-5 md:grid-cols-[130px_1fr_180px_auto] md:gap-8 md:px-3"
                style={{ borderBottom: "2px solid #262626" }}
              >
                <span className="row-bg absolute inset-0 origin-bottom scale-y-0 transition-transform duration-300" style={{ background: ORANGE }} />
                <span className={`${D} relative z-10 text-2xl transition-colors group-hover:text-black md:text-3xl`} style={{ color: ORANGE }}>
                  {ac}
                </span>
                <span className="relative z-10 text-base font-medium leading-snug transition-colors group-hover:text-black md:text-xl">
                  {title}
                  {ai && (
                    <span className={`${M} ml-3 inline-block px-2 py-0.5 align-middle text-[9px] font-bold tracking-widest`} style={{ background: ORANGE, color: BLACK }}>
                      AI
                    </span>
                  )}
                </span>
                <span className={`${M} relative z-10 hidden text-[11px] uppercase tracking-[0.15em] opacity-60 transition-colors group-hover:text-black md:block`}>{issuer}</span>
                <ArrowUpRight className="relative z-10 h-5 w-5 transition-colors group-hover:text-black" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* PATH */}
      <section className="px-5 pb-24 md:px-10 md:pb-36">
        <div className="mx-auto max-w-6xl">
          <Reveal className="mb-12">
            <Label>Path</Label>
            <h2 className={`${D} mt-6 text-5xl leading-[0.95] md:text-7xl`}>Break. Teach. Ship. Now: AI.</h2>
          </Reveal>
          <div className="grid gap-0 md:grid-cols-4" style={{ borderTop: `4px solid ${ORANGE}` }}>
            {path.map(([n, t, b], i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="h-full p-6 md:pr-8" style={{ borderLeft: i ? "2px solid #262626" : "none" }}>
                  <p className={`${D} text-6xl`} style={{ color: i === 3 ? ORANGE : "#333" }}>
                    {n}
                  </p>
                  <h3 className={`${D} mt-3 text-3xl`}>{t}</h3>
                  <p className="mt-2 text-sm leading-relaxed opacity-70">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contact" className="px-5 py-24 md:px-10 md:py-36" style={{ background: ORANGE, color: BLACK }}>
        <div className="mx-auto max-w-6xl">
          <Reveal>
            <p className={`${M} text-[11px] font-bold uppercase tracking-[0.3em]`}>Contact</p>
            <h2 className={`${D} mt-5 text-[18vw] leading-[0.85] md:text-[11vw]`}>
              Let&apos;s build
              <br />
              something.
            </h2>
            <p className="mt-6 max-w-lg text-lg font-medium">An idea, a project or a question about AI, apps or security? Reach out.</p>
          </Reveal>
          <div className="mt-14" style={{ borderTop: `3px solid ${BLACK}` }}>
            {links.map(([k, v, h]) => (
              <a
                key={k}
                href={h}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 py-6 transition-all hover:px-4 hover:bg-black hover:text-[#ff5a00]"
                style={{ borderBottom: `3px solid ${BLACK}` }}
              >
                <span className={`${M} text-xs font-bold uppercase tracking-[0.25em]`}>{k}</span>
                <span className={`${D} text-2xl md:text-5xl`}>{v}</span>
                <ArrowUpRight className="h-6 w-6" />
              </a>
            ))}
          </div>
          <div className={`${M} mt-12 flex items-center justify-between text-[11px] font-bold uppercase tracking-[0.2em]`}>
            <span>© {new Date().getFullYear()} Mohammed Baqir Firas</span>
            <a href="#">↑ Top</a>
          </div>
        </div>
      </footer>
    </div>
  )
}
