import { Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Instagram, Linkedin, Mail, Twitter } from 'lucide-react'
import { premiumEase, premiumEaseSoft } from './lib/motion'
import Navbar from './components/Navbar'
import ImpliedAdoption from './components/ImpliedAdoption'
import MultiLayerDefense from './components/MultiLayerDefense'
import IntelligenceFlow from './components/IntelligenceFlow'
import CoreModels from './components/CoreModels'
import HighRiskEnvironments from './components/HighRiskEnvironments'
import Mission from './components/Mission'
import SystemTimeline from './components/SystemTimeline'
import TrustedInfrastructure from './components/TrustedInfrastructure'
import RealityShift from './components/RealityShift'
import Contact from './components/Contact'
import Logo from './components/Logo'

// Lazy load sections with heavy Three.js / Globe visualizations
const Hero = lazy(() => import('./components/Hero'))

const footerNavigation = [
  { label: 'Infrastructure', href: '#infrastructure' },
  { label: 'Defense', href: '#defense' },
  { label: 'Models', href: '#models' },
  { label: 'Mission', href: '#mission' },
  { label: 'Contact', href: '#contact' },
]

const footerContacts = [
  { label: 'founder@crypsisx.com', href: 'mailto:founder@crypsisx.com' },
  { label: 'security@crypsisx.com', href: 'mailto:security@crypsisx.com' },
  { label: 'support@crypsisx.com', href: 'mailto:support@crypsisx.com' },
]

const footerSocials = [
  { label: 'Instagram', href: 'https://www.instagram.com/crypsisx_/', icon: Instagram },
  { label: 'X', href: 'https://x.com/CrypsisX_', icon: Twitter },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/company/crypsisx/?viewAsMember=true', icon: Linkedin },
]

export default function App() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-ember/30 selection:text-ember-300 antialiased overflow-x-hidden">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: premiumEase }}
        className="relative z-10"
      >
        <Navbar />
        
        <div className="relative">
          <Suspense fallback={<div className="h-screen flex items-center justify-center text-white/10 uppercase tracking-[0.5em] text-[10px]">Loading_Infrastructure_Core...</div>}>
            <Hero />
          </Suspense>
          
          <div className="mb-section-open">
            <div id="defense">
              <MultiLayerDefense />
            </div>
          </div>

          <RealityShift text="Digital trust is broken." />

          <div className="mb-section-tight">
            <IntelligenceFlow />
          </div>

          <div className="mb-section-open">
            <div id="models">
              <CoreModels />
            </div>
          </div>

          <RealityShift text="Verification is no longer optional." />

          <HighRiskEnvironments />

          <div className="mb-section-tight">
            <div id="mission">
              <Suspense fallback={<div className="h-[600px] flex items-center justify-center text-white/10 uppercase tracking-[0.5em] text-[10px]">Initialising_Global_Intelligence_Globe...</div>}>
                <Mission />
              </Suspense>
            </div>
          </div>

          <SystemTimeline />

          <RealityShift text="The internet needs a new trust layer." />

          <TrustedInfrastructure />

          <Contact />
          </div>
        <footer className="py-16 sm:py-20 lg:py-24 border-t border-white/[0.02] bg-background-darker/50 backdrop-blur-3xl">
          <div className="container mx-auto px-4 sm:px-6 max-w-[1400px]">
            <div className="grid gap-12 sm:gap-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(220px,0.7fr)_minmax(0,1fr)] lg:gap-20">
              <div className="flex flex-col gap-8 max-w-sm">
                <Logo className="h-8" variant="muted" />
                <p className="text-white/20 text-xs tracking-[0.18em] sm:tracking-[0.3em] uppercase leading-relaxed font-medium">
                  The Trust Infrastructure <br /> for the Digital World.
                </p>
              </div>
              
              <div className="flex flex-col gap-6">
                <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/10">Navigation</span>
                <div className="flex flex-col gap-3">
                  {footerNavigation.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="interactive-link w-fit rounded-lg px-3 py-2.5 text-xs uppercase tracking-[0.18em] sm:tracking-[0.24em] font-medium text-white/30 transition-all duration-500 hover:bg-white/[0.03] hover:text-ember/85 hover:shadow-[0_0_24px_rgba(249,115,22,0.08)]"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-10 lg:flex-row lg:gap-12 lg:justify-end">
                <div className="flex min-w-0 lg:min-w-[220px] flex-col gap-6">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/10">Contact</span>
                  <div className="flex flex-col gap-3">
                    {footerContacts.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        className="interactive-link group flex w-fit max-w-full items-center gap-3 rounded-lg px-3 py-2.5 text-xs font-medium tracking-[0.08em] sm:tracking-[0.16em] text-white/30 transition-all duration-500 hover:bg-white/[0.03] hover:text-white/60 hover:shadow-[0_0_24px_rgba(249,115,22,0.06)] break-all"
                      >
                        <Mail className="h-3.5 w-3.5 text-white/20 transition-colors duration-500 group-hover:text-ember/60" />
                        <span>{item.label}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="flex min-w-0 lg:min-w-[180px] flex-col gap-6">
                  <span className="text-[10px] uppercase tracking-[0.4em] font-black text-white/10">Connect</span>
                  <div className="flex flex-col gap-3">
                    {footerSocials.map((item) => {
                      const Icon = item.icon

                      return (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="interactive-link group flex w-fit items-center gap-3 rounded-lg px-3 py-2.5 text-xs uppercase tracking-[0.18em] sm:tracking-[0.24em] font-medium text-white/30 transition-all duration-500 hover:bg-white/[0.03] hover:text-white/60 hover:shadow-[0_0_24px_rgba(249,115,22,0.06)]"
                        >
                          <Icon className="h-3.5 w-3.5 text-white/20 transition-colors duration-500 group-hover:text-ember/60" />
                          <span>{item.label}</span>
                          <motion.div
                            transition={{ duration: 0.7, ease: premiumEaseSoft }}
                            whileHover={{ x: 2, y: -2 }}
                          >
                            <ArrowUpRight className="h-3 w-3 text-white/15 transition-all duration-500 group-hover:text-ember/50" />
                          </motion.div>
                        </a>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-16 sm:mt-24 lg:mt-32 pt-8 sm:pt-10 border-t border-white/[0.02] flex flex-col items-center justify-center gap-4 sm:gap-6 pb-12">
              <p className="text-[12px] tracking-[0.15em] text-white/50 font-medium text-center">
                ॐ हं हनुमते नमः
              </p>
              <p className="text-[9px] uppercase tracking-[0.2em] sm:tracking-[0.4em] text-white/10 font-black text-center">
                &copy; {new Date().getFullYear()} CrypsisX. Secure by design.
              </p>
            </div>
          </div>
        </footer>
      </motion.div>
    </main>
  )
}
