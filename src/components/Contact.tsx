import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { premiumEaseSoft, revealUp, revealViewport, staggerContainer } from '../lib/motion'

export default function Contact() {
  const [status, setStatus] = useState<'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'>('IDLE')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('LOADING')

    const form = e.currentTarget
    const data = new FormData(form)

    try {
      const response = await fetch("https://formspree.io/f/xlgwbrog", {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setStatus('SUCCESS')
        form.reset()
      } else {
        setStatus('ERROR')
      }
    } catch (error) {
      setStatus('ERROR')
    }
  }

  return (
    <section id="contact" className="py-section-open bg-background relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-[800px] relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={revealViewport}
            variants={staggerContainer(0.1)}
          >
            <motion.div variants={revealUp} className="flex items-center justify-center gap-3 mb-6 opacity-30">
              <div className="w-1 h-1 rounded-full bg-ember animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white">
                Secure channel established
              </span>
            </motion.div>
            <motion.h2 variants={revealUp} className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tightest mb-6">
              Get in touch
            </motion.h2>
            <motion.p variants={revealUp} className="text-white/40 text-sm sm:text-base md:text-lg uppercase tracking-[0.18em] sm:tracking-widest font-medium px-2">
              For early access, partnerships, or inquiries.
            </motion.p>
          </motion.div>
        </div>

        <motion.div
          variants={revealUp}
          initial="hidden"
          whileInView="show"
          viewport={revealViewport}
          whileHover={{ y: -4, boxShadow: '0 30px 70px -44px rgba(249,115,22,0.18)' }}
          transition={{ duration: 0.8, ease: premiumEaseSoft }}
          className="glass-panel interactive-card p-5 sm:p-8 md:p-12 border-white/5 bg-white/[0.01]"
        >
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-1">
                  Name
                </label>
                <input
                  required
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Identification"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-ember/40 focus:ring-1 focus:ring-ember/20 transition-all duration-300"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-1">
                  Email
                </label>
                <input
                  required
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Communication Node"
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-ember/40 focus:ring-1 focus:ring-ember/20 transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="interest" className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-1">
                Interest (Optional)
              </label>
              <input
                type="text"
                id="interest"
                name="interest"
                placeholder="Partnership / Early Access / Inquiry"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-ember/40 focus:ring-1 focus:ring-ember/20 transition-all duration-300"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] font-black text-white/30 ml-1">
                Message
              </label>
              <textarea
                required
                id="message"
                name="message"
                rows={5}
                placeholder="Describe your requirements"
                className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white placeholder:text-white/10 focus:outline-none focus:border-ember/40 focus:ring-1 focus:ring-ember/20 transition-all duration-300 resize-none"
              />
            </div>

            <div className="pt-4 flex flex-col items-center gap-6">
              <button
                disabled={status === 'LOADING'}
                type="submit"
                className="btn-primary w-full md:w-auto min-w-[200px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'LOADING' ? 'Sending...' : 'Request Access'}
              </button>

              <AnimatePresence mode="wait">
                {status === 'SUCCESS' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: premiumEaseSoft }}
                    className="text-xs uppercase tracking-[0.2em] font-bold text-ember"
                  >
                    Message received. We’ll get back to you.
                  </motion.p>
                )}
                {status === 'ERROR' && (
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: premiumEaseSoft }}
                    className="text-xs uppercase tracking-[0.2em] font-bold text-red-500"
                  >
                    Something went wrong. Try again.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
