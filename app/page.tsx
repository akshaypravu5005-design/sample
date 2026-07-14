import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import Marquee from "@/components/marquee"
import Projects from "@/components/projects"
import Studio from "@/components/studio"
import Process from "@/components/process"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Marquee />
      <Projects />
      <Studio />
      <Process />
      <Contact />
    </main>
  )
}
