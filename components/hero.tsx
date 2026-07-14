"use client"

import dynamic from "next/dynamic"
import { motion } from "framer-motion"
import { ArrowDown } from "lucide-react"

const HeroScene = dynamic(() => import("./hero-scene"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
})

const ease = [0.22, 1, 0.36, 1] as const

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen flex-col overflow-hidden">
      {/* 3D backdrop */}
      <div className="absolute inset-0 z-0 opacity-90 lg:left-auto lg:right-0 lg:w-3/5">
        <HeroScene />
      </div>
      {/* Vignette to keep text legible */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-background via-background/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-40 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-center px-6 pt-28 lg:px-10">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease }}
          className="mb-6 text-xs uppercase tracking-[0.35em] text-primary"
        >
          Architecture Studio — Est. 2012
        </motion.p>

        <h1 className="max-w-4xl font-serif text-5xl leading-[1.05] text-foreground text-balance md:text-7xl lg:text-8xl">
          {["We build with", "brick, light", "and soul."].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.35 + i * 0.14, ease }}
              >
                {i === 2 ? (
                  <>
                    and <em className="text-primary">soul.</em>
                  </>
                ) : (
                  line
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9, ease }}
          className="mt-8 max-w-md leading-relaxed text-muted-foreground text-pretty"
        >
          Brick &amp; Soul is a studio for residential, cultural and public architecture. Every wall we raise carries
          the warmth of the hands that made it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
          >
            View our work
          </a>
          <a
            href="#studio"
            className="rounded-full border border-border px-7 py-3 text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            About the studio
          </a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="relative z-20 mx-auto flex max-w-7xl items-center justify-between self-stretch px-6 pb-8 lg:px-10 w-full"
      >
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
          <ArrowDown size={14} className="text-primary" aria-hidden="true" />
          <span>Scroll to explore</span>
        </div>
        <p className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:block">
          Kochi — Bengaluru — Dubai
        </p>
      </motion.div>
    </section>
  )
}
