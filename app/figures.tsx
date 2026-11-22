"use client"

import type React from "react"
import { motion } from "framer-motion"

const CORAL = "#e4572e"

// All figures draw with currentColor so they adapt to light or dark cards.

export function Frame({ children, caption, className = "" }: { children: React.ReactNode; caption?: string; className?: string }) {
  return (
    <figure className={className}>
      <motion.div
        className="overflow-hidden rounded-xl"
        style={{ border: "1px solid currentColor", borderColor: "color-mix(in srgb, currentColor 22%, transparent)" }}
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        whileInView={{ clipPath: "inset(0 0% 0 0)" }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
      {caption && <figcaption className="mt-3 font-mono text-[10px] tracking-[0.2em] opacity-55">{caption}</figcaption>}
    </figure>
  )
}

const draw = {
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true },
  transition: { duration: 1.4, ease: "easeInOut" as const },
}

/** English <-> Arabic: words arc over and under a translation core, changing language on the way. */
function Chip({ text, ar = false, path, begin, dur = 4 }: { text: string; ar?: boolean; path: string; begin: number; dur?: number }) {
  const w = ar ? 56 : 62
  return (
    <g opacity="0">
      <rect x={-w / 2} y="-11" width={w} height="22" rx="11" fill="#f1ece1" stroke={ar ? CORAL : "currentColor"} strokeWidth="1.4" />
      <text x="0" y={ar ? 5 : 4} textAnchor="middle" fontSize={ar ? 14 : 11} fontWeight={ar ? 700 : 600} fill={ar ? CORAL : "#14213d"} className={ar ? "font-ar" : undefined} fontFamily={ar ? undefined : "var(--font-geist-mono), monospace"}>
        {text}
      </text>
      <animateMotion dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" path={path} keyPoints="0;1;1" keyTimes="0;0.38;1" calcMode="linear" />
      <animate attributeName="opacity" dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" values="0;1;1;0;0" keyTimes="0;0.08;0.3;0.38;1" />
    </g>
  )
}

export function FigBridge() {
  const mono = "var(--font-geist-mono), monospace"
  const hex = (r: number) => Array.from({ length: 6 }, (_, i) => `${Math.cos((Math.PI / 3) * i - Math.PI / 2) * r},${Math.sin((Math.PI / 3) * i - Math.PI / 2) * r}`).join(" ")
  // top arc: English -> Arabic, bottom arc: Arabic -> English
  const topL = "M60 92 Q130 36 200 36"
  const topR = "M200 36 Q270 36 340 92"
  const botR = "M340 168 Q270 224 200 224"
  const botL = "M200 224 Q130 224 60 168"
  const D = 4
  const half = D * 0.38
  return (
    <svg viewBox="0 0 400 262" className="block w-full" role="img" aria-label="English and Arabic words arcing over and under a translation core">
      {/* arcs */}
      <g stroke="currentColor" strokeWidth="1.2" fill="none" opacity=".4" strokeLinecap="round">
        <path d="M60 92 Q200 -20 340 92" className="fig-dash" />
        <path d="M340 168 Q200 280 60 168" className="fig-dash" style={{ animationDirection: "reverse" }} />
        <path d="M200 40 V92 M200 168 V220" strokeDasharray="2 5" />
      </g>

      {/* chips travel first in English, then in Arabic */}
      <Chip text="Thanks" path={topL} begin={0} />
      <Chip text="شُكراً" ar path={topR} begin={half} />
      <Chip text="Welcome" path={topL} begin={1.3} />
      <Chip text="أهلاً" ar path={topR} begin={1.3 + half} />
      <Chip text="Peace" path={topL} begin={2.6} />
      <Chip text="سَلام" ar path={topR} begin={2.6 + half} />
      <Chip text="كيف الحال" ar path={botR} begin={0.6} />
      <Chip text="How are you" path={botL} begin={0.6 + half} />
      <Chip text="شكراً لك" ar path={botR} begin={2.2} />
      <Chip text="Thank you" path={botL} begin={2.2 + half} />

      {/* endpoints */}
      <g fill="#f1ece1" stroke="currentColor" strokeWidth="1.6">
        <rect x="12" y="92" width="96" height="76" rx="18" />
        <rect x="292" y="92" width="96" height="76" rx="18" />
      </g>
      <text x="60" y="108" textAnchor="middle" fontSize="8" letterSpacing="2.5" fill="currentColor" opacity=".55" fontFamily={mono}>
        ENGLISH
      </text>
      <text x="60" y="144" textAnchor="middle" fontSize="27" fill="currentColor" fontFamily="var(--font-serif), serif" fontStyle="italic">
        Hello
      </text>
      <text x="340" y="108" textAnchor="middle" fontSize="8" letterSpacing="2.5" fill="currentColor" opacity=".55" fontFamily={mono}>
        ARABIC
      </text>
      <text x="340" y="148" textAnchor="middle" fontSize="30" fill="currentColor" className="font-ar-display" fontWeight="700">
        مرحباً
      </text>

      {/* core */}
      <g transform="translate(200 130)">
        <polygon points={hex(36)} fill="none" stroke={CORAL} strokeWidth="1.2" className="fig-pulse" />
        <polygon points={hex(36)} fill="#f1ece1" stroke={CORAL} strokeWidth="1.8" />
        <polygon points={hex(24)} fill="none" stroke={CORAL} strokeWidth="1" strokeDasharray="2 4" className="fig-spin" />
        <text x="0" y="5" textAnchor="middle" fontSize="15" fontWeight="800" fill={CORAL} fontFamily={mono}>
          AI
        </text>
      </g>

      <text x="14" y="256" fontSize="8" letterSpacing="2.5" fill="currentColor" opacity=".55" fontFamily={mono}>
        TRANSLATION CORE
      </text>
      <text x="386" y="256" textAnchor="end" fontSize="13" fill={CORAL} className="font-ar-display" fontWeight="700">
        لُغة واحدة، فَهم واحد
      </text>
    </svg>
  )
}

