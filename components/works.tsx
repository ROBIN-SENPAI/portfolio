"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const projects = [
  {
    title: "Senpai Academy",
    description: "The main educational hub for cybersecurity students — guides, roadmaps and Arabic study resources in one place.",
    tags: ["Education", "Cybersecurity", "Hub"],
    href: "https://academysenpai.com/",
    host: "academysenpai.com",
  },
  {
    title: "Senpai Type",
    description: "A clean typing practice platform built for the community.",
    tags: ["Typing", "Practice", "Web"],
    href: "https://senpai-type.pages.dev/",
    host: "senpai-type.pages.dev",
  },
  {
    title: "مُرشدي · Murshidi",
    description: "Android app that helps university students organize their study and focus more.",
    tags: ["Android", "Students", "Productivity"],
    href: "https://murshidi.academysenpai.com",
    host: "murshidi.academysenpai.com",
  },
  {
    title: "تُرجُمَان · Tarjuman",
    description: "Instant voice translation in your ear across 29 languages, with offline phrases and a 197-country guide.",
    tags: ["Android", "Translation", "Voice"],
    href: "https://tarjuman.academysenpai.com/",
    host: "tarjuman.academysenpai.com",
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <motion.a
      href={project.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative flex flex-col justify-between min-h-[260px] overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.04]"
    >
      <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-accent/[0.08] blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

      <div className="relative flex items-start justify-between">
        <span className="font-mono text-xs tracking-widest text-muted-foreground/60 group-hover:text-accent transition-colors">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-all duration-300 group-hover:border-accent group-hover:bg-accent">
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:text-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>

      <div className="relative mt-10">
        <h3 className="text-2xl md:text-3xl font-light tracking-tight text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-white/10 px-3 py-1 font-mono text-[10px] tracking-wider text-muted-foreground group-hover:border-accent/30 group-hover:text-accent/80 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
        <p className="mt-4 font-mono text-[11px] text-muted-foreground/50">{project.host}</p>
      </div>
    </motion.a>
  )
}

export function Works() {
  return (
    <section id="works" className="relative py-24 md:py-32 px-8 md:px-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 right-10 h-96 w-96 rounded-full bg-accent/[0.04] blur-[140px]" />
      </div>

      <div className="relative mx-auto mb-14 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 flex items-center gap-4">
            <div className="h-px w-8 bg-accent/40" />
            <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground">06 — PLATFORMS & PROJECTS</p>
          </div>
          <h2 className="text-3xl md:text-5xl font-light italic leading-tight">Platforms I built</h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground text-pretty">
            Four live products — an academy, a typing platform and two Android apps.
          </p>
        </motion.div>
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-5 md:grid-cols-2">
        {projects.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  )
}
