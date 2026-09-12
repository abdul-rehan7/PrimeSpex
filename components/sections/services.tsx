'use client';

import { useEffect, useRef } from 'react';
import { Code2, Layers, Workflow } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Code2,
    title: 'Product Engineering',
    description:
      'Full-stack web platforms built on modern frameworks — Next.js, TypeScript, and edge-first infrastructure engineered for scale.',
    items: ['Web platforms', 'API design', 'Edge functions'],
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description:
      'Cohesive, accessible component libraries and design tokens that keep your product consistent across every surface and team.',
    items: ['Component libraries', 'Design tokens', 'Accessibility audits'],
  },
  {
    icon: Workflow,
    title: 'Intelligent Automation',
    description:
      'Automated workflows and data pipelines that eliminate manual work, connect your stack, and surface insights in real time.',
    items: ['Workflow automation', 'Data pipelines', 'AI integrations'],
  },
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current;
    if (!section || !cards) return;

    const cardEls = cards.querySelectorAll('.service-card');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardEls,
        { opacity: 0, y: 70 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'expo.out',
          stagger: 0.13,
          scrollTrigger: {
            trigger: cards,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding bg-[#0a0a0a]"
    >
      <div className="container-wide">
        {/* Section header */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <ScrollReveal x={-25} y={0} duration={0.8} className="mb-5 flex items-center gap-3">
            <span className="w-8 h-px bg-[#444]"></span>
            <p className="text-eyebrow">What we do</p>
          </ScrollReveal>
          <SplitTextReveal
            text="Three disciplines."
            as="h2"
            className="text-display-section text-white"
            staggerDelay={0.06}
          />
          <SplitTextReveal
            text="One standard of craft."
            as="h2"
            className="text-display-section text-[#666]"
            delay={0.25}
            staggerDelay={0.06}
          />
        </div>

        {/* Cards grid — 1px border trick */}
        <div
          ref={cardsRef}
          className="grid gap-px bg-[#1f1f1f] md:grid-cols-3 rounded-2xl overflow-hidden"
        >
          {services.map((service) => (
            <div
              key={service.title}
              className="service-card group p-8 md:p-12 cursor-default"
            >
              {/* Icon */}
              <div className="mb-8">
                <service.icon className="h-6 w-6 text-[#444] group-hover:text-white transition-colors duration-300" />
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold tracking-tight text-white mb-4 group-hover:text-white transition-colors">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-[#666] leading-relaxed mb-8">
                {service.description}
              </p>

              {/* List */}
              <ul className="space-y-2.5">
                {service.items.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <span className="h-1 w-1 rounded-full bg-[#333] group-hover:bg-[#666] flex-shrink-0 transition-colors duration-300" />
                    <span className="text-sm text-[#555] group-hover:text-[#999] transition-colors duration-300">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
