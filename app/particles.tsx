"use client"

import { useEffect, useRef } from "react"

type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; c: string; r: number }

const ARABIC = /[؀-ۿ]/

/**
 * Particles that assemble a word and react to the pointer.
 * Pass `texts` to morph between several words (for example 313 and ٣١٣).
 */
export function ParticleName({
  text,
  texts,
  interval = 5200,
  colors = ["#14213d", "#e4572e"],
  scale = 1,
}: {
  text?: string
  texts?: string[]
  interval?: number
  colors?: [string, string]
  scale?: number
}) {
  const ref = useRef<HTMLCanvasElement>(null)
  const listKey = (texts ?? [text ?? ""]).join("|")

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const list = listKey.split("|")

    let w = 0
    let h = 0
    let raf = 0
    let timer: ReturnType<typeof setInterval> | undefined
    let cancelled = false
    let idx = 0
    let visible = true
    let particles: P[] = []
    const pointer = { x: -9999, y: -9999, active: false }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const sample = (str: string): [number, number][] => {
      const off = document.createElement("canvas")
      off.width = w
      off.height = h
      const o = off.getContext("2d")!
      const family = ARABIC.test(str) ? '"Thmanyah Sans", Inter, system-ui, sans-serif' : "Inter, system-ui, sans-serif"
      let size = Math.min(w * 0.5, h * 0.55) * scale
      o.font = `800 ${size}px ${family}`
      while (o.measureText(str).width > w * 0.9 && size > 20) {
        size -= 4
        o.font = `800 ${size}px ${family}`
      }
      o.textAlign = "center"
      o.textBaseline = "middle"
      o.fillText(str, w / 2, h * 0.46)
      const data = o.getImageData(0, 0, w, h).data
      const gap = w < 600 ? 4 : 6
      const out: [number, number][] = []
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] > 128) out.push([x, y])
        }
      }
      return out
    }

    const make = (tx: number, ty: number, i: number, scatter = true): P => ({
      x: scatter ? Math.random() * w : tx,
      y: scatter ? Math.random() * h : ty,
      tx,
      ty,
      vx: 0,
      vy: 0,
      c: i % 9 === 0 ? colors[1] : colors[0],
      r: w < 600 ? 1.1 : 1.7,
    })

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.floor(rect.width)
      h = Math.floor(rect.height)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      particles = sample(list[idx]).map(([tx, ty], i) => make(tx, ty, i))
    }

    const retarget = () => {
      if (!visible || document.hidden) return
      idx = (idx + 1) % list.length
      const targets = sample(list[idx])
      for (let i = targets.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[targets[i], targets[j]] = [targets[j], targets[i]]
      }
      for (let i = 0; i < targets.length; i++) {
        const [tx, ty] = targets[i]
        if (particles[i]) {
          particles[i].tx = tx
          particles[i].ty = ty
        } else {
          const src = particles[i % Math.max(particles.length, 1)]
          const p = make(tx, ty, i)
          if (src) {
            p.x = src.x
            p.y = src.y
          }
          particles.push(p)
        }
      }
      particles.length = targets.length
    }

    const tick = () => {
      if (!visible) {
        raf = requestAnimationFrame(tick)
        return
      }
      ctx.clearRect(0, 0, w, h)
      const radius = 90
      for (const p of particles) {
        const dx = p.x - pointer.x
        const dy = p.y - pointer.y
        const d2 = dx * dx + dy * dy
        if (pointer.active && d2 < radius * radius) {
          const d = Math.sqrt(d2) || 1
          const f = (1 - d / radius) * 7
          p.vx += (dx / d) * f
          p.vy += (dy / d) * f
        }
        p.vx += (p.tx - p.x) * 0.045
        p.vy += (p.ty - p.y) * 0.045
        p.vx *= 0.84
        p.vy *= 0.84
        p.x += p.vx
        p.y += p.vy
        ctx.fillStyle = p.c
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = true
    }
    const leave = () => {
      pointer.active = false
    }
    const click = () => {
      if (list.length > 1) retarget()
    }

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)

    const start = () => {
      if (cancelled) return
      build()
      tick()
      if (list.length > 1 && !reduce) timer = setInterval(retarget, interval)
    }
    const needsArabic = list.some((t) => ARABIC.test(t))
    if (needsArabic && document.fonts?.load) {
      document.fonts.load('800 80px "Thmanyah Sans"', "٣١٣").then(start, start)
    } else {
      start()
    }

    window.addEventListener("resize", build)
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerdown", move)
    canvas.addEventListener("pointerleave", leave)
    canvas.addEventListener("pointerup", leave)
    canvas.addEventListener("click", click)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
      if (timer) clearInterval(timer)
      io.disconnect()
      window.removeEventListener("resize", build)
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerdown", move)
      canvas.removeEventListener("pointerleave", leave)
      canvas.removeEventListener("pointerup", leave)
      canvas.removeEventListener("click", click)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listKey, colors[0], colors[1], interval, scale])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full touch-pan-y" aria-label={listKey.split("|")[0]} />
}
