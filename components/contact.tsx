"use client"

import { motion } from "framer-motion"
import { ArrowUpRight } from "lucide-react"

const ease = [0.22, 1, 0.36, 1] as const

export default function Contact() {
  return (
    <footer id="contact" className="border-t border-border bg-muted">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          className="max-w-3xl"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.35em] text-primary">Start a Project</p>
          <h2 className="font-serif text-5xl leading-[1.05] text-foreground text-balance md:text-7xl">
            Let&apos;s build something with soul.
          </h2>
          <a
            href="mailto:hello@brickandsoul.studio"
            className="group mt-10 inline-flex items-center gap-3 border-b border-primary pb-2 font-serif text-2xl text-foreground transition-colors hover:text-primary md:text-3xl"
          >
            hello@brickandsoul.studio
            <ArrowUpRight
              size={24}
              className="text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </a>
        </motion.div>

        <div className="mt-20 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Studio</h3>
            <p className="text-sm leading-relaxed text-foreground">
              14 Kiln Lane
              <br />
              Fort Kochi, Kerala
              <br />
              India
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Enquiries</h3>
            <p className="text-sm leading-relaxed text-foreground">
              hello@brickandsoul.studio
              <br />
              +91 98470 00000
            </p>
          </div>
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Follow</h3>
            <ul className="flex flex-col gap-2 text-sm text-foreground">
              <li>
                <a href="#top" className="transition-colors hover:text-primary">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#top" className="transition-colors hover:text-primary">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="#top" className="transition-colors hover:text-primary">
                  Behance
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">Hours</h3>
            <p className="text-sm leading-relaxed text-foreground">
              Monday — Friday
              <br />
              9:00 — 18:00 IST
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-border pt-8 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Brick &amp; Soul Architecture Studio. All rights reserved.</p>
          <p className="font-serif italic">Material is memory.</p>
        </div>
      </div>
    </footer>
  )
}
