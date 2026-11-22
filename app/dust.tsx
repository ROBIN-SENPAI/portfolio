"use client"

import { useEffect, useRef } from "react"

// Fine particle "dust" shapes. Original implementation: a 3D knot, a shield and any word.

const LIGHT = ["#14213d", "#e4572e", "#4a6fd6"]
const DARK = ["#f1ece1", "#e4572e", "#7f9cf0"]
const ARABIC = /[؀-ۿ]/

type Pt = { x: number; y: number; z: number; ci: number; a: number; s: number; ph: number; dx: number; dy: number }

const SHIELD = "M50 4 L92 18 V52 C92 76 74 92 50 98 C26 92 8 76 8 52 V18 Z"

export function DustCanvas({
  kind,
  text = "",
  dark = false,
  count,
  className = "",
}: {
  kind: "knot" | "shield" | "text" | "chat"
  text?: string
  dark?: boolean
  count?: number
  className?: string
}) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const palette = dark ? DARK : LIGHT
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const N = count ?? (kind === "knot" ? 9000 : 7000)

    let w = 0
    let h = 0
    let raf = 0
    let visible = true
    let cancelled = false
    let pts: Pt[] = []
    const pointer = { x: -9999, y: -9999, active: false }

    const rnd = (a = 1) => Math.random() * a
    const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5

    const buildKnot = () => {
      pts = []
      for (let i = 0; i < N; i++) {
        const t = rnd(Math.PI * 2)
        const r = 0.34 * (0.35 + rnd(0.65))
        const cx = (2 + Math.cos(3 * t)) * Math.cos(2 * t)
        const cy = (2 + Math.cos(3 * t)) * Math.sin(2 * t)
        const cz = -Math.sin(3 * t)
        const seg = t < (Math.PI * 2) / 3 ? 1 : t < (Math.PI * 4) / 3 ? 0 : 2
        pts.push({ x: cx + gauss() * r, y: cy + gauss() * r, z: cz + gauss() * r, ci: Math.random() < 0.06 ? (seg + 1) % 3 : seg, a: 0.35 + rnd(0.6), s: 0.7 + rnd(1.1), ph: rnd(6.28), dx: 0, dy: 0 })
      }
    }

    const buildRaster = (draw: (o: CanvasRenderingContext2D) => void) => {
      const off = document.createElement("canvas")
      off.width = w
      off.height = h
      const o = off.getContext("2d")!
      draw(o)
      const data = o.getImageData(0, 0, w, h).data
      pts = []
      let guard = 0
      while (pts.length < N && guard < N * 60) {
        guard++
        const x = Math.floor(rnd(w))
        const y = Math.floor(rnd(h))
        if (data[(y * w + x) * 4 + 3] > 100) {
          const u = x / w + gauss() * 0.12
          pts.push({ x, y, z: 0, ci: u < 0.38 ? 2 : u < 0.68 ? 0 : 1, a: 0.3 + rnd(0.65), s: 0.6 + rnd(1.2), ph: rnd(6.28), dx: 0, dy: 0 })
        }
      }
    }

    const build = () => {
      const r = canvas.getBoundingClientRect()
      w = Math.max(10, Math.floor(r.width))
      h = Math.max(10, Math.floor(r.height))
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (kind === "knot") buildKnot()
      else if (kind === "chat")
        buildRaster((o) => {
          // two speech bubbles: English "A" and Arabic "ع" talking to each other
          const sc = Math.min(w, h) / 104
          o.translate((w - 100 * sc) / 2, (h - 100 * sc) / 2)
          o.scale(sc, sc)
          const bubble1 = new Path2D()
          bubble1.roundRect(4, 10, 58, 42, 13)
          bubble1.moveTo(14, 50)
          bubble1.lineTo(10, 70)
          bubble1.lineTo(32, 52)
          bubble1.closePath()
          const bubble2 = new Path2D()
          bubble2.roundRect(38, 46, 58, 42, 13)
          bubble2.moveTo(86, 86)
          bubble2.lineTo(92, 100)
          bubble2.lineTo(70, 88)
          bubble2.closePath()
          o.fill(bubble1)
          // carve a clean gap around the second bubble, then fill it
          o.globalCompositeOperation = "destination-out"
          o.lineWidth = 6
          o.stroke(bubble2)
          o.fill(bubble2)
          o.globalCompositeOperation = "source-over"
          o.fill(bubble2)
          // letters cut out of the bubbles
          o.globalCompositeOperation = "destination-out"
          o.textAlign = "center"
          o.textBaseline = "middle"
          o.font = '800 34px Inter, sans-serif'
          o.fillText("A", 33, 33)
          o.font = '800 38px "Thmanyah Sans", Inter, sans-serif'
          o.fillText("ع", 67, 68)
        })
      else if (kind === "shield")
        buildRaster((o) => {
          const s = Math.min(w, h) / 104
          o.translate((w - 100 * s) / 2, (h - 100 * s) / 2)
          o.scale(s, s)
          o.fill(new Path2D(SHIELD))
        })
      else
        buildRaster((o) => {
          const family = ARABIC.test(text) ? '"Thmanyah Serif Display", "Thmanyah Sans", serif' : "Inter, sans-serif"
          let size = h * 0.7
          o.font = `800 ${size}px ${family}`
          while (o.measureText(text).width > w * 0.92 && size > 16) {
            size -= 4
            o.font = `800 ${size}px ${family}`
          }
          o.textAlign = "center"
          o.textBaseline = "middle"
          o.fillText(text, w / 2, h * 0.52)
        })
    }

    const draw = (ms: number) => {
      const t = ms / 1000
      ctx.clearRect(0, 0, w, h)
      if (kind === "knot") {
        const ay = t * 0.35
        const ax = 0.55 + Math.sin(t * 0.2) * 0.15
        const cy = Math.cos(ay)
        const sy = Math.sin(ay)
        const cx = Math.cos(ax)
        const sx = Math.sin(ax)
        const unit = Math.min(w, h) / 6.4
        for (let c = 0; c < 3; c++) {
          ctx.fillStyle = palette[c]
          for (const p of pts) {
            if (p.ci !== c) continue
            const x1 = p.x * cy + p.z * sy
            const z1 = -p.x * sy + p.z * cy
            const y1 = p.y * cx - z1 * sx
            const z2 = p.y * sx + z1 * cx
            const k = 4 / (4 - z2 * 0.5)
            ctx.globalAlpha = p.a * (0.55 + 0.45 * ((z2 + 3) / 6))
            ctx.fillRect(w / 2 + x1 * unit * k, h / 2 + y1 * unit * k, p.s * k, p.s * k)
          }
        }
      } else {
        for (let c = 0; c < 3; c++) {
          ctx.fillStyle = palette[c]
          for (const p of pts) {
            if (p.ci !== c) continue
            let tx = 0
            let ty = 0
            if (pointer.active) {
              const dx = p.x - pointer.x
              const dy = p.y - pointer.y
              const d2 = dx * dx + dy * dy
              if (d2 < 6400) {
                const d = Math.sqrt(d2) || 1
                const f = (1 - d / 80) * 26
                tx = (dx / d) * f
                ty = (dy / d) * f
              }
            }
            p.dx += (tx - p.dx) * 0.1
            p.dy += (ty - p.dy) * 0.1
            const jx = Math.sin(t * 0.9 + p.ph) * 1.1
            const jy = Math.cos(t * 0.8 + p.ph * 1.3) * 1.1
            ctx.globalAlpha = p.a
            ctx.fillRect(p.x + p.dx + jx, p.y + p.dy + jy, p.s, p.s)
          }
        }
      }
      ctx.globalAlpha = 1
    }

    const loop = (ms: number) => {
      if (cancelled) return
      if (visible) draw(ms)
      raf = requestAnimationFrame(loop)
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    const start = () => {
      if (cancelled) return
      build()
      if (reduce) draw(0)
      else raf = requestAnimationFrame(loop)
    }
    if (kind === "text" && ARABIC.test(text) && document.fonts?.load) {
      document.fonts.load('800 60px "Thmanyah Serif Display"', text).then(start, start)
    } else if (kind === "chat" && document.fonts?.load) {
      document.fonts.load('800 60px "Thmanyah Sans"', "ع").then(start, start)
    } else start()

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = true
    }
    const leave = () => {
      pointer.active = false
    }
    const resize = () => build()
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerleave", leave)
    window.addEventListener("resize", resize)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      io.disconnect()
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerleave", leave)
      window.removeEventListener("resize", resize)
    }
  }, [kind, text, dark, count])

  return <canvas ref={ref} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
