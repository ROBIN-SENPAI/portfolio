import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"

const inter = Inter({ subsets: ["latin"], variable: "--font-v2" })

export const metadata: Metadata = {
  title: "M. Baqir Firas — AI, Apps & Security",
  description:
    "Developer building AI-powered Arabic apps and educational platforms, with a focus on LLM security. Founder of Senpai Academy.",
}

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return <div className={`${inter.variable} v2-root`}>{children}</div>
}
