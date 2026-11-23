"use client"

import { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence, useScroll, useSpring, useTransform, useInView, useMotionValue } from "framer-motion"
import { ArrowUpRight } from "lucide-react"
import { ReactLenis, useLenis } from "lenis/react"
import { ParticleName } from "./particles"
import { DustCanvas } from "./dust"
import { Note, Sticker, Wavy, CursorRing } from "./extras"
import { Github, Send, ShieldCheck } from "lucide-react"
import { Frame, FigDial, FigBook, FigBridge, FigApps, FigShield, FigGraph, FigStudy, FigAcademy, FigKeys, FigSeal, StepIcon, FigRipple, FigTrain, FigTerm } from "./figures"

const INK = "#14213d"
const PAPER = "#f1ece1"
const CORAL = "#e4572e"

const disciplines = ["AI Development", "Cybersecurity", "Academic Research"]

const capabilities = [
  {
    no: "01 / AI & APPS",
    fig: <FigApps />,
    cap: "FIG. 2 — VOICE BECOMES TEXT",
    title: (
      <>
        Apps that <It>listen.</It>
      </>
    ),
    body: "Android products where AI does the heavy lifting quietly — instant voice translation, study companions and Arabic-first experiences that feel native.",
    tags: ["ANDROID", "VOICE AI", "LLMS"],
  },
  {
    no: "02 / LLM SECURITY",
    fig: <FigShield />,
    cap: "FIG. 3 — A GUARDRAIL SCANS EVERY PROMPT",
    title: (
      <>
        Models that <It>hold up.</It>
      </>
    ),
    body: "Prompt injection, jailbreaks and guardrails. Learning how language models fail so the systems built on them can be trusted.",
    tags: ["PROMPT INJECTION", "AI RED TEAMING", "GUARDRAILS"],
  },
  {
    no: "03 / SECURITY FOUNDATIONS",
    fig: <FigGraph />,
    cap: "FIG. 4 — ONE DIRECTORY, MANY PATHS",
    title: (
      <>
        A base that <It>doesn&apos;t crack.</It>
      </>
    ),
    body: "Active Directory, red teaming and secure code review — the offensive habits that shape how I design every product.",
    tags: ["ACTIVE DIRECTORY", "RED TEAM", "CODE REVIEW"],
  },
]

const work = [
  {
    kind: "FEATURED · ANDROID",
    fig: <FigApps />,
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
    fig: <FigStudy />,
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
    fig: <FigBook />,
    body: "The main educational hub for cybersecurity students — guides, roadmaps and Arabic study resources.",
    href: "https://academysenpai.com/",
    tags: ["EDUCATION", "HUB"],
  },
  {
    name: "Senpai Type",
    fig: <FigKeys />,
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

const marquee = ["AI", "ذَكاء اصطناعي", "LLMs", "Android", "تَطبيقات", "Voice AI", "LLM Security", "أمْن", "Red Teaming", "Active Directory", "Arabic-first", "تَعليم", "Education"]

function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const p = Math.min((t - start) / 1200, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * value))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, value])
  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  )
}

function ScrollWord({ w, it, i, n, progress }: { w: string; it: boolean; i: number; n: number; progress: ReturnType<typeof useScroll>["scrollYProgress"] }) {
  const start = (i / n) * 0.85
  const op = useTransform(progress, [start, start + 0.15], [0.16, 1])
  return (
    <motion.span style={{ opacity: op, color: it ? CORAL : undefined }} className={it ? "italic" : undefined}>
      {w}{" "}
    </motion.span>
  )
}

