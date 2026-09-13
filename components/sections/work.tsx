'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { getSupabase } from '@/lib/supabase/client';
import type { Portfolio } from '@/lib/types';

export function Work() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getSupabase()
        .from('portfolio')
        .select('*')
        .order('created_at', { ascending: false });
      setProjects((data as Portfolio[]) ?? []);
      setLoading(false);
    })();
  }, []);

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

        {/* Loading state */}
        {loading && (
          <div className="flex items-center justify-center py-28">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-6 w-6 border-2 border-[#333] border-t-white rounded-full"
            />
          </div>
        )}

        {/* Empty state */}
        {!loading && projects.length === 0 && (
          <ScrollReveal y={50} duration={1.1}>
            <div className="relative rounded-2xl overflow-hidden p-px">
              <div
                className="absolute inset-0 rounded-2xl animate-spin-slow opacity-20"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.4) 60deg, transparent 120deg, rgba(255,255,255,0.2) 180deg, transparent 240deg, rgba(255,255,255,0.4) 300deg, transparent 360deg)',
                }}
              />
              <div className="relative rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] py-28 md:py-40">
                <div className="flex flex-col items-center justify-center text-center gap-6">
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
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        )}

        {/* Project grid */}
        {!loading && projects.length > 0 && (
          <div className="grid gap-8 md:grid-cols-2">
            {projects.map((project, i) => (
              <ScrollReveal key={project.id} y={60} delay={i * 0.1} duration={1}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] overflow-hidden"
                >
                  {/* Project image */}
                  {project.image_url && (
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent opacity-60" />
                    </div>
                  )}

                  {/* Project info */}
                  <div className="p-6 md:p-8">
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <h3 className="text-xl font-bold tracking-tight text-white">
                        {project.title}
                      </h3>
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-shrink-0 w-9 h-9 rounded-full border border-[#2a2a2a] flex items-center justify-center text-[#555] hover:text-white hover:border-[#444] transition-all duration-300"
                        >
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-[#666] leading-relaxed mb-5 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Tech stack tags */}
                    {project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {project.tech_stack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs text-[#555] border border-[#1f1f1f] rounded-full px-3 py-1 bg-[#111]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
