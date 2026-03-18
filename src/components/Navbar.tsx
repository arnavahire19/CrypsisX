import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useSmoothScroll } from './SmoothScrollProvider'
import { premiumEase, premiumEaseSoft } from '../lib/motion'
import Logo from './Logo'

const navLinks = [
  { name: 'Infrastructure', href: '#infrastructure' },
  { name: 'Defense', href: '#defense' },
  { name: 'Models', href: '#models' },
  { name: 'Mission', href: '#mission' },
  { name: 'Contact', href: '#contact' }
]

export default function Navbar() {
  const { scrollToId } = useSmoothScroll()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    scrollToId(href.replace('#', ''))
  }

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.1, ease: premiumEase }}
      className="fixed top-0 left-0 right-0 z-40 bg-background/40 backdrop-blur-2xl border-b border-white/[0.03]"
    >
      <div className="container mx-auto px-4 sm:px-6 h-20 flex items-center justify-between max-w-[1400px]">
        <Logo />

        <div className="hidden md:flex items-center gap-8 lg:gap-12">
          {navLinks.map((link, i) => (
            <motion.a 
              key={link.name} 
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 * i + 0.45, ease: premiumEase }}
              className="interactive-link text-[10px] uppercase tracking-[0.25em] font-medium text-white/30 hover:text-white relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ember transition-all duration-500 group-hover:w-full" />
            </motion.a>
          ))}
        </div>

        <motion.button 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.95, ease: premiumEase }}
          whileHover={{
            scale: 1.03,
            backgroundColor: 'rgba(249,115,22,0.92)',
            color: 'rgba(255,255,255,1)',
            boxShadow: '0 18px 42px -20px rgba(249,115,22,0.55)',
          }}
          whileTap={{ scale: 0.985 }}
          onClick={() => scrollToId('contact')}
          className="hidden md:inline-flex text-[10px] uppercase tracking-[0.3em] font-bold text-ember border border-ember/10 px-7 py-2.5 rounded-lg transition-all duration-500"
        >
          Access
        </motion.button>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="md:hidden inline-flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-white/70 transition-colors duration-300 hover:text-white hover:border-white/20"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.28, ease: premiumEaseSoft }}
            className="md:hidden border-t border-white/[0.04] bg-background/95 backdrop-blur-2xl"
          >
            <div className="container mx-auto px-4 sm:px-6 py-5 flex flex-col gap-2 max-w-[1400px]">
              {navLinks.map((link) => (
                <button
                  key={link.name}
                  type="button"
                  onClick={() => handleNavClick(link.href)}
                  className="flex min-h-[48px] items-center rounded-xl px-4 py-3 text-left text-sm uppercase tracking-[0.24em] font-medium text-white/70 transition-colors duration-300 hover:bg-white/[0.03] hover:text-white"
                >
                  {link.name}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false)
                  scrollToId('contact')
                }}
                className="btn-primary mt-3 w-full justify-center"
              >
                Request Access
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  )
}