function ScrollWords({ parts, className = "" }: { parts: [string, boolean][]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.3"] })
  const words = parts.flatMap(([t, it]) => t.split(" ").filter(Boolean).map((w) => ({ w, it })))
  return (
    <p ref={ref} className={className}>
      {words.map((x, i) => (
        <ScrollWord key={i} w={x.w} it={x.it} i={i} n={words.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function Tilt({ children }: { children: React.ReactNode }) {
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const sx = useSpring(rx, { stiffness: 140, damping: 18 })
  const sy = useSpring(ry, { stiffness: 140, damping: 18 })
  return (
    <motion.div
      style={{ rotateX: sx, rotateY: sy, transformPerspective: 1100 }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return
        const r = e.currentTarget.getBoundingClientRect()
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 5)
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5)
      }}
      onPointerLeave={() => {
        rx.set(0)
        ry.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

const IT = "font-[family-name:var(--font-serif)] italic font-normal tracking-normal text-[1.1em]"

function It({ children }: { children: React.ReactNode }) {
  return <em className={IT}>{children}</em>
}

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

function Head({ no, label, ar, title, sub }: { no: string; label: string; ar?: string; title: React.ReactNode; sub?: string }) {
  return (
    <Reveal className="mb-12 md:mb-16">
      <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] opacity-60">
        <span>
          {no} <span className="mx-2">/</span> {label}
        </span>
        {ar && (
          <span className="font-ar text-sm font-medium tracking-normal" dir="rtl">
            {ar}
          </span>
        )}
      </p>
      <h2 className="mt-4 max-w-3xl text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">{title}</h2>
      <motion.span
        className="mt-6 block h-[3px] w-24 origin-left"
        style={{ background: CORAL }}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      />
      {sub && <p className="mt-5 max-w-xl text-base leading-relaxed opacity-70 md:text-lg">{sub}</p>}
    </Reveal>
  )
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider" style={{ borderColor: `${INK}33` }}>
      {children}
    </span>
  )
}

const navLinks = [
  ["About", "about"],
  ["Work", "work"],
  ["Academy", "academy"],
  ["Credentials", "credentials"],
  ["Skills", "skills"],
  ["Story", "story"],
]

const menuItems = [
  ["About", "about", "عني"],
  ["Work", "work", "الأعمال"],
  ["Academy", "academy", "الأكاديمية"],
  ["Credentials", "credentials", "الشهادات"],
  ["Skills", "skills", "المهارات"],
  ["Story", "story", "قصتي"],
  ["Contact", "contact", "تواصل"],
]

function Nav() {
  const [open, setOpen] = useState(false)
  const [time, setTime] = useState("")
  useEffect(() => {
    const t = () => setTime(new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "Asia/Baghdad" }).format(new Date()))
    t()
    const id = setInterval(t, 20000)
    return () => clearInterval(id)
  }, [])
  const lenis = useLenis()
  const [active, setActive] = useState("")
  useEffect(() => {
    const els = navLinks.map(([, id]) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setActive(e.target.id)
      },
      { rootMargin: "-40% 0px -55% 0px" },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  const [pos, setPos] = useState(0)
  useEffect(() => {
    const calc = () => {
      const tops = navLinks.map(([, id]) => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + window.scrollY : Infinity
      })
      const y = window.scrollY + window.innerHeight * 0.4
      let v = 0
      for (let i = 0; i < tops.length; i++) {
        if (y >= tops[i]) {
          const next = tops[i + 1]
          v = i + (next && isFinite(next) ? Math.min(1, (y - tops[i]) / (next - tops[i])) : 0)
        }
      }
      setPos(Math.max(0, Math.min(navLinks.length - 1, v)))
    }
    calc()
    window.addEventListener("scroll", calc, { passive: true })
    window.addEventListener("resize", calc)
    return () => {
      window.removeEventListener("scroll", calc)
      window.removeEventListener("resize", calc)
    }
  }, [])
  const cur = Math.round(pos)
  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", k)
    return () => {
      lenis?.start()
      window.removeEventListener("keydown", k)
    }
  }, [open, lenis])
  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (!el) return
    setOpen(false)
    if (lenis) {
      lenis.start()
      lenis.scrollTo(el, { offset: -64, duration: 1.4 })
    }
    else el.scrollIntoView({ behavior: "smooth" })
  }
  return (
    <>
    <AnimatePresence>
      {open && (
        <motion.div key="menu" initial={{ clipPath: "circle(0% at 50% 2.4rem)" }} animate={{ clipPath: "circle(150% at 50% 2.4rem)" }} exit={{ clipPath: "circle(0% at 50% 2.4rem)" }} transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }} className="fixed inset-0 z-[85] flex flex-col justify-center overflow-y-auto px-6 py-24 md:px-16" style={{ background: INK, color: PAPER }}>
          <ul className="mx-auto w-full max-w-5xl">
            {menuItems.map(([label, id, ar], i) => (
              <motion.li key={id} initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.25 + i * 0.05, duration: 0.5, ease: "easeOut" }} style={{ borderBottom: `1px solid ${PAPER}22` }}>
                <a href={`#${id}`} onClick={go(id)} className="group flex items-baseline gap-4 py-2 md:gap-8 md:py-3">
                  <span className="w-8 font-mono text-xs md:w-12" style={{ color: CORAL }}>0{i + 1}</span>
                  <span className="font-[family-name:var(--font-serif)] text-4xl italic transition-transform duration-300 group-hover:translate-x-3 md:text-7xl" style={{ color: i === cur ? CORAL : PAPER }}>{label}</span>
                  <span className="font-ar-display ml-auto text-xl opacity-60 transition-opacity group-hover:opacity-100 md:text-3xl" dir="rtl">{ar}</span>
                </a>
              </motion.li>
            ))}
          </ul>
          <p className="mx-auto mt-8 w-full max-w-5xl font-mono text-[11px] tracking-[0.2em] opacity-50">M. BAQIR FIRAS — AI, APPS AND SECURITY</p>
        </motion.div>
      )}
    </AnimatePresence>
    <header className="pointer-events-auto fixed inset-x-0 top-0 z-[80] grid grid-cols-[1fr_auto_1fr] items-center px-5 py-3 backdrop-blur-md md:pointer-events-none md:py-4 md:px-10 md:!bg-transparent md:!border-transparent md:backdrop-blur-none" style={{ zIndex: open ? 90 : 80, background: open ? "transparent" : `${PAPER}e6`, borderBottom: `1px solid ${open ? "transparent" : INK + "12"}` }}>
      <a href="#" onClick={(e) => { e.preventDefault(); lenis ? lenis.scrollTo(0, { duration: 1.4 }) : window.scrollTo({ top: 0, behavior: "smooth" }) }} className="pointer-events-auto justify-self-start font-mono text-xl font-bold tracking-[0.25em] transition-colors" style={{ color: open ? PAPER : INK }}>
        MBF<span style={{ color: CORAL }}>.</span>
      </a>
      <button type="button" onClick={() => setOpen((v) => !v)} aria-expanded={open} aria-label="Menu" className="pointer-events-auto group relative z-[90] flex items-center gap-3 rounded-full py-2 pl-4 pr-2 text-sm font-medium backdrop-blur-md transition-transform hover:scale-[1.03]" style={{ background: open ? CORAL : `${PAPER}d9`, color: open ? "#fff" : INK, border: `1px solid ${open ? CORAL : INK + "22"}`, boxShadow: `0 10px 30px -18px ${INK}88` }}>
        <span className="font-mono text-[11px] tracking-[0.14em]">{open ? "CLOSE" : `0${cur + 1} / ${navLinks[cur][0].toUpperCase()}`}</span>
        <span className="flex h-7 w-7 flex-col items-center justify-center gap-[5px] rounded-full" style={{ background: open ? "#fff" : INK }}>
          <span className="h-[2px] w-3 rounded transition-transform" style={{ background: open ? CORAL : PAPER, transform: open ? "translateY(3.5px) rotate(45deg)" : "none" }} />
          <span className="h-[2px] w-3 rounded transition-transform" style={{ background: open ? CORAL : PAPER, transform: open ? "translateY(-3.5px) rotate(-45deg)" : "none" }} />
        </span>
      </button>
      <div className="justify-self-end font-mono text-[11px] tracking-[0.18em] transition-colors max-md:hidden" style={{ color: open ? PAPER : INK }}>
        <p className="flex items-center justify-end gap-2">
          <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full" style={{ background: CORAL }} />
          BAGHDAD {time}
        </p>
        <p className="mt-1 text-right opacity-55">AI · APPS · SECURITY</p>
      </div>
    </header>
    </>
  )
}

