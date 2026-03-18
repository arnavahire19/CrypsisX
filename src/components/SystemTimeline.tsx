import { motion } from 'framer-motion'
import { hoverTransition, revealUp, revealViewport, staggerContainer } from '../lib/motion'

const timelineItems = [
  { phase: 'Now', label: 'Early Detection', description: 'Real-time threat capture' },
  { phase: 'Next', label: 'Platform Integration', description: 'Universal API rollout' },
  { phase: 'Future', label: 'Global Trust Standard', description: 'Ubiquitous verification' }
]

export default function SystemTimeline() {
  return (
    <section className="py-20 sm:py-24 md:py-32 bg-background relative">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="relative flex w-full flex-col items-center gap-20"
        >
          <div className="absolute top-0 left-1/2 h-full w-[2px] -translate-x-1/2 bg-white/[0.08]" />
          
          {timelineItems.map((item) => (
            <motion.div
              key={item.phase}
              variants={revealUp}
              whileHover={{ y: -4, transition: hoverTransition }}
              className="relative z-10 flex w-full max-w-[680px] flex-col items-center text-center group interactive-card"
            >
              <div className="w-2 h-2 rounded-full bg-white/20 mb-6 group-hover:bg-ember transition-colors duration-500" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.5em] font-black text-white/20 mb-3 group-hover:text-ember/60 transition-colors duration-500">
                {item.phase}
              </span>
              <span className="w-full text-base sm:text-lg font-bold tracking-[0.18em] sm:tracking-widest text-white/80 uppercase mb-2 text-center">
                {item.label}
              </span>
              <span className="w-full text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold text-center">
                {item.description}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
