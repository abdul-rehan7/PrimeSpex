import { ContactForm } from '@/components/sections/contact-form';

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-md">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base">
              Contact
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-6xl">
              Let&apos;s build something exceptional.
            </h2>
            <p className="mt-6 text-muted-foreground md:text-lg">
              Tell us about your project and timeline. We respond to every
              inquiry within one business day.
            </p>
            <div className="mt-8 space-y-2 text-sm text-muted-foreground md:text-base">
              <p>hello@primespex.com</p>
              <p>Remote — San Francisco, Berlin, Singapore</p>
            </div>
          </div>

          <div className="rounded-2xl border border-border/60 p-6 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
