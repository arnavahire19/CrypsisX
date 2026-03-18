import { motion } from 'framer-motion'
import { revealUp, revealViewport } from '../lib/motion'

export default function RealityShift({ text }: { text: string }) {
  return (
    <div className="py-16 sm:py-24 flex justify-center px-4">
      <motion.div
        variants={revealUp}
        initial="hidden"
        whileInView="show"
        viewport={revealViewport}
        className="relative px-6 sm:px-12 py-4"
      >
        <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-ember/40" />
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-ember/40" />
        
        <span className="text-sm sm:text-base md:text-lg uppercase tracking-[0.22em] sm:tracking-[0.38em] md:tracking-[0.6em] font-black italic text-white/40 text-center block">
          "{text}"
        </span>
      </motion.div>
    </div>
  )
}
