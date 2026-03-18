import { motion } from 'framer-motion'
import { revealUp, revealViewport, staggerContainer } from '../lib/motion'

export default function HighRiskEnvironments() {
  return (
    <section className="py-24 sm:py-32 lg:py-48 bg-background-darker/50 relative overflow-hidden">
      {/* Background depth line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full bg-white/[0.02]" />
      
      <div className="container mx-auto px-6 max-w-[1200px] relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div initial="hidden" whileInView="show" viewport={revealViewport} variants={staggerContainer(0.1)}>
            <motion.div variants={revealUp} className="mb-10 flex items-center justify-center gap-4">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40">Critical Infrastructure</span>
            </motion.div>
            <motion.h2 variants={revealUp} className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tightest mb-8 sm:mb-10 uppercase leading-none text-white">
              Built for <br /> high-risk <br /> environments
            </motion.h2>
            <motion.div variants={revealUp} className="h-[1px] w-20 bg-ember/40 mx-auto mb-10" />
            <motion.p variants={revealUp} className="text-white/60 text-base sm:text-lg md:text-xl uppercase tracking-[0.16em] sm:tracking-[0.24em] md:tracking-[0.3em] font-black max-w-2xl mx-auto italic">
              Designed for systems where failure is not an option.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
