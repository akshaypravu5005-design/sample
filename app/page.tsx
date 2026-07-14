import Navbar from "@/components/navbar"
import ScrollJourney from "@/components/scroll-journey"
import Marquee from "@/components/marquee"
import Projects from "@/components/projects"
import Studio from "@/components/studio"
import Process from "@/components/process"
import Contact from "@/components/contact"

export default function Home() {
  return (
    <main>
      <Navbar />
      <ScrollJourney />
      <Marquee />
      <Projects />
      <Studio />
      <Process />
      <Contact />
    </main>
  )
}
