import { Code2, Layers, Workflow } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Product Engineering',
    description:
      'Full-stack web platforms built on modern frameworks — Next.js, TypeScript, and edge-first infrastructure engineered for scale.',
    points: ['Web platforms', 'API design', 'Edge functions'],
  },
  {
    icon: Layers,
    title: 'Design Systems',
    description:
      'Cohesive, accessible component libraries and design tokens that keep your product consistent across every surface and team.',
    points: ['Component libraries', 'Design tokens', 'Accessibility audits'],
  },
  {
    icon: Workflow,
    title: 'Intelligent Automation',
    description:
      'Automated workflows and data pipelines that eliminate manual work, connect your stack, and surface insights in real time.',
    points: ['Workflow automation', 'Data pipelines', 'AI integrations'],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 max-w-2xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base">
            What we do
          </p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-6xl">
            Three disciplines. One standard of craft.
          </h2>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-border/60 bg-border/60 md:grid-cols-3">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-background p-8 transition-colors hover:bg-muted/40 md:p-10"
            >
              <service.icon className="mb-6 h-6 w-6 text-muted-foreground transition-colors group-hover:text-foreground" />
              <h3 className="mb-3 text-xl font-medium tracking-tight">
                {service.title}
              </h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.points.map((point) => (
                  <li
                    key={point}
                    className="flex items-center gap-2 text-sm text-muted-foreground md:text-base"
                  >
                    <span className="h-1 w-1 rounded-full bg-foreground/40" />
                    {point}
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
