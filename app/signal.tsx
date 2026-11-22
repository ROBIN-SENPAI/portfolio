"use client"

import { useEffect, useRef } from "react"

// A live spectrum of orange bars. It idles like a voice signal and swells toward the pointer.
export function Signal() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    let w = 0
    let h = 0
    let raf = 0
    let bars: number[] = []
    const pointer = { x: -9999, active: false }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    const resize = () => {
      const r = canvas.getBoundingClientRect()
      w = Math.floor(r.width)
      h = Math.floor(r.height)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = w < 600 ? 28 : 64
      bars = new Array(count).fill(0)
    }

    const draw = (ms: number) => {
      const t = ms / 1000
      ctx.clearRect(0, 0, w, h)
      const n = bars.length
      const slot = w / n
      const bw = slot * 0.62
      for (let i = 0; i < n; i++) {
        const x = (i + 0.5) * slot
        const idle = 0.5 + 0.5 * Math.sin(t * 1.4 + i * 0.37) * Math.sin(t * 0.6 + i * 0.13)
        const dist = x - pointer.x
        const near = pointer.active ? Math.exp(-(dist * dist) / (2 * 120 * 120)) : 0
        const target = 0.1 + idle * 0.32 + near * 0.55
        bars[i] += (target - bars[i]) * 0.14
        const bh = bars[i] * h
        const y = h - bh
        const g = ctx.createLinearGradient(0, y, 0, h)
        g.addColorStop(0, "#ff5a00")
        g.addColorStop(1, "rgba(255,90,0,0.15)")
        ctx.fillStyle = g
        ctx.fillRect(x - bw / 2, y, bw, bh)
        ctx.fillStyle = "#f5f2ee"
        ctx.fillRect(x - bw / 2, y - 3, bw, 3)
      }
      if (!reduce) raf = requestAnimationFrame(draw)
    }

    const move = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.active = true
    }
    const leave = () => {
      pointer.active = false
    }

    resize()
    raf = requestAnimationFrame(draw)
    window.addEventListener("resize", resize)
    window.addEventListener("pointermove", move)
    canvas.addEventListener("pointerleave", leave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
      window.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerleave", leave)
    }
  }, [])

  return <canvas ref={ref} className="absolute inset-x-0 bottom-0 h-[58%] w-full" aria-hidden="true" />
}
