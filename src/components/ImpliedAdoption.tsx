import { motion } from 'framer-motion'

const categories = [
  'Financial Systems',
  'Communication Platforms',
  'Identity Infrastructure',
  'Media Networks'
]

export default function ImpliedAdoption() {
  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-[1200px]">
        <div className="flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="flex items-center gap-3 sm:gap-6 mb-12 sm:mb-16"
          >
            <div className="h-px w-8 bg-white/10" />
            <h3 className="text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.5em] text-white/40 font-black text-center whitespace-nowrap">
              Ubiquitous Trust Integration
            </h3>
            <div className="h-px w-8 bg-white/10" />
          </motion.div>
          
          <div className="flex flex-wrap justify-center gap-x-8 sm:gap-x-16 lg:gap-x-20 gap-y-6 sm:gap-y-10">
            {categories.map((category, i) => (
              <motion.div
                key={category}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.4 }} // Increased from 0.15 for readability
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1 }}
                className="group cursor-default"
              >
                <span className="text-sm md:text-base uppercase tracking-[0.18em] sm:tracking-[0.28em] md:tracking-[0.4em] font-bold text-white group-hover:text-ember group-hover:opacity-100 transition-all duration-500 text-center block">
                  {category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
