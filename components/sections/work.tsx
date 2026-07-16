import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { supabaseServer } from '@/lib/supabase/server';
import type { Portfolio } from '@/lib/types';

export async function Work() {
  const { data: projects } = await supabaseServer
    .from('portfolio')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(6);

  return (
    <section id="work" className="py-24 md:py-40">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-20 flex items-end justify-between">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-muted-foreground md:text-base">
              Selected work
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-6xl">
              Products we&apos;ve shipped.
            </h2>
          </div>
        </div>

        {projects && projects.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project: Portfolio) => (
              <article
                key={project.id}
                className="group overflow-hidden rounded-xl border border-border/60"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                  {project.image_url ? (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                      {project.title}
                    </div>
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <div className="mb-2 flex items-center justify-between">
                    <h3 className="text-lg font-medium tracking-tight md:text-xl">
                      {project.title}
                    </h3>
                    {project.project_url && (
                      <Link
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    )}
                  </div>
                  <p className="mb-4 text-sm text-muted-foreground line-clamp-2 md:text-base">
                    {project.description}
                  </p>
                  {project.tech_stack.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {project.tech_stack.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-md border border-border/60 px-2 py-0.5 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border/60 py-20 text-center">
            <p className="text-sm text-muted-foreground">
              Projects will appear here once published from the admin dashboard.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
