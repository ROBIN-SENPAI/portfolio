import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist_Mono, Inter, Cairo } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["600", "800"],
  variable: "--font-ar",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-v2",
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
  themeColor: "#f1ece1",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cairo.variable} ${geistMono.variable} ${inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
