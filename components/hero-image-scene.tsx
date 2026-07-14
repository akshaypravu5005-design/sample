"use client"

import Image from "next/image"
import { motion, type MotionValue, useTransform } from "framer-motion"

/**
 * Full-screen landing image that scales and pans with scroll progress,
 * mirroring the zoom feel of the previous 3D building scene.
 * Swap `src` below with your own `/hero.jpg` once uploaded.
 */
export default function HeroImageScene({
  progress,
}: {
  progress: MotionValue<number>
}) {
  // Scroll-driven zoom + subtle pan (same journey feel as the 3D scene)
  const scale = useTransform(progress, [0, 0.5, 1], [1.05, 1.55, 2.4])
  const y = useTransform(progress, [0, 1], ["0%", "-8%"])
  const x = useTransform(progress, [0, 1], ["0%", "3%"])

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-background">
      <motion.div style={{ scale, x, y }} className="absolute inset-0 h-full w-full will-change-transform">
        <Image
          src="/images/hero-landing.png"
          alt="Brick and Soul signature architecture at blue hour"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Warm dark grade for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/70 via-background/25 to-background/85" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_90%_at_50%_45%,transparent_35%,hsl(var(--background)/0.6)_100%)]" />
    </div>
  )
}
