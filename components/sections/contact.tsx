'use client';

import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin } from 'lucide-react';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { SplitTextReveal } from '@/components/motion/SplitTextReveal';
import { getSupabase } from '@/lib/supabase/client';

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData(formRef.current!);
    const name = (formData.get('name') as string)?.trim();
    const email = (formData.get('email') as string)?.trim();
    const message = (formData.get('message') as string)?.trim();

    if (!name || !email || !message) {
      setError('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    const { error: insertError } = await getSupabase()
      .from('contacts')
      .insert({ name, email, message });

    setIsSubmitting(false);

    if (insertError) {
      setError('Something went wrong. Please try again.');
    } else {
      setSubmitted(true);
    }
  };

  return (
    <section id="contact" className="section-padding bg-[#0a0a0a]">
      <div className="container-wide">
        <div className="grid gap-16 lg:grid-cols-2 lg:gap-24 xl:gap-32">
          {/* Left column */}
          <div className="max-w-md">
            <ScrollReveal x={-25} y={0} duration={0.8} className="mb-5 flex items-center gap-3">
              <span className="w-8 h-px bg-[#444]"></span>
              <p className="text-eyebrow">Contact</p>
            </ScrollReveal>

            <SplitTextReveal
              text="Let's build something exceptional."
              as="h2"
              className="text-display-section text-white mb-8"
              staggerDelay={0.05}
            />

            <ScrollReveal y={30} delay={0.4} duration={0.9}>
              <p className="text-[#666] text-base md:text-lg leading-relaxed mb-10">
                Tell us about your project and timeline. We respond to every
                inquiry within one business day.
              </p>

              <div className="space-y-4">
                {/* Email */}
                <div className="flex items-center gap-3 group">
                  <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[#333] group-hover:bg-[#666] flex-shrink-0 transition-colors" />
                  <a
                    href="mailto:hello@primespex.com"
                    className="text-sm text-[#555] hover:text-white transition-colors duration-300 hover:underline underline-offset-2"
                  >
                    hello@primespex.com
                  </a>
                </div>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#333] flex-shrink-0" />
                  <p className="text-sm text-[#555]">
                    Remote — San Francisco, Berlin, Singapore
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right column — Form */}
          <ScrollReveal y={50} delay={0.2} duration={1.1}>
            <div className="rounded-2xl border border-[#1f1f1f] bg-[#0d0d0d] p-8 md:p-12">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="flex flex-col items-start gap-4 py-8"
                >
                  <div className="w-10 h-10 rounded-full bg-[#1a1a1a] border border-[#2a2a2a] flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">
                    Message sent.
                  </h3>
                  <p className="text-sm text-[#666]">
                    We&apos;ll be in touch within one business day.
                  </p>
                </motion.div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-8">
                  {/* Row: Name + Email */}
                  <div className="grid gap-8 sm:grid-cols-2">
                    {/* Name */}
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-xs text-[#555] uppercase tracking-[0.15em] font-medium"
                      >
                        Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        autoComplete="name"
                        placeholder="Jane Doe"
                        className="minimal-input"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-xs text-[#555] uppercase tracking-[0.15em] font-medium"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        autoComplete="email"
                        placeholder="jane@company.com"
                        className="minimal-input"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label
                      htmlFor="message"
                      className="text-xs text-[#555] uppercase tracking-[0.15em] font-medium"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your project..."
                      className="minimal-input resize-none"
                      style={{ lineHeight: '1.7' }}
                    />
                  </div>

                  {/* Error message */}
                  {error && (
                    <p className="text-sm text-red-400">{error}</p>
                  )}

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white text-black text-sm font-semibold py-3.5 px-10 rounded-full hover:bg-[#e0e0e0] transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                          className="block h-4 w-4 border-2 border-black/20 border-t-black rounded-full"
                        />
                        Sending...
                      </span>
                    ) : (
                      <>
                        Send message
                        <ArrowRight className="h-3.5 w-3.5" />
                      </>
                    )}
                  </motion.button>
                </form>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
