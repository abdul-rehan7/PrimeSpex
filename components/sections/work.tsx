'use client';

import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';

export function Work() {
  return (
    <section id="work" className="section-padding bg-[#0a0a0a]">
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <ScrollReveal x={-25} y={0} duration={0.8} className="mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-[#444]"></span>
            <p className="text-eyebrow">Selected work</p>
          </ScrollReveal>
          <SplitTextReveal
            text="Products we've shipped."
            as="h2"
            className="text-display-section text-white"
            staggerDelay={0.06}
          />
        </div>

        {/* Elevated empty state with spinning gradient border */}
        <ScrollReveal y={50} duration={1.1}>
          <div className="relative rounded-2xl overflow-hidden p-px">
            {/* Animated conic-gradient border layer */}
            <div
              className="absolute inset-0 rounded-2xl animate-spin-slow opacity-20"
              style={{
                background:
                  'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.4) 60deg, transparent 120deg, rgba(255,255,255,0.2) 180deg, transparent 240deg, rgba(255,255,255,0.4) 300deg, transparent 360deg)',
              }}
            />

            {/* Card content */}
            <div className="relative rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] py-28 md:py-40">
              <div className="flex flex-col items-center justify-center text-center gap-6">
                {/* Pulsing plus icon */}
                <motion.div
                  animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.06, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="w-12 h-12 rounded-full border border-[#2a2a2a] flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 text-[#444]" />
                </motion.div>

                <div className="space-y-2">
                  <p className="text-sm text-[#444]">
                    Projects will appear here once published from the admin dashboard.
                  </p>
                  <p className="text-xs text-[#333]">
                    {'— Admin dashboard at '}
                    <a
                      href="/admin"
                      className="text-[#444] hover:text-[#666] transition-colors duration-200 underline underline-offset-2"
                    >
                      /admin
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
