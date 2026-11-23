"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

const CORAL = "#e4572e"
const INK = "#14213d"

/** Hand-written note with a hand-drawn arrow that draws itself. */
export function Note({
  children,
  arrow = "down",
  className = "",
  color = CORAL,
}: {
  children: React.ReactNode
  arrow?: "down" | "left" | "right" | "up"
  className?: string
  color?: string
}) {
  const paths: Record<string, string> = {
    down: "M8 6 C 34 4, 52 26, 44 62 M36 52 L44 63 L54 54",
    up: "M8 62 C 34 64, 52 42, 44 8 M36 18 L44 7 L54 16",
    left: "M70 10 C 46 4, 20 14, 6 40 M16 38 L5 42 L10 30",
    right: "M6 10 C 30 4, 56 14, 70 40 M60 38 L72 42 L66 30",
  }
  return (
    <div className={`font-[family-name:var(--font-hand)] pointer-events-none flex items-start gap-1 text-2xl leading-none md:text-3xl ${className}`} style={{ color }}>
      <span className="-rotate-3 whitespace-nowrap pt-1">{children}</span>
      <svg viewBox="0 0 76 70" className="h-12 w-14 shrink-0 md:h-14 md:w-16" fill="none" stroke={color} strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <motion.path
          d={paths[arrow]}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  )
}

/** A paper card held with a strip of tape. */
export function Sticker({ children, className = "", rotate = -3 }: { children: React.ReactNode; className?: string; rotate?: number }) {
  return (
    <div className={`w-max ${className}`}>
      <motion.div
        className="relative px-6 pb-5 pt-7"
        style={{ background: "#fffaf0", rotate, boxShadow: "0 18px 30px -18px rgba(20,33,61,.45), 0 1px 0 rgba(20,33,61,.08)", border: "1px solid rgba(20,33,61,.1)" }}
        initial={{ opacity: 0, y: 24, rotate: rotate - 6 }}
        whileInView={{ opacity: 1, y: 0, rotate }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-2" style={{ background: "rgba(232,200,114,.78)", boxShadow: "0 1px 2px rgba(0,0,0,.12)" }} />
        {children}
      </motion.div>
    </div>
  )
}

/** Hand-drawn wavy underline. */
export function Wavy({ className = "", color = CORAL }: { className?: string; color?: string }) {
  const seg = 28
  let d = "M0 8"
  for (let x = 0; x < 28; x++) d += ` q${seg / 4} -8 ${seg / 2} 0 t${seg / 2} 0`
  return (
    <svg viewBox="0 0 800 16" preserveAspectRatio="none" className={`block w-full ${className}`} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <motion.path d={d} initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
    </svg>
  )
}

/** Faint vertical guide lines, like a layout grid. */
export function GuideLines() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[5] hidden md:block" aria-hidden="true">
      {[12.5, 37.5, 62.5, 87.5].map((l) => (
        <span key={l} className="absolute inset-y-0 w-px" style={{ left: `${l}%`, background: "rgba(128,128,128,.13)" }} />
      ))}
    </div>
  )
}

/** Dot + trailing ring cursor (mouse only). */
export function CursorRing() {
  const dot = useRef<HTMLDivElement>(null)
  const ring = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return
    let x = -100
    let y = -100
    let rx = -100
    let ry = -100
    let scale = 1
    let raf = 0
    const move = (e: PointerEvent) => {
      x = e.clientX
      y = e.clientY
      const t = e.target as HTMLElement | null
      scale = t?.closest("a, button, textarea, input") ? 1.9 : 1
    }
    const tick = () => {
      rx += (x - rx) * 0.2
      ry += (y - ry) * 0.2
      if (dot.current) dot.current.style.transform = `translate3d(${x - 3}px, ${y - 3}px, 0)`
      if (ring.current) ring.current.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${scale})`
      raf = Math.abs(x - rx) + Math.abs(y - ry) > 0.2 ? requestAnimationFrame(tick) : 0
    }
    const wake = () => {
      if (!raf) raf = requestAnimationFrame(tick)
    }
    const onMove = (e: PointerEvent) => {
      move(e)
      wake()
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    raf = requestAnimationFrame(tick)
    return () => {
      window.removeEventListener("pointermove", onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  const base = "pointer-events-none fixed left-0 top-0 z-[200] hidden [@media(pointer:fine)]:block"
  return (
    <>
      <div ref={ring} className={`${base} h-8 w-8 rounded-full border transition-[scale] duration-200`} style={{ borderColor: "#fff", mixBlendMode: "difference" }} aria-hidden="true" />
      <div ref={dot} className={`${base} h-[6px] w-[6px] rounded-full`} style={{ background: "#fff", mixBlendMode: "difference" }} aria-hidden="true" />
    </>
  )
}

export { INK }
