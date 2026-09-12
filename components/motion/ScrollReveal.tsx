'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  x?: number;
  scale?: number;
  once?: boolean;
  stagger?: number;
  triggerAt?: string;
}

export function ScrollReveal({
  children,
  className = '',
  delay = 0,
  duration = 1,
  y = 60,
  x = 0,
  scale = 1,
  once = true,
  stagger = 0,
  triggerAt = 'top 88%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = stagger > 0 ? el.children : el;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        {
          opacity: 0,
          y,
          x,
          scale: scale !== 1 ? scale : undefined,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration,
          delay,
          ease: 'expo.out',
          stagger: stagger || 0,
          scrollTrigger: {
            trigger: el,
            start: triggerAt,
            once,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, duration, y, x, scale, once, stagger, triggerAt]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
