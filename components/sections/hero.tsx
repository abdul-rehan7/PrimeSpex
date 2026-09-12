'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';

gsap.registerPlugin(ScrollTrigger);

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);

  // Parallax for video on scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const videoY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [0.55, 0.85]);

  // Fade out scroll indicator
  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Entrance animation on mount
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });
      tl.fromTo(
        '.hero-subtitle',
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' },
        0.9
      )
        .fromTo(
          '.hero-body',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.9, ease: 'expo.out' },
          1.15
        )
        .fromTo(
          '.hero-ctas',
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: 'expo.out' },
          1.35
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const indicatorOpacity = Math.max(0, 1 - scrollY / 200);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Parallax video background */}
      <motion.div
        ref={videoRef}
        className="absolute inset-0 -z-10 will-change-transform"
        style={{ y: videoY }}
      >
        <video
          className="h-full w-full object-cover scale-110"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="https://images.pexels.com/videos/10184038/cityscape-downtown-downtown-indianapolis-downtown-indy-10184038.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=630&w=1200"
          aria-hidden="true"
        >
          <source
            src="https://videos.pexels.com/video-files/10184038/10184038-hd_1280_720_30fps.mp4"
            type="video/mp4"
            media="(max-width: 768px)"
          />
          <source
            src="https://videos.pexels.com/video-files/10184038/10184038-hd_1920_1080_30fps.mp4"
            type="video/mp4"
            media="(min-width: 769px)"
          />
        </video>
      </motion.div>

      {/* Dynamic overlay */}
      <motion.div
        className="absolute inset-0 -z-10 bg-black"
        style={{ opacity: overlayOpacity }}
      />

      {/* Bottom gradient melting into bg */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-black/20 via-transparent to-[#0a0a0a]" />

      {/* Content */}
      <div className="container-wide w-full pt-24 pb-32 md:pt-32">
        <div className="max-w-4xl">
          {/* H1 — split text word reveal */}
          <div className="mb-6">
            <SplitTextReveal
              text="Your Business"
              as="h1"
              className="text-display-hero text-white"
              delay={0.4}
              staggerDelay={0.07}
            />
            <div className="overflow-hidden">
              <p
                className="hero-subtitle text-display-hero opacity-0"
                style={{ color: '#666666' }}
              >
                Solutions Partner.
              </p>
            </div>
          </div>

          {/* Body paragraph */}
          <p className="hero-body opacity-0 text-[#999] text-base md:text-lg leading-relaxed max-w-xl mb-12">
            PrimeSpex delivers end-to-end business solutions — web platforms,
            design systems, and intelligent automation — engineered for
            performance and craft.
          </p>

          {/* CTAs */}
          <div className="hero-ctas opacity-0 flex flex-col sm:flex-row gap-4">
            <a href="#contact">
              <button className="group flex items-center justify-center gap-2.5 bg-white text-black font-semibold text-base py-4 px-10 rounded-full hover:bg-[#e0e0e0] transition-colors duration-300 w-full sm:w-auto">
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </a>
            <a href="#work">
              <button className="flex items-center justify-center font-semibold text-base py-4 px-10 rounded-full border border-white/20 text-white hover:bg-white/5 transition-colors duration-300 w-full sm:w-auto">
                View our work
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={indicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-opacity duration-500"
        style={{ opacity: indicatorOpacity }}
      >
        <span className="text-[10px] text-[#444] uppercase tracking-[0.25em] font-medium">
          Scroll
        </span>
        <div className="scroll-indicator">
          <ChevronDown className="h-4 w-4 text-[#444]" />
        </div>
      </div>
    </section>
  );
}
