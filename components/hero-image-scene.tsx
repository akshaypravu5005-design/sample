"use client"

import Image from "next/image"
import { motion, type MotionValue, useTransform } from "framer-motion"

/**
 * Two-layer scroll-zoom that mimics walking INTO the house:
 *  - Exterior layer zooms deep toward the central opening, then fades out.
 *  - Interior layer is revealed through that opening and settles into view,
 *    giving the feeling of passing through the doorway into the interior.
 * Swap the exterior `src` with your own `/hero.jpg` once uploaded.
 */
export default function HeroImageScene({
  progress,
}: {
  progress: MotionValue<number>
}) {
  // --- Exterior: zoom hard toward the center opening, then hand off ---
  const extScale = useTransform(progress, [0, 0.55], [1.05, 3.6])
  const extOpacity = useTransform(progress, [0, 0.42, 0.6], [1, 1, 0])
  const extY = useTransform(progress, [0, 0.55], ["0%", "-6%"])

  // --- Interior: emerge from the opening (starts large, settles) ---
  const intScale = useTransform(progress, [0.42, 1], [1.7, 1.02])
  const intOpacity = useTransform(progress, [0.42, 0.62], [0, 1])
  const intY = useTransform(progress, [0.42, 1], ["4%", "-3%"])

  return (
    <div className="absolute inset-0 h-full w-full overflow-hidden bg-background">
      {/* Interior layer (behind) */}
      <motion.div
        style={{ scale: intScale, opacity: intOpacity, y: intY }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
        <Image
          src="/images/hero-interior.png"
          alt="Interior great hall of a Brick and Soul house"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Exterior layer (front) */}
      <motion.div
        style={{ scale: extScale, opacity: extOpacity, y: extY }}
        className="absolute inset-0 h-full w-full will-change-transform"
      >
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
