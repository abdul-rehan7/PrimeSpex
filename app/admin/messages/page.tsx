'use client';

import { useEffect, useState, useMemo } from 'react';
import { AdminShell } from '@/components/admin-shell';
import { supabase } from '@/lib/supabase/client';
import type { Contact } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Trash2,
  Loader2,
  Mail,
} from 'lucide-react';
import { cn } from '@/lib/utils';

type SortKey = 'name' | 'email' | 'created_at';
type SortDir = 'asc' | 'desc';

export default function MessagesPage() {
  const [messages, setMessages] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('created_at');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });
      setMessages((data as Contact[]) ?? []);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let result = messages;
    if (search) {
      const q = search.toLowerCase();
      result = result.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.email.toLowerCase().includes(q) ||
          m.message.toLowerCase().includes(q)
      );
    }
    result = [...result].sort((a, b) => {
      const av = a[sortKey];
      const bv = b[sortKey];
      const cmp = av.localeCompare(bv);
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return result;
  }, [messages, search, sortKey, sortDir]);

  const toggleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('asc');
    }
  };

  const handleDelete = async (id: string) => {
    setDeleting(id);
    await supabase.from('contacts').delete().eq('id', id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    setDeleting(null);
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col)
      return <ArrowUpDown className="ml-1 inline h-3 w-3 opacity-40" />;
    return sortDir === 'asc' ? (
      <ArrowUp className="ml-1 inline h-3 w-3" />
    ) : (
      <ArrowDown className="ml-1 inline h-3 w-3" />
    );
  };

  return (
    <AdminShell>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight">Messages</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          All submissions from the contact form.
        </p>
      </div>

      <div className="mb-4 relative max-w-sm">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search messages..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      <div className="rounded-xl border border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>
                <button
                  onClick={() => toggleSort('name')}
                  className="inline-flex items-center font-medium"
                >
                  Name
                  <SortIcon col="name" />
                </button>
              </TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort('email')}
                  className="inline-flex items-center font-medium"
                >
                  Email
                  <SortIcon col="email" />
                </button>
              </TableHead>
              <TableHead className="hidden md:table-cell">Message</TableHead>
              <TableHead>
                <button
                  onClick={() => toggleSort('created_at')}
                  className="inline-flex items-center font-medium"
                >
                  Date
                  <SortIcon col="created_at" />
                </button>
              </TableHead>
              <TableHead className="w-[50px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No messages found.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((msg) => (
                <TableRow key={msg.id}>
                  <TableCell className="font-medium">{msg.name}</TableCell>
                  <TableCell>
                    <a
                      href={`mailto:${msg.email}`}
                      className="inline-flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <Mail className="h-3 w-3" />
                      {msg.email}
                    </a>
                  </TableCell>
                  <TableCell className="hidden max-w-md md:table-cell">
                    <p className="truncate text-sm text-muted-foreground">
                      {msg.message}
                    </p>
                  </TableCell>
                  <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                    {new Date(msg.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => handleDelete(msg.id)}
                      disabled={deleting === msg.id}
                    >
                      {deleting === msg.id ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {!loading && (
        <p className="mt-4 text-xs text-muted-foreground">
          {filtered.length} {filtered.length === 1 ? 'message' : 'messages'}
        </p>
      )}
    </AdminShell>
  );
}