/** Academy card: knowledge rising from an open book into a network. */
export function FigBook() {
  const mono = "var(--font-geist-mono), monospace"
  const nodes: [number, number][] = [
    [120, 26],
    [200, 14],
    [280, 26],
    [160, 44],
    [240, 44],
  ]
  return (
    <svg viewBox="0 0 400 210" className="block w-full" role="img" aria-label="An open book sending knowledge up into a network">
      {/* rising lines */}
      <g stroke="currentColor" strokeWidth="1.1" opacity=".5" fill="none">
        {nodes.map(([x, y], i) => (
          <path key={i} d={`M200 92 L${x} ${y}`} className="fig-dash" style={{ animationDelay: `${i * 0.25}s` }} />
        ))}
        <path d="M120 26 L160 44 L200 14 L240 44 L280 26" opacity=".6" />
      </g>
      {nodes.map(([x, y], i) => (
        <g key={`n${i}`}>
          <circle cx={x} cy={y} r={i === 1 ? 7 : 5} fill={i === 1 ? CORAL : "#f1ece1"} stroke={i === 1 ? CORAL : "currentColor"} strokeWidth="1.4" />
          <circle r="2.6" fill={CORAL}>
            <animateMotion dur={`${2.4 + i * 0.35}s`} begin={`${i * 0.5}s`} repeatCount="indefinite" path={`M200 92 L${x} ${y}`} />
          </circle>
        </g>
      ))}

      {/* open book */}
      <g fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="M200 176 C 160 160, 104 160, 62 174 V 98 C 104 84, 160 84, 200 100 Z" fill="#f1ece1" />
        <path d="M200 176 C 240 160, 296 160, 338 174 V 98 C 296 84, 240 84, 200 100 Z" fill="#f1ece1" />
        <path d="M62 174 C 104 160, 160 160, 200 176 C 240 160, 296 160, 338 174" opacity=".5" transform="translate(0 7)" />
      </g>
      <path d="M200 100 V176" stroke="currentColor" strokeWidth="1.4" />
      <path d="M190 100 V128 L196 122 L202 128 V100" fill={CORAL} stroke={CORAL} strokeWidth="1" />

      {/* left page: Arabic lines */}
      <g fill="currentColor" opacity=".7">
        <rect x="116" y="112" width="64" height="5" rx="2.5" />
        <rect x="100" y="124" width="80" height="5" rx="2.5" />
        <rect x="124" y="136" width="56" height="5" rx="2.5" />
      </g>
      <text x="168" y="158" textAnchor="end" fontSize="15" fill={CORAL} className="font-ar-display" fontWeight="700">
        عِلم
      </text>
      {/* right page: code */}
      <text x="222" y="125" fontSize="13" fontWeight="700" fill={CORAL} fontFamily={mono}>
        {"</>"}
      </text>
      <g fill="currentColor" opacity=".7">
        <rect x="222" y="134" width="70" height="5" rx="2.5" />
        <rect x="222" y="146" width="48" height="5" rx="2.5" />
        <rect x="222" y="158" width="62" height="5" rx="2.5" />
      </g>
    </svg>
  )
}

