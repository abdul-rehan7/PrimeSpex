import Link from 'next/link';

const footerLinks = {
  Company: [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Contact', href: '#contact' },
  ],
  Services: [
    { label: 'Product Engineering', href: '#services' },
    { label: 'Design Systems', href: '#services' },
    { label: 'Automation', href: '#services' },
  ],
};

export function SiteFooter() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[2fr_3fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="text-base font-semibold tracking-tight">
                PrimeSpex
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Your Business Solutions Partner.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                  {title}
                </h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} PrimeSpex.{' '}
            <Link
              href="/admin"
              className="transition-colors hover:text-foreground"
            >
              All rights reserved.
            </Link>
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with precision.
          </p>
        </div>
      </div>
    </footer>
  );
}
