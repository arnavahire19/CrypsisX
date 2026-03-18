import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  ShieldAlert, 
  Fingerprint, 
  Cpu, 
  Network, 
  AlertTriangle, 
  Lock,
  Terminal
} from 'lucide-react'
import { cn } from '../lib/utils'
import { hoverTransition, premiumEaseSoft, revealUp, revealViewport, staggerContainer } from '../lib/motion'

const flowSteps = [
  { id: 1, title: "Threat Input", description: "Signal Capture", icon: ShieldAlert, status: "Incoming signal...", isCritical: false },
  { id: 2, title: "Signal Extraction", description: "Pattern Harvesting", icon: Fingerprint, status: "Harvesting metadata...", isCritical: false },
  { id: 3, title: "Multi-Model Analysis", description: "Neural Verification", icon: Cpu, status: "Evaluating markers...", isCritical: false },
  { id: 4, title: "Intelligence Graph", description: "Cross-referencing", icon: Network, status: "Syncing nodes...", isCritical: false },
  { id: 5, title: "Risk Verdict", description: "Real-time Scoring", icon: AlertTriangle, status: "Risk: 98% — Critical", isCritical: true },
  { id: 6, title: "Protection Action", description: "Automated Response", icon: Lock, status: "Action: Locked", isCritical: true }
]