/** Academy: from basics to building — a staircase with a climbing marker. */
export function FigAcademy() {
  const mono = "var(--font-geist-mono), monospace"
  const steps = [
    { x: 34, y: 134, h: 64, n: "01", en: "BASICS", ar: "الأَساس" },
    { x: 138, y: 100, h: 98, n: "02", en: "PRACTICE", ar: "التَطبيق" },
    { x: 242, y: 64, h: 134, n: "03", en: "BUILD", ar: "الإتْقان" },
  ]
  const climb = "M34 134 H138 V100 H242 V64 H346"
  return (
    <svg viewBox="0 0 400 230" className="block w-full" role="img" aria-label="Learning path from basics to practice to building">
      {steps.map((s, i) => (
        <g key={s.n}>
          <rect x={s.x} y={s.y} width="104" height={s.h} rx="6" fill={i === 2 ? CORAL : "none"} fillOpacity={i === 2 ? 0.14 : 0} stroke={i === 2 ? CORAL : "currentColor"} strokeWidth="1.5" />
          <text x={s.x + 12} y={s.y + 20} fontSize="10" letterSpacing="2" fill={i === 2 ? CORAL : "currentColor"} fontFamily={mono} fontWeight="700">
            {s.n}
          </text>
          <text x={s.x + 12} y={s.y + s.h - 26} fontSize="9" letterSpacing="2" fill="currentColor" opacity=".7" fontFamily={mono}>
            {s.en}
          </text>
          <text x={s.x + 12} y={s.y + s.h - 8} fontSize="14" fill="currentColor" className="font-ar" fontWeight="700">
            {s.ar}
          </text>
        </g>
      ))}
      <path d={climb} fill="none" stroke="currentColor" strokeWidth="1.2" strokeDasharray="3 5" opacity=".5" />
      <circle r="6" fill={CORAL}>
        <animateMotion dur="6s" repeatCount="indefinite" path={climb} keyPoints="0;1" keyTimes="0;1" calcMode="linear" />
      </circle>
      <g transform="translate(346 64)">
        <path d="M0 0 V-30" stroke="currentColor" strokeWidth="1.5" />
        <path d="M0 -30 L22 -22 L0 -14 Z" fill={CORAL} />
      </g>
    </svg>
  )
}

/** Closing dial: rotating ring of the three roles with tick marks. */
export function FigDial() {
  const ticks = Array.from({ length: 72 })
  const word = "BUILD · SECURE · TEACH · "
  return (
    <svg viewBox="0 0 600 600" className="block w-full" role="presentation" aria-hidden="true">
      <defs>
        <path id="dial-ring" d="M300 300 m-250 0 a250 250 0 1 1 500 0 a250 250 0 1 1 -500 0" />
      </defs>
      <g stroke="currentColor" fill="none" opacity=".35">
        <circle cx="300" cy="300" r="292" strokeWidth="1" />
        <circle cx="300" cy="300" r="212" strokeWidth="1" strokeDasharray="2 8" />
      </g>
      <g className="fig-spin" style={{ animationDuration: "120s" }} stroke="currentColor" opacity=".4">
        {ticks.map((_, i) => (
          <line key={i} x1="300" y1="14" x2="300" y2={i % 6 === 0 ? 34 : 24} transform={`rotate(${i * 5} 300 300)`} strokeWidth={i % 6 === 0 ? 2 : 1} />
        ))}
      </g>
      <g className="fig-spin" style={{ animationDuration: "70s", animationDirection: "reverse" }}>
        <text fontSize="15" fontWeight="600" fill="currentColor" opacity=".7" fontFamily="var(--font-geist-mono), monospace">
          <textPath href="#dial-ring" textLength="1560" lengthAdjust="spacing">
            {word.repeat(6)}
          </textPath>
        </text>
      </g>
    </svg>
  )
}

