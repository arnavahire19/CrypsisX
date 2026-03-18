import { motion } from 'framer-motion'
import { cn } from '../lib/utils'
import {
  hoverTransition,
  revealUp,
  revealViewport,
} from '../lib/motion'

const models = [
  { 
    title: "Phishing", 
    description: "Real-time identification and blocking of credential harvesting sites.",
    type: 'phishing'
  },
  { 
    title: "Deepfake & Voice Clone", 
    description: "Neural-based verification of audio and video authenticity.",
    type: 'deepfake'
  },
  { 
    title: "Quishing", 
    description: "Automated analysis of QR-code based deception vectors.",
    type: 'quishing'
  },
  { 
    title: "PaperShield", 
    description: "Document integrity and verification for physical-to-digital flows.",
    type: 'papershield'
  },
  { 
    title: "Impersonation", 
    description: "Detection of sophisticated social engineering and identity theft.",
    type: 'impersonation'
  }
]

function ModelAccent({ type }: { type: string }) {
  const accentStyles: Record<string, string> = {
    phishing: 'bg-[linear-gradient(135deg,rgba(249,115,22,0.12),transparent_55%)]',
    deepfake: 'bg-[linear-gradient(180deg,rgba(255,255,255,0.06),transparent_65%)]',
    quishing: 'bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.12),transparent_55%)]',
    papershield: 'bg-[linear-gradient(160deg,rgba(255,255,255,0.04),transparent_60%)]',
    impersonation: 'bg-[radial-gradient(circle_at_center,rgba(249,115,22,0.08),transparent_62%)]',
  }

  return <div className={cn('absolute inset-0 pointer-events-none', accentStyles[type])} />
}

export default function CoreModels() {
  return (
    <section id="models" className="py-section-open bg-background-darker/50">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {/* Header Card */}
          <div className="lg:col-span-1 flex flex-col justify-center mb-12 lg:mb-0">
            <motion.div variants={revealUp} initial="hidden" whileInView="show" viewport={revealViewport}>
              <div className="mb-6 flex items-center gap-4">
                <div className="h-px w-12 bg-ember" />
                <span className="text-[10px] uppercase tracking-[0.5em] font-black text-ember">Intelligence</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold mb-8 sm:mb-10 leading-[0.88] tracking-tightest text-white brightness-110">
                Core <br />
                Defense <br />
                <span className="text-white brightness-125">Models</span>
              </h2>
              <p className="text-white/60 max-w-xs text-base sm:text-lg font-medium leading-relaxed">
                Five specialized engines working in unison to provide complete digital coverage.
              </p>
            </motion.div>
          </div>
          
          {models.map((model, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={revealViewport}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ 
                y: -4,
                transition: hoverTransition,
                boxShadow: "0 24px 56px -28px rgba(249,115,22,0.14)",
                borderColor: "rgba(249, 115, 22, 0.25)"
              }}
              className={cn(
                "glass-panel interactive-card p-6 sm:p-8 md:p-10 lg:p-12 flex flex-col justify-between group cursor-default transition-all duration-700 relative overflow-hidden",
                index % 2 === 0 ? "lg:translate-y-12" : ""
              )}
            >
              <ModelAccent type={model.type} />
              
              <div className="h-[1px] w-12 bg-white/10 group-hover:bg-ember group-hover:w-24 transition-all duration-700 mb-10 sm:mb-12 lg:mb-16 relative z-10" />
              <div className="relative z-10">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 tracking-tight group-hover:text-ember transition-colors">
                  {model.title}
                </h3>
                <p className="text-white/50 text-sm sm:text-[15px] leading-relaxed tracking-[0.16em] sm:tracking-wider font-medium uppercase group-hover:text-white/80 transition-colors">
                  {model.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
