import type React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Geist_Mono, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
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
  metadataBase: new URL("https://robin-senpai.github.io"),
  openGraph: {
    title: "M. Baqir Firas — AI, Apps & Security",
    description: "AI-powered Arabic apps, LLM security and educational platforms. Founder of Senpai Academy.",
    url: "/portfolio/",
    siteName: "M. Baqir Firas",
    type: "website",
    images: [{ url: "/portfolio/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "M. Baqir Firas — AI, Apps & Security",
    description: "AI-powered Arabic apps, LLM security and educational platforms.",
    images: ["/portfolio/og.png"],
  },
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
    <html lang="en" className={`${serif.variable} ${geistMono.variable} ${inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
