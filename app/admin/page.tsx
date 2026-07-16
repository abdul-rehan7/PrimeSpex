'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AdminShell } from '@/components/admin-shell';
import { getSupabase } from '@/lib/supabase/client';
import { MessageSquare, FolderKanban, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ messages: 0, projects: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ count: messages }, { count: projects }] = await Promise.all([
        getSupabase().from('contacts').select('*', { count: 'exact', head: true }),
        getSupabase().from('portfolio').select('*', { count: 'exact', head: true }),
      ]);
      setStats({
        messages: messages ?? 0,
        projects: projects ?? 0,
      });
      setLoading(false);
    })();
  }, []);

  const cards = [
    {
      label: 'Messages',
      value: stats.messages,
      href: '/admin/messages',
      icon: MessageSquare,
      description: 'Contact form submissions',
    },
    {
      label: 'Projects',
      value: stats.projects,
      href: '/admin/portfolio',
      icon: FolderKanban,
      description: 'Portfolio items published',
    },
  ];

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your site activity.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="group rounded-xl border border-border/60 p-6 transition-colors hover:bg-secondary/40"
          >
            <div className="mb-4 flex items-center justify-between">
              <card.icon className="h-5 w-5 text-muted-foreground" />
              <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
            </div>
            <div className="text-3xl font-semibold tracking-tight">
              {loading ? '—' : card.value}
            </div>
            <div className="mt-1 text-sm font-medium">{card.label}</div>
            <div className="text-xs text-muted-foreground">
              {card.description}
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
