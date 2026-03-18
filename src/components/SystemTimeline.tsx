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
          className="flex flex-col md:flex-row justify-center items-start gap-10 sm:gap-12 md:gap-24 lg:gap-32 relative"
        >
          <div className="absolute top-4 left-0 w-full h-[1px] bg-white/[0.05] hidden md:block" />
          
          {timelineItems.map((item, i) => (
            <motion.div
              key={item.phase}
              variants={revealUp}
              whileHover={{ y: -4, transition: hoverTransition }}
              className="relative flex flex-col items-center md:items-start text-center md:text-left z-10 group interactive-card"
            >
              <div className="w-2 h-2 rounded-full bg-white/20 mb-6 group-hover:bg-ember transition-colors duration-500" />
              <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.28em] sm:tracking-[0.5em] font-black text-white/20 mb-3 group-hover:text-ember/60 transition-colors duration-500">
                {item.phase}
              </span>
              <span className="text-base sm:text-lg font-bold tracking-[0.18em] sm:tracking-widest text-white/80 uppercase mb-2">
                {item.label}
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold">
                {item.description}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
