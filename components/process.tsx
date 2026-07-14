"use client"

import { motion } from "framer-motion"

const ease = [0.22, 1, 0.36, 1] as const

const steps = [
  {
    number: "01",
    title: "Listen",
    description:
      "Every project begins with the site and the people. We walk the land, study the light, and listen before we draw a single line.",
  },
  {
    number: "02",
    title: "Model",
    description:
      "We think with our hands. Physical models in clay, brick and card let us test proportion, shadow and material honesty early.",
  },
  {
    number: "03",
    title: "Craft",
    description:
      "Working drawings are made with the builder in the room. Detail is where soul lives — every joint and reveal is deliberate.",
  },
  {
    number: "04",
    title: "Inhabit",
    description:
      "We stay past handover. A building is only finished when life has moved in, and we return to learn how it breathes.",
  },
]

export default function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8, ease }}
        className="mb-16 max-w-2xl"
      >
        <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">How We Work</p>
        <h2 className="font-serif text-4xl text-foreground text-balance md:text-6xl">
          Four movements, one <em className="text-primary">rhythm</em>
        </h2>
      </motion.div>

      <div className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <motion.article
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, delay: i * 0.1, ease }}
            className="group flex flex-col gap-16 bg-background p-8 transition-colors duration-500 hover:bg-muted"
          >
            <span className="font-serif text-5xl text-border transition-colors duration-500 group-hover:text-primary">
              {step.number}
            </span>
            <div>
              <h3 className="font-serif text-2xl text-foreground">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty">{step.description}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
