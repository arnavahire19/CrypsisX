import { motion } from 'framer-motion'
import { cn } from '../lib/utils'

interface LogoProps {
  className?: string
  variant?: 'default' | 'muted' | 'bright'
}

export default function Logo({ className, variant = 'default' }: LogoProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn("inline-flex flex-col justify-center leading-none group cursor-default", className)}
    >
      <div className="flex items-baseline gap-[1px]">
        <span className={cn(
          "text-xl md:text-2xl font-bold tracking-tightest transition-all duration-500",
          variant === 'muted' ? "text-[#EAEAEA]/40" : "text-[#EAEAEA]",
          variant === 'bright' && "text-[#F6F6F6] drop-shadow-[0_0_18px_rgba(255,255,255,0.1)]",
          "group-hover:opacity-80"
        )}>
          Crypsis
        </span>
        <span className={cn(
          "text-xl md:text-2xl font-black tracking-tightest transition-all duration-500",
          variant === 'muted' ? "text-ember/40" : "text-ember",
          variant === 'bright' && "text-ember brightness-125 drop-shadow-[0_0_18px_rgba(249,115,22,0.18)]",
          "group-hover:brightness-125"
        )}>
          X
        </span>
      </div>
      
      <span className={cn(
        "text-[8px] md:text-[9px] font-black tracking-[0.6em] uppercase mt-1.5 transition-all duration-500",
        variant === 'muted' ? "text-white/10" : "text-white/30",
        variant === 'bright' && "text-white/40",
        "group-hover:text-white/50"
      )}>
        Cybersecurity
      </span>
    </motion.div>
  )
}
