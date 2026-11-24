import type React from "react"
import type { Metadata, Viewport } from "next"
import { Instrument_Serif, Geist_Mono, Instrument_Sans, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
})

const inter = Instrument_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-v2",
})

const hand = Caveat({
  subsets: ["latin"],
  weight: ["600"],
  variable: "--font-hand",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "MBF Portfolio",
  description:
    "Building with AI. Securing what it builds. Software developer, cybersecurity researcher and founder of Senpai Academy.",
  generator: "v0.app",
  metadataBase: new URL("https://robin-senpai.github.io"),
  openGraph: {
    title: "MBF Portfolio — M. Baqir Firas",
    description: "AI-powered Arabic apps, LLM security and educational platforms. Founder of Senpai Academy.",
    url: "/portfolio/",
    siteName: "M. Baqir Firas",
    type: "website",
    images: [{ url: "/portfolio/og.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "MBF Portfolio — M. Baqir Firas",
    description: "AI-powered Arabic apps, LLM security and educational platforms.",
    images: ["/portfolio/og.png"],
  },
  icons: {
    icon: [
      { url: "/portfolio/badge.svg", type: "image/svg+xml" },
      { url: "/portfolio/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/portfolio/apple-icon.png",
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
    <html lang="en" className={`${serif.variable} ${hand.variable} ${geistMono.variable} ${inter.variable}`}>
      <body className="font-sans antialiased overflow-x-hidden">
        <div className="noise-overlay" />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
