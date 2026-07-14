"use client"

import { motion } from "framer-motion"

const words = ["Residential", "Cultural", "Public Space", "Restoration", "Interiors", "Masterplanning"]

export default function Marquee() {
  const row = [...words, ...words]
  return (
    <div className="overflow-hidden border-y border-border bg-muted py-5" aria-hidden="true">
      <motion.div
        className="flex w-max items-center gap-10"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Number.POSITIVE_INFINITY }}
      >
        {row.map((word, i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-serif text-2xl italic text-muted-foreground">{word}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          </span>
        ))}
      </motion.div>
    </div>
  )
}
