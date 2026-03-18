import { useRef } from 'react'
import { motion } from 'framer-motion'
import { useSmoothScroll } from './SmoothScrollProvider'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { premiumEaseSoft, revealUp, revealUpSoft, staggerContainer } from '../lib/motion'
import SystemVisualization from './SystemVisualization'

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const { scrollToId } = useSmoothScroll()
  const isMobile = useMediaQuery('(max-width: 767px)')

  return (
    <section
      id="infrastructure"
      ref={sectionRef}
      className="relative overflow-hidden min-h-screen flex items-center"
    >
      <div className="absolute inset-0 z-0">
        <SystemVisualization compact={isMobile} mode="absolute" />
      </div>

      <div className="relative z-20 mx-auto w-full max-w-[1200px] px-6 py-8">
        <div className="grid min-h-screen w-full items-center gap-10 md:grid-cols-[1.2fr_1fr]">
          <div className="flex items-center justify-center md:justify-start">
            <div className="w-full">
              <motion.div
                initial="hidden"
                animate="show"
                variants={staggerContainer(0.12, 0.18)}
              >
                <motion.h1
                  variants={revealUpSoft}
                  className="text-[2.5rem] sm:text-[2.9rem] md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tightest leading-[0.95] mb-6 drop-shadow-2xl"
                >
                  The Trust <br />
                  Infrastructure <br />
                  <span className="text-white/40 italic font-light drop-shadow-xl">for the Digital World</span>
                </motion.h1>

                <motion.p 
                  variants={revealUp}
                  className="text-sm sm:text-base md:text-lg lg:text-xl text-subtle max-w-lg mb-8 drop-shadow-lg"
                >
                  CrypsisX is an intelligent cybersecurity layer designed to detect and neutralize digital deception.
                </motion.p>

                <motion.div 
                  variants={revealUp}
                  className="flex flex-wrap items-center gap-4"
                >
                  <motion.button
                    whileHover={{
                      scale: 1.03,
                      boxShadow: '0 20px 55px -18px rgba(249,115,22,0.58)',
                    }}
                    whileTap={{ scale: 0.985 }}
                    transition={{ duration: 0.7, ease: premiumEaseSoft }}
                    onClick={() => scrollToId('contact')}
                    className="btn-primary"
                  >
                    Request Access
                  </motion.button>
                </motion.div>
              </motion.div>
            </div>
          </div>

          <div className="hidden md:block" />
        </div>
      </div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.4, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: premiumEaseSoft }}
        className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-4"
      >
        <div className="h-24 w-[1px] bg-gradient-to-b from-transparent via-white/20 to-transparent" />
        <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 [writing-mode:vertical-lr]">Scroll to Explore</span>
      </motion.div>
    </section>
  )
}
