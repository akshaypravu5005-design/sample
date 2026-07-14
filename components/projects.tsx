"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

const projects = [
  {
    title: "Terracotta House",
    category: "Private Residence",
    year: "2025",
    image: "/images/project-terracotta-house.png",
    alt: "Modern brick residence with warm terracotta facade at golden hour",
  },
  {
    title: "Pavilion of Silence",
    category: "Public Space",
    year: "2024",
    image: "/images/project-concrete-pavilion.png",
    alt: "Minimalist concrete pavilion with a single tree in the courtyard",
  },
  {
    title: "Breathing Wall Courtyard",
    category: "Residential",
    year: "2024",
    image: "/images/project-brick-courtyard.png",
    alt: "Interior courtyard with perforated brick screen casting shadow patterns",
  },
  {
    title: "Vaulted Culture Hall",
    category: "Cultural",
    year: "2023",
    image: "/images/project-culture-hall.png",
    alt: "Cultural center with sweeping curved brick walls and vaulted ceiling",
  },
]

export default function Projects() {
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">Selected Work</p>
          <h2 className="font-serif text-4xl text-foreground text-balance md:text-6xl">
            Spaces that hold <em className="text-primary">memory</em>
          </h2>
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="max-w-sm leading-relaxed text-muted-foreground text-pretty"
        >
          A selection of built work across residences, cultural landmarks and public spaces — each one an argument for
          slower, more soulful architecture.
        </motion.p>
      </div>

      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((project, i) => (
          <motion.a
            key={project.title}
            href="#contact"
            initial={{ opacity: 0, y: 48 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.9, delay: (i % 2) * 0.12, ease }}
            className={`group block ${i % 2 === 1 ? "md:mt-20" : ""}`}
          >
            <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.alt}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-background/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 opacity-0 backdrop-blur-sm transition-all duration-500 group-hover:opacity-100">
                <ArrowUpRight size={18} className="text-primary" aria-hidden="true" />
              </div>
            </div>
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <div>
                <h3 className="font-serif text-2xl text-foreground transition-colors group-hover:text-primary">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
              </div>
              <span className="text-sm text-muted-foreground">{project.year}</span>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
