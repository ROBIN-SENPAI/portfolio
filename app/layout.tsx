import type React from "react"
import type { Metadata, Viewport } from "next"
import { Anton, Space_Grotesk, Geist_Mono, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
})

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
})

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "800"],
  variable: "--font-ar",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "M. Baqir Firas — AI, Apps & Security",
  description:
    "AI builder and cybersecurity practitioner — building AI-powered apps and Arabic educational platforms, with a focus on LLM security.",
  generator: "v0.app",
  icons: {
    icon: "/portfolio/badge.svg",
  },
}

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${anton.variable} ${grotesk.variable} ${cairo.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
