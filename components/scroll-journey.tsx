"use client"

import { useRef } from "react"
import dynamic from "next/dynamic"
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion"
import { ArrowDown } from "lucide-react"

import HeroImageScene from "./hero-image-scene"

const ease = [0.22, 1, 0.36, 1] as const

export default function ScrollJourney() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  })
  // Smooth the raw scroll for the camera so the zoom feels cinematic
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 90, damping: 28, mass: 0.4 })

  // Stage opacities
  const stage1Opacity = useTransform(scrollYProgress, [0, 0.16, 0.24], [1, 1, 0])
  const stage1Y = useTransform(scrollYProgress, [0, 0.24], [0, -60])

  // Framer's style binding for opacity breaks on containers with animated motion
  // children, so we write these two opacities to the DOM directly.
  const stage1Ref = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  useMotionValueEvent(stage1Opacity, "change", (v) => {
    if (stage1Ref.current) {
      stage1Ref.current.style.opacity = String(v)
      stage1Ref.current.style.pointerEvents = v < 0.05 ? "none" : "auto"
    }
  })
  const stage2Opacity = useTransform(scrollYProgress, [0.28, 0.36, 0.5, 0.58], [0, 1, 1, 0])
  const stage3Opacity = useTransform(scrollYProgress, [0.62, 0.7, 0.84, 0.92], [0, 1, 1, 0])
  const finalOpacity = useTransform(scrollYProgress, [0.9, 1], [0, 1])
  const hintOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0])
  const fadeToNext = useTransform(scrollYProgress, [0.94, 1], [0, 0.55])
  useMotionValueEvent(hintOpacity, "change", (v) => {
    if (hintRef.current) hintRef.current.style.opacity = String(v)
  })

  return (
    <section ref={ref} id="top" className="relative h-[420vh]">
      {/* Pinned viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Full-screen landing image (scroll-zoom) */}
        <div className="absolute inset-0 z-0">
          <HeroImageScene progress={smoothProgress} />
        </div>

        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-t from-background via-transparent to-background/60" />
        <motion.div
          style={{ opacity: fadeToNext }}
          className="pointer-events-none absolute inset-0 z-10 bg-background"
        />

        {/* ---- Stage 1: Hero intro ---- */}
        <div ref={stage1Ref} className="absolute inset-0 z-20">
        <motion.div
          style={{ y: stage1Y }}
          className="flex h-full w-full flex-col items-start justify-center px-6 lg:px-16"
        >
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="mb-6 text-xs uppercase tracking-[0.35em] text-primary"
          >
            Architecture Studio — Est. 2012
          </motion.p>
          <h1 className="max-w-3xl font-serif text-5xl leading-[1.05] text-foreground text-balance md:text-7xl lg:text-8xl">
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
            Brick &amp; Soul is a studio for residential, cultural and public architecture. Scroll to walk toward the
            house we never stopped designing.
          </motion.p>
        </motion.div>
        </div>

        {/* ---- Stage 2: Approach ---- */}
        <motion.div
          style={{ opacity: stage2Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-end px-6 lg:px-16"
        >
          <div className="max-w-sm text-right">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">01 — Material</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              48,000 bricks. Each one placed by hand.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
              We design from the material up — the bond, the mortar joint, the shadow each course throws at dusk.
            </p>
          </div>
        </motion.div>

        {/* ---- Stage 3: The threshold ---- */}
        <motion.div
          style={{ opacity: stage3Opacity }}
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-start px-6 pb-28 lg:px-16"
        >
          <div className="max-w-sm">
            <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">02 — Light</p>
            <h2 className="font-serif text-3xl leading-tight text-foreground text-balance md:text-5xl">
              The perforated screen breathes light into the hall.
            </h2>
            <p className="mt-4 leading-relaxed text-muted-foreground text-pretty">
              Every opening is an instrument. We tune them to the sun&apos;s path across the site.
            </p>
          </div>
        </motion.div>

        {/* ---- Final: threshold statement ---- */}
        <motion.div
          style={{ opacity: finalOpacity }}
          className="pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">Brick &amp; Soul</p>
          <h2 className="max-w-2xl font-serif text-4xl leading-tight text-foreground text-balance md:text-6xl">
            Step inside the work.
          </h2>
        </motion.div>

        {/* Scroll hint */}
        <div ref={hintRef} className="absolute inset-x-0 bottom-0 z-20">
        <div className="flex items-center justify-between px-6 pb-8 lg:px-16">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <motion.span
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            >
              <ArrowDown size={14} className="text-primary" aria-hidden="true" />
            </motion.span>
            <span>Scroll to approach the building</span>
          </div>
          <p className="hidden text-xs uppercase tracking-[0.25em] text-muted-foreground sm:block">
            Kochi — Bengaluru — Dubai
          </p>
        </div>
        </div>
      </div>
    </section>
  )
}
