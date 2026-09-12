'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SplitTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
}

export function SplitTextReveal({
  text,
  className = '',
  delay = 0,
  staggerDelay = 0.06,
  as: Tag = 'h1',
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  const words = text.split(' ');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const wordEls = el.querySelectorAll('.word-inner');

    const ctx = gsap.context(() => {
      gsap.fromTo(
        wordEls,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 1,
          ease: 'expo.out',
          stagger: staggerDelay,
          delay,
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [delay, staggerDelay]);

  return (
    <Tag ref={ref as React.RefObject<any>} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-wrapper inline-block overflow-hidden"
          style={{ marginRight: i < words.length - 1 ? '0.3em' : 0 }}
        >
          <span className="word-inner inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
