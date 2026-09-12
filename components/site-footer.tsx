'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';

const footerLinks = {
  company: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    { label: 'Product Engineering', href: '#services' },
    { label: 'Design Systems', href: '#services' },
    { label: 'Automation', href: '#services' },
  ],
};

export function SiteFooter() {
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="border-t border-[#1f1f1f] bg-[#0a0a0a]">
      {/* Pre-footer CTA banner — Bou-style statement */}
      <div className="container-wide py-24 md:py-36 border-b border-[#1f1f1f]">
        <ScrollReveal y={50} duration={1.1}>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p className="text-display-cta text-white max-w-2xl leading-tight">
              We&apos;re ready<br />
              <span className="text-[#666]">when you are.</span>
            </p>
            <a
              href="#contact"
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              className="group flex-shrink-0 flex items-center gap-3 text-[#999] hover:text-white transition-colors duration-300 text-lg font-medium self-end md:self-auto pb-2"
            >
              Start a project
              <motion.span
                animate={{ x: hovered ? 6 : 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <ArrowUpRight className="h-5 w-5" />
              </motion.span>
            </a>
          </div>
        </ScrollReveal>
      </div>

      {/* Footer columns */}
      <div className="container-wide py-16">
        <ScrollReveal stagger={0.1} y={30} duration={0.9}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-12 md:gap-8">
            {/* Brand column */}
            <div>
              <Link
                href="/"
                className="text-base font-bold tracking-tight text-white hover:opacity-70 transition-opacity"
              >
                PrimeSpex
              </Link>
              <p className="mt-3 text-sm text-[#666] max-w-xs leading-relaxed">
                Your Business Solutions Partner.
              </p>
              <p className="mt-6 text-xs text-[#444] italic">
                Still scrolling? Let&apos;s talk
                <Link href="/admin" className="cursor-default text-inherit hover:text-inherit">
                  .
                </Link>
              </p>
            </div>

            {/* Company column */}
            <div>
              <p className="text-eyebrow mb-5">Company</p>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#666] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services column */}
            <div>
              <p className="text-eyebrow mb-5">Services</p>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[#666] hover:text-white transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>

        {/* Footer bottom bar */}
        <ScrollReveal y={20} delay={0.2} duration={0.8}>
          <div className="mt-16 pt-8 border-t border-[#1f1f1f] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-xs text-[#444]">
              © 2026 PrimeSpex. All rights reserved.
            </p>
            <p className="text-xs text-[#444]">Crafted with precision.</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
