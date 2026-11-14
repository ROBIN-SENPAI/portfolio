"use client"

import { ReactLenis } from "lenis/react"
import type { ReactNode } from "react"

export function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis root options={{ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true, anchors: false }}>
      {children}
    </ReactLenis>
  )
}
