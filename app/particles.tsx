"use client"

import { useEffect, useRef } from "react"

type P = { x: number; y: number; tx: number; ty: number; vx: number; vy: number; c: string; r: number }

export function ParticleName({ text }: { text: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let w = 0
    let h = 0
    let raf = 0
    let particles: P[] = []
    const pointer = { x: -9999, y: -9999, active: false }
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.floor(rect.width)
      h = Math.floor(rect.height)
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      // sample the word into target points
      const off = document.createElement("canvas")
      off.width = w
      off.height = h
      const o = off.getContext("2d")!
      let size = Math.min(w * 0.5, h * 0.55)
      o.font = `800 ${size}px Inter, system-ui, sans-serif`
      while (o.measureText(text).width > w * 0.9 && size > 20) {
        size -= 4
        o.font = `800 ${size}px Inter, system-ui, sans-serif`
      }
      o.textAlign = "center"
      o.textBaseline = "middle"
      o.fillText(text, w / 2, h * 0.46)
      const data = o.getImageData(0, 0, w, h).data
      const gap = w < 600 ? 4 : 6
      const targets: [number, number][] = []
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (data[(y * w + x) * 4 + 3] > 128) targets.push([x, y])
        }
      }
      particles = targets.map(([tx, ty], i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        tx,
        ty,
        vx: 0,
        vy: 0,
        c: i % 9 === 0 ? "#e4572e" : "#14213d",
        r: w < 600 ? 1.1 : 1.7,
      }))
    }

    let visible = true
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

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting
    })
    io.observe(canvas)
    build()
    tick()
    window.addEventListener("resize", build)
    canvas.addEventListener("pointermove", move)
    canvas.addEventListener("pointerdown", move)
    canvas.addEventListener("pointerleave", leave)
    canvas.addEventListener("pointerup", leave)
    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      window.removeEventListener("resize", build)
      canvas.removeEventListener("pointermove", move)
      canvas.removeEventListener("pointerdown", move)
      canvas.removeEventListener("pointerleave", leave)
      canvas.removeEventListener("pointerup", leave)
    }
  }, [text])

  return <canvas ref={ref} className="absolute inset-0 h-full w-full touch-pan-y" aria-label={text} />
}
