import { motion } from 'framer-motion'
import { 
  ShieldCheck, Globe, Layers, Zap, CreditCard, Video, Layout, MessageSquare
} from 'lucide-react'
import { cn } from '../lib/utils'
import { hoverTransition, revealUp, revealViewport, staggerContainer } from '../lib/motion'

const trustPrinciples = [
  { title: "Real-time verification", description: "Instant analysis of every digital interaction.", icon: Zap },
  { title: "Multi-signal intelligence", description: "Cross-referencing billions of data points.", icon: Layers },
  { title: "Continuous learning", description: "System evolves with every detected threat.", icon: ShieldCheck },
  { title: "Global protection", description: "Infrastructure scaling across all digital surfaces.", icon: Globe }
]

function BadgeExample({ title, icon: Icon, type, delay }: { title: string, icon: any, type: string, delay: number }) {
  return (
    <motion.div 
      variants={revealUp}
      whileHover={{
        y: -4,
        boxShadow: '0 30px 70px -34px rgba(249,115,22,0.18)',
        borderColor: 'rgba(249,115,22,0.22)',
      }}
      transition={hoverTransition}
      className="glass-panel interactive-card p-6 sm:p-8 lg:p-10 border-white/10 bg-white/[0.01] group hover:bg-white/[0.02] hover:border-ember/30 transition-all duration-700 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-10">
        <div className="p-3 sm:p-4 rounded-2xl bg-white/[0.05] group-hover:bg-ember/10 transition-colors">
          <Icon className="w-6 h-6 text-white/40 group-hover:text-ember transition-colors" />
        </div>
        <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-ember/10 border border-ember/20">
          <div className="w-2 h-2 rounded-full bg-ember" />
          <span className="text-[10px] uppercase tracking-[0.25em] font-black text-ember">Verified</span>
        </div>
      </div>
      <div className="space-y-3">
        <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/20 block">{type}</span>
        <span className="text-base font-bold text-white group-hover:text-white transition-colors">{title}</span>
      </div>
    </motion.div>
  )
}

export default function TrustedInfrastructure() {
  return (
    <section className="pt-section-open pb-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[1200px]">
        {/* Trust Statement: High Hierarchy */}
        <div className="text-left mb-24 sm:mb-32 lg:mb-48 lg:pl-12">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
          >
            <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold mb-8 sm:mb-12 tracking-tightest leading-[0.88] max-w-5xl">
              The Trust <br />
              <span className="text-white/20 italic font-light">Infrastructure</span>
            </h2>
            <p className="text-base sm:text-lg md:text-2xl text-white/60 max-w-2xl leading-relaxed font-medium">
              Designed to verify what is real and detect what is not — ubiquitously across every digital surface.
            </p>
          </motion.div>
        </div>

        {/* Badge System: Variations in spacing */}
        <div className="mb-24 sm:mb-40 lg:mb-64">
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10"
          >
            <BadgeExample title="crypsisx.com/portal" icon={Layout} type="Interface" delay={0.1} />
            <div className="lg:mt-16"><BadgeExample title="Live Feed #0482" icon={Video} type="Stream" delay={0.2} /></div>
            <BadgeExample title="TX: 8492-AX" icon={CreditCard} type="Ledger" delay={0.3} />
            <div className="lg:mt-16"><BadgeExample title="Encrypted Node" icon={MessageSquare} type="Channel" delay={0.4} /></div>
          </motion.div>
        </div>

        {/* Final Statement: High Focus */}
        <motion.div 
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          className="text-center pt-24 pb-12 border-t border-white/[0.05]"
        >
          <h3 className="text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-light tracking-[0.18em] sm:tracking-[0.26em] md:tracking-[0.32em] lg:tracking-[0.4em] uppercase text-white/90 leading-[1.3] max-w-6xl mx-auto">
            The future of digital trust <br className="hidden md:block" /> will not be assumed. <br />
            <span className="font-black text-white italic brightness-125">It will be verified.</span>
          </h3>
        </motion.div>
      </div>
    </section>
  )
}
