"use client"

import { motion } from "framer-motion"

const areas = [
  {
    index: "01",
    title: "AI-Powered Apps",
    description:
      "Designing and shipping products that put AI to work — voice translation, study assistants, and Arabic-first experiences.",
  },
  {
    index: "02",
    title: "LLM & AI Security",
    description:
      "Prompt injection, AI red teaming and guardrails — understanding how language models fail so they can be deployed safely.",
  },
  {
    index: "03",
    title: "Cybersecurity Foundations",
    description:
      "A solid base in Active Directory, red teaming and secure code review that informs every system I design.",
  },
  {
    index: "04",
    title: "Education & Platforms",
    description:
      "Building Senpai Academy and Arabic learning resources that turn complex topics into clear paths for students.",
  },
]

export function Expertise() {
  return (
    <section id="expertise" className="relative py-24 px-8 md:px-12 md:py-32">
      {/* Dot Grid Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }} />
        <div className="absolute top-20 right-10 w-80 h-80 rounded-full bg-accent/[0.03] blur-[100px]" />
      </div>

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="mb-16 md:mb-20 relative"
      >
        <p className="font-mono text-xs tracking-[0.3em] text-muted-foreground mb-4">04 — EXPERTISE</p>
        <h2 className="font-sans text-3xl md:text-5xl font-light mb-4">Areas of Focus</h2>
        <p className="max-w-xl font-mono text-xs md:text-sm leading-relaxed text-muted-foreground text-pretty">
          Where artificial intelligence meets security — the domains I build, test, and teach.
        </p>
      </motion.div>

      {/* Expertise Grid */}
      <div className="grid md:grid-cols-2 gap-px bg-white/[0.07] border border-white/[0.07] relative">
        {areas.map((area, index) => (
          <motion.div
            key={area.index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: index * 0.1 }}
            className="group bg-background p-8 md:p-12 flex flex-col gap-6 hover:bg-white/[0.02] transition-all duration-500 relative"
          >
            {/* Hover accent line */}
            <motion.div
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-accent/0 via-accent to-accent/0 scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
            />
            {/* Hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
            </div>
            <div className="flex items-start justify-between relative z-10">
              <span className="font-mono text-xs tracking-widest text-accent">{area.index}</span>
              <motion.span
                className="w-2 h-2 rounded-full border border-white/20 group-hover:bg-accent group-hover:border-accent transition-colors duration-300"
                whileHover={{ scale: 2 }}
              />
            </div>
            <h3 className="font-sans text-2xl md:text-3xl font-light tracking-tight group-hover:text-accent transition-colors duration-300 relative z-10">
              {area.title}
            </h3>
            <p className="font-mono text-xs md:text-sm leading-relaxed text-muted-foreground text-pretty relative z-10">
              {area.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
