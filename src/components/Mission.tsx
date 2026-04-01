import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { revealUp, revealViewport, staggerContainer } from '../lib/motion'
import GlobeVisualization from './GlobeVisualization'

export default function Mission() {
  const globeRef = useRef<HTMLDivElement | null>(null)
  const showGlobe = useInView(globeRef, { margin: '20% 0px 20% 0px' })

  return (
    <section id="mission" className="py-section-open relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial="hidden"
            whileInView="show"
            variants={staggerContainer(0.1)}
            viewport={revealViewport}
            className="mb-16"
          >
            <motion.span variants={revealUp} className="text-ember font-black tracking-[0.5em] uppercase text-[10px] mb-8 block opacity-40">The Commitment</motion.span>
            <motion.h2 variants={revealUp} className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tightest mb-8 sm:mb-10 leading-[0.95]">
              Defending the <br className="hidden md:block" />
              <span className="text-white/30 italic font-light">Global Digital Surface</span>
            </motion.h2>
          </motion.div>

          <div ref={globeRef} className="w-full max-w-[1200px] mx-auto mb-12 sm:mb-20 relative h-[320px] lg:h-[500px] xl:h-[700px] flex justify-center items-center">
            {showGlobe ? <GlobeVisualization /> : null}
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background pointer-events-none" />
          </div>

          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="max-w-xl px-3 text-subtle text-sm sm:text-base leading-relaxed uppercase tracking-[0.16em] sm:tracking-wider font-medium text-white/30"
          >
            Deploying resilient, adaptive infrastructure across every digital touchpoint. 
            A future where digital interactions are verified by default.
          </motion.div>
        </div>
      </div>
      
      {/* Structural Lines: High-Agency feel */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/[0.05] to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-t from-white/[0.05] to-transparent" />
    </section>
  )
}
