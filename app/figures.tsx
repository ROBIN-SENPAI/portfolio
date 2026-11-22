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

/** English <-> Arabic bridge: the mission. */
export function FigBridge() {
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="English and Arabic connected by a signal">
      <g stroke="currentColor" fill="none" strokeWidth="1.5">
        <circle cx="70" cy="110" r="42" opacity=".9" />
        <circle cx="330" cy="110" r="42" opacity=".9" />
        <motion.path d="M112 110 C 160 40, 240 40, 288 110" {...draw} />
        <motion.path d="M112 110 C 160 180, 240 180, 288 110" {...draw} opacity=".5" />
        <path d="M112 110 L288 110" className="fig-dash" opacity=".4" />
      </g>
      <text x="70" y="124" textAnchor="middle" fontSize="40" fontWeight="700" fill="currentColor" fontFamily="Inter, sans-serif">
        A
      </text>
      <text x="330" y="126" textAnchor="middle" fontSize="44" fontWeight="800" fill="currentColor" className="font-ar">
        ع
      </text>
      <circle r="5" fill={CORAL}>
        <animateMotion dur="3.2s" repeatCount="indefinite" path="M112 110 C 160 40, 240 40, 288 110" />
      </circle>
      <circle r="5" fill={CORAL} opacity=".6">
        <animateMotion dur="3.2s" begin="1.6s" repeatCount="indefinite" path="M288 110 C 240 180, 160 180, 112 110" />
      </circle>
      <circle cx="200" cy="110" r="3" fill={CORAL} className="fig-blink" />
    </svg>
  )
}

/** AI apps: voice waveform becoming text tokens. */
export function FigApps() {
  const bars = [30, 56, 80, 44, 96, 62, 36, 72, 50, 28]
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="Voice waveform turning into text tokens">
      <g transform="translate(24 110)">
        {bars.map((h, i) => (
          <rect key={i} x={i * 16} y={-h / 2} width="8" height={h} rx="4" fill={i % 3 === 0 ? CORAL : "currentColor"} className="fig-bar" style={{ animationDelay: `${i * 0.11}s` }} />
        ))}
      </g>
      <path d="M200 110 H236" stroke="currentColor" strokeWidth="1.5" className="fig-dash" />
      <path d="M232 102 L242 110 L232 118" fill="none" stroke="currentColor" strokeWidth="1.5" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} className="fig-blink" style={{ animationDelay: `${i * 0.5}s` }}>
          <rect x={256} y={58 + i * 34} width={[110, 84, 120, 66][i]} height="22" rx="11" fill="none" stroke="currentColor" strokeWidth="1.5" />
          <circle cx={268} cy={69 + i * 34} r="3.5" fill={CORAL} />
        </g>
      ))}
    </svg>
  )
}

/** LLM security: a shield scanning incoming prompts. */
export function FigShield() {
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="Shield scanning incoming prompts">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M200 30 L262 52 V112 C262 152 234 178 200 192 C166 178 138 152 138 112 V52 Z" />
        <path d="M176 110 L194 128 L228 90" stroke={CORAL} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {[70, 110, 150].map((y, i) => (
          <g key={y}>
            <path d={`M20 ${y} H112`} className="fig-dash" opacity=".7" />
            <rect x="20" y={y - 7} width="30" height="14" rx="7" fill="currentColor" opacity=".12" />
            {i === 1 && (
              <g stroke={CORAL} strokeWidth="2.5" strokeLinecap="round">
                <path d="M118 103 L132 117 M132 103 L118 117" />
              </g>
            )}
          </g>
        ))}
        <path d="M288 90 H380 M288 110 H360 M288 130 H372" opacity=".5" strokeLinecap="round" />
      </g>
      <g className="fig-scan">
        <rect x="140" y="106" width="120" height="3" fill={CORAL} opacity=".7" />
      </g>
    </svg>
  )
}

/** Security base: a directory graph. */
export function FigGraph() {
  const nodes: [number, number][] = [
    [90, 60], [310, 60], [60, 140], [340, 140], [150, 190], [260, 190],
  ]
  return (
    <svg viewBox="0 0 400 220" className="block w-full" role="img" aria-label="Network graph with a central domain node">
      <g stroke="currentColor" strokeWidth="1.2" opacity=".55">
        {nodes.map(([x, y], i) => (
          <line key={i} x1="200" y1="110" x2={x} y2={y} className="fig-dash" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
        <line x1="90" y1="60" x2="60" y2="140" />
        <line x1="310" y1="60" x2="340" y2="140" />
        <line x1="150" y1="190" x2="260" y2="190" />
      </g>
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="9" fill="none" stroke="currentColor" strokeWidth="1.5" />
      ))}
      <circle cx="200" cy="110" r="14" fill={CORAL} />
      <circle cx="200" cy="110" r="14" fill="none" stroke={CORAL} className="fig-pulse" strokeWidth="2" />
      <circle cx="200" cy="110" r="14" fill="none" stroke={CORAL} className="fig-pulse" style={{ animationDelay: "1.3s" }} strokeWidth="2" />
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

/** Senpai Academy: stacked learning layers. */
export function FigAcademy() {
  return (
    <svg viewBox="0 0 400 200" className="block w-full" role="img" aria-label="Stacked learning layers">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        {[0, 1, 2].map((i) => (
          <g key={i} className="fig-float" style={{ animationDelay: `${i * 0.35}s` }}>
            <path d={`M110 ${120 - i * 34} L200 ${86 - i * 34} L290 ${120 - i * 34} L200 ${154 - i * 34} Z`} fill={i === 2 ? CORAL : "none"} stroke={i === 2 ? CORAL : "currentColor"} opacity={i === 2 ? 1 : 0.8} />
          </g>
        ))}
        <path d="M200 20 V40" strokeLinecap="round" />
        <circle cx="200" cy="14" r="5" fill="currentColor" stroke="none" />
      </g>
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
        <path id="seal-circle" d="M100 100 m-72 0 a72 72 0 1 1 144 0 a72 72 0 1 1 -144 0" />
      </defs>
      <g className="fig-spin">
        <text fontSize="13" letterSpacing="5" fill="currentColor" fontFamily="var(--font-geist-mono), monospace">
          <textPath href="#seal-circle">VERIFIED · CERTIFIED · VERIFIED · CERTIFIED · </textPath>
        </text>
      </g>
      <circle cx="100" cy="100" r="44" fill="none" stroke="currentColor" strokeWidth="1.5" opacity=".5" />
      <motion.path d="M78 102 L94 118 L124 82" fill="none" stroke={CORAL} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" {...draw} />
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
