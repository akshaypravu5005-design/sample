"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useScroll, useTransform, useInView, animate, useMotionValue, useMotionValueEvent } from "framer-motion"
import { useEffect, useState } from "react"

const ease = [0.22, 1, 0.36, 1] as const

function Counter({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "-40px" })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(motionValue, "change", (latest) => {
    setDisplay(Math.round(latest))
  })

  useEffect(() => {
    if (inView) {
      const controls = animate(motionValue, value, { duration: 2, ease: "easeOut" })
      return controls.stop
    }
  }, [inView, value, motionValue])

  return (
    <span ref={ref} className="font-serif text-5xl text-foreground md:text-6xl">
      {display}
      {suffix}
    </span>
  )
}

const stats = [
  { value: 120, suffix: "+", label: "Projects completed" },
  { value: 14, suffix: "", label: "Design awards" },
  { value: 26, suffix: "", label: "Architects & makers" },
  { value: 12, suffix: "", label: "Years of practice" },
]

export default function Studio() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  })
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"])

  return (
    <section id="studio" ref={sectionRef} className="border-y border-border bg-muted">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-2 lg:items-center lg:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">The Studio</p>
          <h2 className="font-serif text-4xl leading-tight text-foreground text-balance md:text-5xl">
            Material is memory. Architecture is how we keep it.
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-muted-foreground text-pretty">
            Founded in 2012, Brick &amp; Soul began with a simple conviction: that a building should feel handmade even
            at civic scale. We work slowly, prototype physically, and choose materials that age with dignity — brick,
            lime, timber and light.
          </p>
          <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground text-pretty">
            Our studio brings together architects, craftspeople and researchers under one roof, so that every drawing
            is tested against the reality of the hand that builds it.
          </p>

          <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10">
            {stats.map((stat) => (
              <div key={stat.label}>
                <Counter value={stat.value} suffix={stat.suffix} />
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative aspect-[3/4] overflow-hidden rounded-sm lg:aspect-auto lg:h-[640px]">
          <motion.div style={{ y: imageY }} className="absolute inset-[-10%]">
            <Image
              src="/images/studio-team.png"
              alt="The Brick and Soul studio workspace with physical models and material samples"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
