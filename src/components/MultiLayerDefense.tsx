import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import { hoverTransition, premiumEaseSoft, revealUp, revealViewport, staggerContainer } from '../lib/motion'

const layers = [
  { id: "01", title: "Edge Detection", description: "Proactive identification of suspicious patterns at the network entry point." },
  { id: "02", title: "Intelligence Layer", description: "AI-driven analysis to distinguish between authentic users and digital deceptions." },
  { id: "03", title: "Neutralization Core", description: "Real-time mitigation of identified threats before they impact the infrastructure." }
]

export default function MultiLayerDefense() {
  return (
    <section id="defense" className="py-section-tight relative">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="text-left mb-20 sm:mb-24 lg:mb-32 lg:pl-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="h-px w-12 bg-white/20" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-black text-white/40">Architecture</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 sm:mb-10 tracking-tightest leading-[0.9]">
            Multi-Layer <br /> 
            <span className="text-white/30 italic font-light">Defense System</span>
          </h2>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="space-y-8 sm:space-y-12 lg:space-y-16"
        >
          {layers.map((layer, index) => (
            <motion.div
              key={layer.id}
              variants={revealUp}
              whileHover={{
                y: -4,
                boxShadow: '0 34px 80px -42px rgba(249,115,22,0.25)',
                borderColor: 'rgba(249,115,22,0.18)',
              }}
              transition={hoverTransition}
              className={cn(
                "glass-panel interactive-card p-6 sm:p-8 md:p-12 lg:p-20 flex flex-col md:flex-row items-start md:items-center gap-8 sm:gap-10 md:gap-16 group hover:border-ember/20 transition-all duration-1000",
                index % 2 !== 0 ? "md:flex-row-reverse" : ""
              )}
            >
              <div className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white/[0.03] group-hover:text-ember/[0.08] transition-all duration-1000 font-mono tracking-tightest">
                {layer.id}
              </div>
              <div className="flex-1 space-y-6">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white group-hover:text-ember transition-colors duration-500">
                  {layer.title}
                </h3>
                <p className="text-white/60 text-base sm:text-lg md:text-xl font-medium leading-relaxed max-w-2xl group-hover:text-white/90 transition-colors duration-500">
                  {layer.description}
                </p>
              </div>
              <div className="hidden md:block w-[1px] h-20 bg-gradient-to-b from-white/10 to-transparent group-hover:from-ember/40 transition-all duration-1000" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
