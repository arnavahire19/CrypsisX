import { motion } from 'framer-motion'
import Logo from './Logo'

export default function BootAnimation() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background"
    >
      <div className="relative">
        {/* Cinematic Scanline Effect */}
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "100%" }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-[2px] bg-ember/30 blur-[2px] z-20 pointer-events-none"
        />

        {/* Pulsing Ember Glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ 
            scale: [0.8, 1.4, 0.8], 
            opacity: [0, 0.1, 0] 
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 rounded-full bg-ember blur-[60px]"
        />
        
        {/* The Refined Logo */}
        <Logo className="h-10 md:h-12" variant="bright" />
        
        {/* "System Initializing" Subtext */}
        <motion.div
          initial={{ opacity: 0, letterSpacing: "0.2em" }}
          animate={{ opacity: [0, 1, 0.5] }}
          transition={{ delay: 0.8, duration: 1.5 }}
          className="absolute -bottom-12 left-1/2 -translate-x-1/2 whitespace-nowrap"
        >
          <span className="text-[10px] uppercase font-medium tracking-[0.4em] text-white/20">
            CrypsisX Core Initialization
          </span>
        </motion.div>
      </div>
    </motion.div>
  )
}