/** AI apps: a voice waveform becoming a live transcript. */
export function FigApps() {
  const bars = [14, 26, 40, 58, 74, 52, 84, 60, 44, 66, 38, 24, 14]
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="Voice waveform turning into a live transcript">
      <g transform="translate(26 110)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 12} y={-h / 2} width="6" height={h} rx="3" fill={i === 6 ? CORAL : "currentColor"} opacity={i === 6 ? 1 : 0.85} className="fig-bar" style={{ animationDelay: `${i * 0.09}s` }} />
        ))}
      </g>
      <g stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M198 110 H232" className="fig-dash" />
        <path d="M226 103 L233 110 L226 117" />
      </g>
      <rect x="248" y="50" width="130" height="120" rx="14" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
      <g fill="currentColor">
        <rect x="262" y="72" width="82" height="7" rx="3.5" opacity=".75" />
        <rect x="262" y="90" width="102" height="7" rx="3.5" opacity=".5" />
        <rect x="262" y="108" width="64" height="7" rx="3.5" opacity=".35" />
      </g>
      <rect x="262" y="130" width="10" height="16" rx="2" fill={CORAL} className="fig-blink" />
    </svg>
  )
}

/** LLM security: a guardrail filtering prompts. */
export function FigShield() {
  const shield = "M200 34 L254 54 V108 C254 142 232 164 200 178 C168 164 146 142 146 108 V54 Z"
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="A guardrail blocking a malicious prompt and passing safe ones">
      <defs>
        <clipPath id="shield-clip">
          <path d={shield} />
        </clipPath>
      </defs>
      {/* incoming prompts */}
      <g fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
        {[
          { y: 72, bad: false },
          { y: 108, bad: true },
          { y: 144, bad: false },
        ].map(({ y, bad }) => (
          <g key={y}>
            <rect x="18" y={y - 11} width="70" height="22" rx="11" stroke={bad ? CORAL : "currentColor"} opacity={bad ? 1 : 0.75} />
            <path d={`M30 ${y} H66`} opacity=".5" />
            <path d={`M92 ${y} H${bad ? 128 : 140}`} className="fig-dash" stroke={bad ? CORAL : "currentColor"} opacity=".8" />
            {bad && <path d={`M130 ${y - 7} L144 ${y + 7} M144 ${y - 7} L130 ${y + 7}`} stroke={CORAL} strokeWidth="2.5" />}
          </g>
        ))}
        {/* clean outputs */}
        {[72, 144].map((y) => (
          <g key={y}>
            <path d={`M260 ${y} H300`} className="fig-dash" opacity=".8" />
            <rect x="304" y={y - 11} width="78" height="22" rx="11" opacity=".75" />
            <circle cx="318" cy={y} r="3.5" fill={CORAL} stroke="none" />
            <path d={`M328 ${y} H368`} opacity=".4" />
          </g>
        ))}
      </g>
      {/* shield */}
      <path d={shield} fill="none" stroke="currentColor" strokeWidth="1.8" />
      <g clipPath="url(#shield-clip)">
        <rect x="140" y="40" width="120" height="26" fill={CORAL} opacity=".18" className="fig-scan2" />
        <rect x="140" y="40" width="120" height="2" fill={CORAL} className="fig-scan2" />
      </g>
      <path d="M180 108 L195 123 L222 90" fill="none" stroke={CORAL} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Security base: a directory graph with traveling signals. */
export function FigGraph() {
  const c: [number, number] = [200, 110]
  const nodes: { p: [number, number]; l: string }[] = [
    { p: [86, 56], l: "USR" },
    { p: [314, 56], l: "SRV" },
    { p: [52, 140], l: "GPO" },
    { p: [348, 140], l: "DNS" },
    { p: [140, 190], l: "SVC" },
    { p: [260, 190], l: "KRB" },
  ]
  const R = 15
  const short = (a: [number, number], b: [number, number], r1: number, r2: number) => {
    const dx = b[0] - a[0]
    const dy = b[1] - a[1]
    const d = Math.hypot(dx, dy)
    return { x1: a[0] + (dx / d) * r1, y1: a[1] + (dy / d) * r1, x2: b[0] - (dx / d) * r2, y2: b[1] - (dy / d) * r2 }
  }
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="Directory graph with a central domain node">
      <g stroke="currentColor" strokeWidth="1.2" opacity=".5" fill="none">
        {nodes.map((n, i) => {
          const s = short(c, n.p, 22, R)
          return <line key={n.l} {...s} className="fig-dash" style={{ animationDelay: `${i * 0.2}s` }} />
        })}
        <path d="M86 56 L52 140 M314 56 L348 140 M140 190 H260" strokeDasharray="2 5" opacity=".6" />
      </g>
      {nodes.map((n, i) => (
        <circle key={`d${n.l}`} r="3.5" fill={CORAL}>
          <animateMotion dur={`${2.6 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" path={`M${c[0]} ${c[1]} L${n.p[0]} ${n.p[1]}`} />
        </circle>
      ))}
      {nodes.map((n) => (
        <g key={n.l}>
          <circle cx={n.p[0]} cy={n.p[1]} r={R} fill="none" stroke="currentColor" strokeWidth="1.5" />
          <text x={n.p[0]} y={n.p[1] + 3.5} textAnchor="middle" fontSize="9" fontWeight="600" fill="currentColor" fontFamily="var(--font-geist-mono), monospace" letterSpacing="0.5">
            {n.l}
          </text>
        </g>
      ))}
      <circle cx={c[0]} cy={c[1]} r="22" fill="none" stroke={CORAL} className="fig-pulse" strokeWidth="2" />
      <circle cx={c[0]} cy={c[1]} r="22" fill={CORAL} />
      <text x={c[0]} y={c[1] + 5} textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff" fontFamily="var(--font-geist-mono), monospace">
        AD
      </text>
    </svg>
  )
}

/** Study planner: a checklist and a timer ring. */
export function FigStudy() {
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="Checklist and focus timer">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {[0, 1, 2, 3].map((i) => (
          <g key={i}>
            <rect x="30" y={44 + i * 38} width="22" height="22" rx="6" fill={i < 2 ? CORAL : "none"} stroke={i < 2 ? CORAL : "currentColor"} />
            {i < 2 && <path d={`M36 ${55 + i * 38} l5 5 l9 -10`} stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />}
            <rect x="66" y={50 + i * 38} width={[150, 120, 140, 96][i]} height="10" rx="5" fill="currentColor" opacity=".16" stroke="none" />
          </g>
        ))}
        <circle cx="318" cy="110" r="52" opacity=".25" />
        <motion.circle cx="318" cy="110" r="52" stroke={CORAL} strokeWidth="5" strokeLinecap="round" transform="rotate(-90 318 110)" initial={{ pathLength: 0 }} whileInView={{ pathLength: 0.7 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeOut" }} />
      </g>
      <text x="318" y="118" textAnchor="middle" fontSize="24" fontWeight="700" fill="currentColor" fontFamily="Inter, sans-serif">
        25:00
      </text>
    </svg>
  )
}

/** Senpai Type: a keyboard with a roaming highlight. */
export function FigKeys() {
  const cols = 8
  const rows = 3
  return (
    <svg viewBox="0 0 400 200" className="block w-full" role="img" aria-label="Keyboard keys lighting up">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {Array.from({ length: rows * cols }).map((_, i) => {
          const c = i % cols
          const r = Math.floor(i / cols)
          const hot = [3, 9, 14, 20].includes(i)
          return (
            <rect
              key={i}
              x={26 + c * 44 + r * 10}
              y={40 + r * 44}
              width="36"
              height="36"
              rx="8"
              fill={hot ? CORAL : "none"}
              stroke={hot ? CORAL : "currentColor"}
              opacity={hot ? 1 : 0.7}
              className={hot ? "fig-blink" : undefined}
              style={hot ? { animationDelay: `${i * 0.12}s` } : undefined}
            />
          )
        })}
        <rect x="106" y="176" width="190" height="14" rx="7" opacity=".7" />
      </g>
    </svg>
  )
}

/** Credentials: a rotating seal. */
export function FigSeal() {
  return (
    <svg viewBox="0 0 200 200" className="block w-full" role="img" aria-label="Verified seal">
      <defs>
        <path id="seal-circle" d="M100 100 m-74 0 a74 74 0 1 1 148 0 a74 74 0 1 1 -148 0" />
      </defs>
      <circle cx="100" cy="100" r="97" fill="none" stroke="currentColor" strokeWidth="1" opacity=".25" />
      <circle cx="100" cy="100" r="56" fill="none" stroke="currentColor" strokeWidth="1.2" opacity=".45" />
      <g className="fig-spin">
        <text fontSize="11" fontWeight="600" fill="currentColor" fontFamily="var(--font-geist-mono), monospace">
          <textPath href="#seal-circle" textLength="456" lengthAdjust="spacing">
            VERIFIED · CERTIFIED · VERIFIED · CERTIFIED ·
          </textPath>
        </text>
      </g>
      <motion.path d="M76 102 L94 120 L126 80" fill="none" stroke={CORAL} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" {...draw} />
    </svg>
  )
}

/** Story icons. */
export function StepIcon({ kind }: { kind: "break" | "teach" | "ship" | "now" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
      {kind === "break" && (
        <g {...common}>
          <path d="M32 6 L52 14 V32 C52 44 44 52 32 58 C20 52 12 44 12 32 V14 Z" />
          <path d="M30 14 L36 28 L28 34 L34 50" stroke={CORAL} />
        </g>
      )}
      {kind === "teach" && (
        <g {...common}>
          <rect x="8" y="10" width="48" height="32" rx="4" />
          <path d="M16 22 H40 M16 30 H32" stroke={CORAL} />
          <path d="M24 56 L32 42 L40 56" />
        </g>
      )}
      {kind === "ship" && (
        <g {...common}>
          <rect x="18" y="6" width="28" height="52" rx="6" />
          <path d="M32 40 V22 M25 29 L32 22 L39 29" stroke={CORAL} />
        </g>
      )}
      {kind === "now" && (
        <g {...common}>
          <rect x="16" y="16" width="32" height="32" rx="6" />
          <path d="M26 6 V16 M38 6 V16 M26 48 V58 M38 48 V58 M6 26 H16 M6 38 H16 M48 26 H58 M48 38 H58" />
          <circle cx="32" cy="32" r="6" stroke={CORAL} className="fig-blink" />
        </g>
      )}
    </svg>
  )
}

/** Contact: ripples. */
export function FigRipple() {
  return (
    <svg viewBox="0 0 300 300" className="block w-full" role="img" aria-label="Signal ripples">
      <g fill="none" stroke={CORAL} strokeWidth="2">
        <circle cx="150" cy="150" r="40" className="fig-pulse" />
        <circle cx="150" cy="150" r="40" className="fig-pulse" style={{ animationDelay: ".9s" }} />
        <circle cx="150" cy="150" r="40" className="fig-pulse" style={{ animationDelay: "1.8s" }} />
      </g>
      <circle cx="150" cy="150" r="14" fill={CORAL} />
    </svg>
  )
}

/** Lab: loss and evaluation curves while training. */
export function FigTrain() {
  return (
    <svg viewBox="0 0 400 200" className="block w-full" role="img" aria-label="Training loss and evaluation curves going down">
      <g stroke="currentColor" strokeWidth="1" opacity=".3">
        <path d="M34 20 V170 H380" fill="none" />
        {[60, 100, 140].map((y) => (
          <path key={y} d={`M34 ${y} H380`} strokeDasharray="2 6" />
        ))}
      </g>
      <motion.path d="M34 40 C 90 46, 112 120, 176 142 S 300 160, 380 164" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" {...draw} />
      <motion.path d="M34 52 C 96 62, 120 128, 190 146 S 310 166, 380 170" fill="none" stroke={CORAL} strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5" {...draw} />
      <circle r="5" fill={CORAL}>
        <animateMotion dur="5s" repeatCount="indefinite" path="M34 52 C 96 62, 120 128, 190 146 S 310 166, 380 170" />
      </circle>
      <text x="40" y="14" fontSize="9" fill="currentColor" opacity=".6" fontFamily="var(--font-geist-mono), monospace" letterSpacing="2">
        LOSS
      </text>
      <text x="380" y="190" textAnchor="end" fontSize="9" fill="currentColor" opacity=".6" fontFamily="var(--font-geist-mono), monospace" letterSpacing="2">
        STEPS →
      </text>
    </svg>
  )
}

/** Lab: a terminal window running an automation. */
export function FigTerm() {
  const mono = "var(--font-geist-mono), monospace"
  return (
    <svg viewBox="0 0 400 200" className="block w-full" role="img" aria-label="Terminal running an automation script">
      <rect x="40" y="26" width="320" height="150" rx="12" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".7" />
      <path d="M40 54 H360" stroke="currentColor" strokeWidth="1" opacity=".3" />
      {[58, 74, 90].map((x, i) => (
        <circle key={x} cx={x} cy="40" r="4" fill={i === 0 ? CORAL : "currentColor"} opacity={i === 0 ? 1 : 0.3} />
      ))}
      <g fontFamily={mono} fontSize="11" fill="currentColor">
        <text x="60" y="80">
          <tspan fill={CORAL}>$</tspan> scan --env lab
        </text>
        <text x="60" y="100" opacity=".65">
          ✓ 12 hosts enumerated
        </text>
        <text x="60" y="120" opacity=".65">
          ✓ 3 findings flagged
        </text>
        <text x="60" y="140" opacity=".65">
          ✓ report.md written
        </text>
      </g>
      <rect x="60" y="150" width="8" height="13" fill={CORAL} className="fig-blink" />
    </svg>
  )
}