export default function V2() {
  const { scrollYProgress, scrollY } = useScroll()
  const bar = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
  const heroY = useTransform(scrollY, [0, 700], [0, 140])
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.15])
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
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 0.95 }}>
    <div
      className="relative min-h-screen overflow-x-hidden font-[family-name:var(--font-v2)]"
      style={{ background: PAPER, color: INK, scrollBehavior: "smooth" }}
    >
      <style>{`html{scroll-behavior:smooth} ::selection{background:${CORAL};color:#fff} a:focus-visible,button:focus-visible{outline:2px solid ${CORAL};outline-offset:4px} @media (prefers-reduced-motion: reduce){html{scroll-behavior:auto}*{animation:none!important}}`}</style>

      <CursorRing />
      <Nav />
      <motion.div className="fixed left-0 top-0 z-[90] h-[3px] w-full origin-left" style={{ scaleX: bar, background: CORAL }} />

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
        <motion.div className="absolute inset-0" style={{ y: heroY, opacity: heroOpacity }}>
          <ParticleName text="BAQIR" />
        </motion.div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-5 md:p-8">
          <div className="font-mono text-[11px] tracking-[0.2em] md:text-[11px]">
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
          <div className="grid gap-12 md:grid-cols-[1.5fr_1fr] md:items-end">
            <Reveal className="min-w-0">
              <h1 className="text-[2.6rem] font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-8xl">
                Hi, I&apos;m <It>Mohammed</It>
                <span style={{ color: CORAL }}>.</span>
              </h1>
              <ScrollWords
                className="mt-8 max-w-2xl font-[family-name:var(--font-serif)] text-3xl leading-[1.12] md:text-5xl"
                parts={[
                  ["Building with", false],
                  ["AI.", true],
                  ["Securing what", false],
                  ["it builds.", true],
                  ["Developer, security practitioner and researcher — making advanced technology accessible in", false],
                  ["Arabic.", true],
                ]}
              />
            </Reveal>
            <Reveal delay={0.15} className="relative min-w-0">
              <Note arrow="down" className="absolute -top-14 left-2 z-10 hidden md:flex">
                that&apos;s me!
              </Note>
              <Tilt>
                <div className="relative overflow-hidden rounded-3xl" style={{ background: "#fffaf0", border: `1px solid ${INK}22`, boxShadow: `0 30px 60px -40px ${INK}66` }}>
                  <div className="flex items-center justify-between px-7 py-3 font-mono text-[11px] tracking-[0.25em]" style={{ background: INK, color: PAPER }}>
                    <span>IDENTITY CARD</span>
                    <span style={{ color: CORAL }}>● ACTIVE</span>
                  </div>
                  <div className="p-7 md:p-8">
                    <div className="relative text-center">
                      <p className="font-mono text-[11px] tracking-[0.25em] opacity-50">الاسْم / NAME</p>
                      <p dir="rtl" lang="ar" className="font-ar-display mt-3 text-5xl font-bold leading-tight md:text-6xl" style={{ color: CORAL }}>
                        مُحَمَّد باقِر
                      </p>
                      <p className="mt-1 font-[family-name:var(--font-serif)] text-3xl italic opacity-80">Mohammed Baqir</p>
                    </div>
                    <dl className="mt-7 text-sm">
                      {[
                        ["Role", "Software developer"],
                        ["Also", "Cybersecurity researcher"],
                        ["Founder", "Senpai Academy"],
                        ["Focus", "AI · LLMs · agents"],
                      ].map(([k, v]) => (
                        <div key={k} className="flex flex-row-reverse items-baseline justify-between gap-4 py-3" style={{ borderTop: `1px dashed ${INK}33` }}>
                          <dt className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">{k}</dt>
                          <dd className="text-left font-medium">{v}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-5 flex h-8 items-stretch gap-[2px]" aria-hidden="true">
                      {Array.from({ length: 46 }).map((_, i) => (
                        <span key={i} style={{ width: [1, 2, 1, 3, 1, 2, 4, 1][i % 8], background: INK, opacity: 0.8 }} />
                      ))}
                    </div>
                    <p className="mt-3 overflow-hidden whitespace-nowrap font-mono text-[11px] tracking-[0.2em] opacity-45">MBF&lt;&lt;BAQIR&lt;&lt;&lt;&lt;AI&lt;&lt;SEC&lt;&lt;EDU&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;&lt;</p>
                  </div>
                </div>
              </Tilt>
            </Reveal>
          </div>
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
      <section id="about" className="px-5 py-20 md:px-12 md:py-32" style={{ borderTop: `1px solid ${INK}22` }}>
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.4fr]">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] opacity-60">
              <span>01 / ABOUT</span>
              <span className="font-ar text-sm font-medium tracking-normal" dir="rtl">
                نَبذة
              </span>
            </p>
            <h2 className="mt-4 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Make technology speak <It>our language.</It>
            </h2>
            <p dir="ltr" lang="ar" className="font-ar-display mt-4 text-xl font-bold md:text-2xl" style={{ color: CORAL }}>
              لتتكلَّم التقنيةُ لغتنا
            </p>
            <Frame className="mt-10" caption="FIG. 1 — ENGLISH ⇄ ARABIC">
              <FigBridge />
            </Frame>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="max-w-2xl text-lg leading-relaxed opacity-80 md:text-xl">
              I&apos;m <strong>Mohammed Baqir Firas</strong> — software developer, AI enthusiast and founder of{" "}
              <strong>Senpai Academy</strong>. Three things drive my work:
            </p>
            <div className="mt-8" style={{ borderTop: `1px solid ${INK}33` }}>
              {[
                ["01", "Build", "بِناء", "AI-powered apps, LLM applications and intelligent agents — plus model training and evaluation."],
                ["02", "Secure", "حِماية", "A cybersecurity background — Active Directory and LLM security — so what I build is made to hold."],
                ["03", "Teach", "تَعليم", "Technical writing, research and Arabic educational platforms that make hard topics approachable."],
              ].map(([no, en, ar, body]) => (
                <div key={no} className="grid grid-cols-[48px_1fr] gap-4 py-7 md:grid-cols-[48px_220px_1fr] md:items-baseline md:gap-8" style={{ borderBottom: `1px solid ${INK}33` }}>
                  <span className="font-mono text-xs" style={{ color: CORAL }}>
                    {no}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-[family-name:var(--font-serif)] text-5xl italic leading-none md:text-6xl">{en}</span>
                    <span className="font-ar-display text-xl font-bold" style={{ color: CORAL }} dir="rtl">
                      {ar}
                    </span>
                  </div>
                  <p className="col-span-2 leading-relaxed opacity-75 md:col-span-1">{body}</p>
                </div>
              ))}
            </div>

            <figure className="relative mt-10 rounded-3xl p-7 md:p-10" style={{ background: INK, color: PAPER }}>
              <span className="absolute left-6 top-2 font-[family-name:var(--font-serif)] text-8xl leading-none" style={{ color: CORAL }} aria-hidden="true">
                &ldquo;
              </span>
              <figcaption className="font-mono text-[11px] tracking-[0.25em] opacity-60">LONG-TERM GOAL</figcaption>
              <blockquote className="mt-4 font-[family-name:var(--font-serif)] text-3xl italic leading-[1.1] md:text-5xl">
                Intelligent, reliable and secure AI systems.
              </blockquote>
            </figure>

            <div className="grid grid-cols-2 gap-x-6 gap-y-8 pt-10 font-mono text-[11px] tracking-[0.2em] md:text-xs">
              {[
                [2, "", "LLM SECURITY CERTS"],
                [4, "", "LIVE PLATFORMS"],
                [10, "", "CERTIFICATIONS"],
                [1, "ST", "PLACE · COMPETITIONS"],
              ].map(([v, suf, l]) => (
                <div key={String(l)}>
                  <p className="text-4xl font-bold md:text-5xl" style={{ color: CORAL }}>
                    <CountUp value={v as number} suffix={suf as string} />
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
            ar="المَجالات"
            title={
              <>
                Three disciplines. <It>One standard.</It>
              </>
            }
            sub="Where intelligence, product and security meet — every detail treated like it matters."
          />
          <div className="grid gap-px md:grid-cols-3" style={{ background: `${PAPER}22` }}>
            {capabilities.map((c, i) => (
              <Reveal key={c.no} delay={i * 0.08} className="h-full">
                <div style={{ background: INK }} className="flex h-full flex-col gap-5 p-7 md:p-9">
                  <p className="font-mono text-[11px] tracking-[0.2em]" style={{ color: CORAL }}>
                    {c.no}
                  </p>
                  <Frame caption={c.cap}>{c.fig}</Frame>
                  <h3 className="text-3xl font-bold tracking-tight md:min-h-[2.45em]">{c.title}</h3>
                  <p className="leading-relaxed opacity-70">{c.body}</p>
                  <div className="flex flex-wrap gap-2">
                    {c.tags.map((t) => (
                      <span key={t} className="rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider" style={{ borderColor: `${PAPER}33` }}>
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
            <span key={i} className={/[\u0600-\u06FF]/.test(m) ? "font-ar text-base font-bold tracking-normal" : undefined} dir={/[\u0600-\u06FF]/.test(m) ? "rtl" : undefined}>
              {m.toUpperCase()} <span style={{ color: CORAL }}>/</span>
            </span>
          ))}
        </div>
        <style>{`@keyframes v2marquee{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}`}</style>
      </div>

      {/* WORK */}
      <section id="work" className="px-5 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="relative">
            <Head no="03" label="SELECTED WORK" ar="الأَعمال" title={<>Things I&apos;ve <It>built.</It></>} sub="Two Android apps and the platforms behind the academy." />
            <div className="absolute -top-8 right-0 hidden h-[260px] w-[46%] md:block">
              <DustCanvas kind="text" text="تُرجُمَان" />
            </div>
            <Note arrow="down" className="absolute left-0 top-[calc(100%+0.5rem)] hidden md:flex">
              tap a card to open it
            </Note>
          </div>

          <div className="space-y-6">
            {work.map((w) => (
              <Reveal key={w.name} className="relative">
                {w.name === "Tarjuman" && (
                  <Sticker className="absolute -top-9 right-8 z-10 hidden md:block" rotate={3}>
                    <p className="font-ar-display text-3xl font-bold" style={{ color: CORAL }} dir="rtl">
                      تُرجُمَان
                    </p>
                    <p className="mt-1 font-[family-name:var(--font-hand)] text-xl" style={{ color: INK }}>
                      live voice translation
                    </p>
                  </Sticker>
                )}
                <Tilt>
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
                      <span className="font-ar-display text-3xl font-bold md:text-5xl" dir="rtl" style={{ color: CORAL }}>
                        {w.ar}
                      </span>
                    </h3>
                    <p className="mt-3 text-xl font-medium opacity-80">{w.sub}</p>
                    <p className="mt-5 max-w-lg leading-relaxed opacity-70">{w.body}</p>
                    <span className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs tracking-[0.2em] transition-colors" style={{ background: INK, color: PAPER }}>
                      {w.cta.toUpperCase()} <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                  <div className="flex flex-col justify-end gap-6">
                  <Frame>{w.fig}</Frame>
                  <dl className="font-mono text-[11px] tracking-[0.15em]">
                    {w.rows.map(([k, v]) => (
                      <div key={k} className="flex flex-col gap-1 py-4 sm:flex-row sm:justify-between" style={{ borderTop: `1px solid ${INK}22` }}>
                        <dt className="opacity-50">{k}</dt>
                        <dd className="sm:text-right">{v}</dd>
                      </div>
                    ))}
                  </dl>
                  </div>
                </a>
                </Tilt>
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
                    <Frame>{p.fig}</Frame>
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

            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  name: "AI Model Training & Evaluation",
                  body: "Training and evaluating language models, and testing ways to improve the quality of AI-generated text.",
                  fig: <FigTrain />,
                },
                {
                  name: "Cybersecurity Tools & Automation",
                  body: "Tools and scripts that automate technical tasks and help analyze security environments.",
                  fig: <FigTerm />,
                },
              ].map((p) => (
                <Reveal key={p.name}>
                  <div className="flex h-full flex-col justify-between gap-8 rounded-3xl p-7 md:p-9" style={{ border: `1px dashed ${INK}55` }}>
                    <Frame>{p.fig}</Frame>
                    <div>
                      <p className="font-mono text-[11px] tracking-[0.25em]" style={{ color: CORAL }}>
                        IN DEVELOPMENT
                      </p>
                      <h3 className="mt-3 text-2xl font-bold tracking-tight md:min-h-[2.45em] md:text-3xl">{p.name}</h3>
                      <p className="mt-3 leading-relaxed opacity-70">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ACADEMY */}
      <section id="academy" className="px-5 py-20 md:px-12 md:py-32" style={{ background: INK, color: PAPER }}>
        <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-[1.15fr_1fr]">
          <Reveal>
            <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] opacity-60">
              <span>04 / FOUNDER</span>
              <span className="font-ar text-sm font-medium tracking-normal" dir="rtl">
                أَكاديمية سينباي
              </span>
            </p>
            <h2 className="mt-4 text-5xl font-bold leading-[1] tracking-tight md:text-7xl">
              Senpai <It>Academy.</It>
            </h2>
            <p dir="ltr" lang="ar" className="font-ar-display mt-4 text-2xl font-bold md:text-3xl" style={{ color: CORAL }}>
              من الفَهم إلى التَطبيق
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-75">
              An Arabic educational initiative focused on cybersecurity, technical learning and developer resources — structured so
              complex subjects become easy to approach.
            </p>
            <div className="mt-8" style={{ borderTop: `1px solid ${PAPER}33` }}>
              {[
                ["01", "Design platforms", "Clear, fast learning sites built for students."],
                ["02", "Build interactive tools", "Small tools that make practice hands-on."],
                ["03", "Organize resources", "Roadmaps and guides in a sensible order."],
              ].map(([no, t, d]) => (
                <div key={no} className="grid grid-cols-[40px_1fr] gap-3 py-4 md:grid-cols-[40px_220px_1fr] md:items-baseline" style={{ borderBottom: `1px solid ${PAPER}33` }}>
                  <span className="font-mono text-xs" style={{ color: CORAL }}>
                    {no}
                  </span>
                  <span className="font-[family-name:var(--font-serif)] text-3xl italic tracking-[0.015em]">{t}</span>
                  <span className="col-span-2 text-sm opacity-65 md:col-span-1">{d}</span>
                </div>
              ))}
            </div>
            <a
              href="https://academysenpai.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 font-mono text-xs tracking-[0.2em] transition-opacity hover:opacity-90"
              style={{ background: CORAL, color: INK }}
            >
              VISIT THE ACADEMY <ArrowUpRight className="h-4 w-4" />
            </a>
          </Reveal>
          <div>
            <Frame caption="FIG. 6 — FROM BASICS TO BUILDING">
              <FigAcademy />
            </Frame>
            <p className="mt-6 font-[family-name:var(--font-serif)] text-3xl italic leading-snug tracking-[0.012em] opacity-85 md:text-4xl">
              Making technical knowledge accessible, practical and structured.
            </p>
          </div>
        </div>
      </section>

      {/* CREDENTIALS */}
      <section id="credentials" className="px-5 py-20 md:px-12 md:py-32" style={{ background: "#e9e2d2" }}>
        <div className="mx-auto max-w-6xl">
          <Head no="05" label="CREDENTIALS" ar="الشَهادات" title={<>Verified, <It>not just claimed.</It></>} sub="Ten certifications — each one links to its verification page." />
          <div className="relative mb-16 grid items-center gap-6 md:grid-cols-[1.1fr_1fr]">
            <div>
              <p className="font-[family-name:var(--font-serif)] text-[10rem] leading-[0.85] tracking-tight sm:text-[14rem] md:text-[19rem]">10</p>
              <Wavy className="mt-3 h-4" />
              <p className="mt-3 font-mono text-[11px] tracking-[0.2em] opacity-70">CERTIFICATIONS · RED TEAM LEADERS &amp; HACKVISER</p>
              <Note arrow="up" className="mt-6">
                each one is verifiable
              </Note>
            </div>
            <div className="h-[280px] md:h-[360px]">
              <DustCanvas kind="shield" />
            </div>
          </div>
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
                  <span className="text-base font-medium leading-snug transition-transform duration-300 group-hover:translate-x-1 md:text-xl">
                    {title}
                    {ac.startsWith("CLLMS") && (
                      <span className="ml-3 inline-block rounded-full px-2 py-0.5 align-middle font-mono text-[9px] font-bold tracking-widest" style={{ background: CORAL, color: "#fff" }}>
                        AI
                      </span>
                    )}
                  </span>
                  <span className="hidden font-mono text-[11px] tracking-[0.15em] opacity-50 md:block">{issuer.toUpperCase()}</span>
                  <ArrowUpRight className="h-5 w-5 opacity-50 transition-opacity group-hover:opacity-100" />
                </a>
              </Reveal>
            ))}
            <div style={{ borderTop: `1px solid ${INK}22` }} />
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="px-5 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Head no="06" label="TECHNICAL ARSENAL" ar="المَهارات" title={<>Four domains. <It>One toolbox.</It></>} sub="Grouped by field instead of a long list." />
          <div style={{ borderTop: `1px solid ${INK}33` }}>
            {[
              ["Artificial Intelligence", ["LLMs", "Transformers", "Model Training", "Model Evaluation", "AI Agents"]],
              ["Cybersecurity", ["Active Directory", "Web Security", "OSINT", "LLM Security"]],
              ["Development", ["Python", "C++", "JavaScript", "Web Development", "API Integration"]],
              ["Research", ["Scientific Writing", "Technical Research", "Data Analysis", "Academic Publishing"]],
            ].map(([d, items], i) => (
              <Reveal key={d as string} delay={i * 0.05}>
                <div className="grid gap-4 py-7 md:grid-cols-[260px_1fr] md:items-center md:gap-10" style={{ borderBottom: `1px solid ${INK}33` }}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-xs" style={{ color: CORAL }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="text-2xl font-bold tracking-tight">{d as string}</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {(items as string[]).map((t) => (
                      <span key={t} className="rounded-full border px-4 py-2 font-mono text-[11px] tracking-wider transition-colors hover:bg-[#14213d] hover:text-[#f1ece1]" style={{ borderColor: `${INK}44` }}>
                        {t.toUpperCase()}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="px-5 py-20 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <Head no="07" label="STORY" ar="القِصّة" title={<>Learned by <It>building.</It></>} sub="Security first, then teaching, then shipping — now AI." />
          <div className="grid gap-px sm:grid-cols-2 md:grid-cols-4" style={{ background: `${INK}22` }}>
            {story.map(([n, t, b], i) => (
              <Reveal key={n} delay={i * 0.08}>
                <div className="flex h-full flex-col gap-4 p-7" style={{ background: PAPER }}>
                  <div className="flex items-center justify-between">
                    <p className="text-5xl font-bold" style={{ color: i === 3 ? CORAL : `${INK}33` }}>
                      {n}
                    </p>
                    <StepIcon kind={(["break", "teach", "ship", "now"] as const)[i]} />
                  </div>
                  <h3 className="text-2xl font-bold">{t}</h3>
                  <p className="text-sm leading-relaxed opacity-70">{b}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <footer id="contact" className="px-5 py-20 md:px-12 md:py-32" style={{ background: INK, color: PAPER }}>
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 md:grid-cols-[1.7fr_1fr]">
            <Reveal>
              <p className="flex items-center gap-3 font-mono text-[11px] tracking-[0.25em] opacity-60">
                <span>08 / CONTACT</span>
                <span className="font-ar text-sm font-medium tracking-normal" dir="rtl">
                  تَواصل معي
                </span>
              </p>
              <h2 className="mt-5 text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
                Let&apos;s build something that <It>matters</It>
                <span style={{ color: CORAL }}>.</span>
              </h2>
              <p className="mt-6 max-w-xl text-lg opacity-70">Have an idea, a project or a question about AI, apps or security? Reach out.</p>
            </Reveal>
            <Reveal delay={0.1} className="mx-auto aspect-square w-full max-w-[300px] md:max-w-[400px]">
              <DustCanvas kind="chat" dark />
            </Reveal>
          </div>

          <Note arrow="down" color="#e4572e" className="mt-10 ml-2">
            say hi!
          </Note>
          <div className="mt-4" style={{ borderTop: `1px solid ${PAPER}33` }}>
            {[
              ["01", "GitHub", "@ROBIN-SENPAI", "https://github.com/ROBIN-SENPAI", Github],
              ["02", "Telegram", "Senpai Academy channel", "https://t.me/SENPAI_ACADMEY", Send],
              ["03", "TryHackMe", "ROBiN", "https://tryhackme.com/p/ROBiN", ShieldCheck],
            ].map(([no, k, v, href, Icon]) => {
              const I = Icon as typeof Github
              return (
                <a
                  key={String(k)}
                  href={href as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 overflow-hidden py-7 md:grid-cols-[48px_56px_1fr_auto] md:gap-8 md:px-4"
                  style={{ borderBottom: `1px solid ${PAPER}33` }}
                >
                  <span className="absolute inset-0 origin-bottom scale-y-0 transition-transform duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-y-100" style={{ background: CORAL }} />
                  <span className="relative hidden font-mono text-xs opacity-50 transition-colors group-hover:text-[#14213d] md:block">{no as string}</span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-full border transition-colors group-hover:border-[#14213d] group-hover:text-[#14213d]" style={{ borderColor: `${PAPER}55` }}>
                    <I className="h-5 w-5" />
                  </span>
                  <span className="relative min-w-0 transition-colors group-hover:text-[#14213d]">
                    <span className="block font-mono text-[11px] uppercase tracking-[0.25em] opacity-55">{k as string}</span>
                    <span className="mt-1 block truncate font-[family-name:var(--font-serif)] text-3xl italic md:text-5xl">{v as string}</span>
                  </span>
                  <ArrowUpRight className="relative h-7 w-7 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#14213d]" style={{ color: CORAL }} />
                </a>
              )
            })}
          </div>
        </div>
      </footer>

      {/* THE END — same particle treatment as the opening */}
      <section aria-label="313" className="relative h-[88svh] min-h-[520px] overflow-hidden" style={{ background: INK, color: PAPER, borderTop: `1px solid ${PAPER}22` }}>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="w-[min(80svh,94vw)] opacity-80" style={{ color: PAPER }}>
            <FigDial />
          </div>
        </div>
        <ParticleName texts={["313", "٣١٣"]} colors={[PAPER, CORAL]} scale={0.6} />
        <div className="pointer-events-none absolute inset-x-0 top-0 flex justify-between p-5 font-mono text-[11px] tracking-[0.2em] opacity-60 md:p-8 md:text-[11px]">
          <span>MBF / END</span>
          <span>TOUCH · TAP TO SWITCH 313 ⇄ ٣١٣</span>
        </div>
        <p className="pointer-events-none absolute inset-x-0 bottom-20 text-center font-[family-name:var(--font-serif)] text-2xl italic opacity-80 md:bottom-24 md:text-4xl">
          build · secure · teach
        </p>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5 font-mono text-[11px] tracking-[0.2em] md:p-8 md:text-[11px]">
          <span className="opacity-60">© {new Date().getFullYear()} MOHAMMED BAQIR FIRAS</span>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: "smooth" })
            }}
            className="rounded-full border px-4 py-2 transition-colors hover:bg-[#e4572e] hover:text-[#14213d]"
            style={{ borderColor: CORAL, color: CORAL }}
          >
            ↑ TOP
          </a>
        </div>
      </section>
    </div>
    </ReactLenis>
  )
}