function ThreatContextPanel() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="max-w-lg mx-auto mb-16 sm:mb-20 glass-panel px-5 py-5 sm:px-7 sm:py-7 border-white/10 bg-white/[0.01] shadow-3xl relative group"
    >
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-ember/40 to-transparent" />
      
      <div className="container-header mb-6 pr-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <Terminal className="w-4 h-4 text-ember" />
          <span className="min-w-0 text-[9px] sm:text-[10px] md:text-[10.5px] uppercase tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.3em] font-black text-white/60">
            Live_Intelligence_Feed
          </span>
        </div>
        <div className="ml-auto inline-flex flex-none items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span className="whitespace-nowrap text-[9px] uppercase tracking-[0.2em] font-black text-red-500/80">
            Active_Analysis
          </span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-8">
        {[
          { label: "Signal", value: "Microsoft alert" },
          { label: "Source", value: "domain.ru" },
          { label: "Trust", value: "Critical", color: "text-red-500" }
        ].map((item, i) => (
          <div key={i} className="space-y-2">
            <span className="text-[9px] uppercase tracking-widest text-white/20 block font-bold">{item.label}</span>
            <span className={cn("text-[11px] font-mono tracking-tight font-black truncate block", item.color || "text-white/80")}>{item.value}</span>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export default function IntelligenceFlow() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const isInView = useInView(sectionRef, { margin: '-10% 0px -10% 0px' })
  const [activeStep, setActiveStep] = useState(0)
  const [delayedStep, setDelayedStep] = useState(0)
  const STEP_DURATION = 1800 // ms per step
  const TOTAL_STEPS = flowSteps.length

  useEffect(() => {
    if (!isInView) {
      return
    }

    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % TOTAL_STEPS)
    }, STEP_DURATION)
    return () => clearInterval(interval)
  }, [TOTAL_STEPS, isInView])

  useEffect(() => {
    if (!isInView) {
      return
    }

    // Pulse leads the activation by a small margin
    const timer = setTimeout(() => {
      setDelayedStep(activeStep)
    }, 400) 
    return () => clearTimeout(timer)
  }, [activeStep, isInView])

  return (
    <section ref={sectionRef} className="py-section bg-background overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[1400px] relative z-10">
        <div className="text-center mb-20 sm:mb-24 lg:mb-32">
          <motion.h2
            variants={revealUp}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="text-4xl sm:text-5xl md:text-7xl font-bold mb-6 sm:mb-8 tracking-tightest leading-[0.88]"
          >
            Intelligence <br /> Flow
          </motion.h2>
          <p className="text-white/60 max-w-xl mx-auto px-2 text-base sm:text-lg md:text-xl font-medium">
            Real-time verification pipeline for every digital signal.
          </p>
        </div>

        <ThreatContextPanel />

        <div className="relative pt-12 sm:pt-16 pb-24 sm:pb-32 px-2 sm:px-4">
          {/* Main Signal Path: Fixed joining and sync */}
          <svg className="absolute top-[112px] left-0 w-full h-32 -translate-y-1/2 hidden lg:block pointer-events-none opacity-30" preserveAspectRatio="none">
            {/* Background Line */}
            <line x1="8.33%" y1="50%" x2="91.66%" y2="50%" stroke="white" strokeWidth="0.5" strokeDasharray="4 12" />
            
            {/* The Pulse: Perfectly Synced */}
            <motion.rect
              x="0%" y="48%" width="40" height="4"
              fill="#f97316"
              initial={{ left: "8.33%" }}
              animate={
                isInView
                  ? { x: [`${8.33}%`, `${25}%`, `${41.66}%`, `${58.33}%`, `${75}%`, `${91.66}%`, `${100}%`] }
                  : { x: '8.33%' }
              }
              transition={
                isInView
                  ? {
                      duration: STEP_DURATION * TOTAL_STEPS / 1000,
                      repeat: Infinity,
                      ease: 'linear',
                    }
                  : { duration: 0 }
              }
              className="blur-[2px]"
            />
          </svg>

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-12 sm:gap-16 lg:gap-0 relative z-10"
          >
            {flowSteps.map((step, index) => {
              const isActive = delayedStep === index
              const isCritical = step.isCritical
              
              return (
                <motion.div key={step.id} variants={revealUp} className="flex flex-col items-center relative">
                  {/* Desktop joining lines */}
                  {index < flowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-[48px] left-[50%] w-full h-[1px] bg-white/5 -z-10" />
                  )}

                  <motion.div
                    whileHover={{
                      y: -4,
                      boxShadow: isCritical
                        ? '0 0 84px rgba(239,68,68,0.22)'
                        : '0 0 56px rgba(249,115,22,0.2)',
                    }}
                    animate={{ 
                      scale: isActive ? (isCritical ? 1.3 : 1.2) : 1,
                      borderColor: isActive ? (isCritical ? 'rgba(239, 68, 68, 0.5)' : 'rgba(249, 115, 22, 0.5)') : 'rgba(255, 255, 255, 0.05)',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.01)'
                    }}
                    transition={{ type: "spring", stiffness: 130, damping: 24 }}
                    className={cn(
                      "w-24 h-24 rounded-[2.5rem] border backdrop-blur-md flex items-center justify-center mb-10 transition-all duration-1000 relative z-20 interactive-card",
                      isActive && isCritical && "shadow-[0_0_80px_rgba(239,68,68,0.3)]",
                      isActive && !isCritical && "shadow-[0_0_50px_rgba(249,115,22,0.2)]"
                    )}
                  >
                    <step.icon className={cn(
                      "w-8 h-8 transition-all duration-700",
                      isActive ? (isCritical ? "text-red-500" : "text-ember") : "text-white/10"
                    )} />
                    
                    <AnimatePresence>
                      {isActive && (
                        <motion.div 
                          initial={{ opacity: 0.8, scale: 0.8 }}
                          animate={{ opacity: 0, scale: 2.2 }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className={cn("absolute inset-0 border-[4px] rounded-[2.5rem]", isCritical ? "border-red-500/50" : "border-ember/50")}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                  
                  <div className="text-center h-24 px-2">
                    <h3 className={cn(
                      "text-[11px] uppercase tracking-[0.4em] font-black mb-4 transition-all duration-700",
                      isActive ? "text-white" : "text-white/20"
                    )}>
                      {step.title}
                    </h3>
                    <p className={cn(
                      "text-[10px] uppercase tracking-[0.2em] font-bold transition-colors duration-700 max-w-[120px] mx-auto leading-relaxed",
                      isActive ? (isCritical ? "text-red-500/80" : "text-ember/80") : "text-white/10"
                    )}>
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile Connector */}
                  {index < flowSteps.length - 1 && (
                    <div className="h-20 w-[1px] bg-gradient-to-b from-white/[0.1] to-transparent my-6 lg:hidden" />
                  )}
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 2.2, ease: premiumEaseSoft }}
          className="flex flex-col items-center gap-8"
        >
          <div className="w-px h-24 bg-gradient-to-b from-white/[0.15] to-transparent" />
          <span className="text-[10px] uppercase tracking-[0.8em] text-white/10 font-black italic">
            Recursive_Deep_Learning_Active
          </span>
        </motion.div>
      </div>
    </section>
  )
}
