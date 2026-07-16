'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell } from '@/components/admin-shell';
import { supabase } from '@/lib/supabase/client';
import { createProject, updateProject, deleteProject } from '@/lib/portfolio';
import type { Portfolio } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Plus, Pencil, Trash2, Loader2, ExternalLink } from 'lucide-react';

type FormState = {
  title: string;
  description: string;
  image_url: string;
  project_url: string;
  tech_stack: string;
};

const emptyForm: FormState = {
  title: '',
  description: '',
  image_url: '',
  project_url: '',
  tech_stack: '',
};

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Portfolio | null>(null);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Portfolio | null>(null);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('portfolio')
      .select('*')
      .order('created_at', { ascending: false });
    setProjects((data as Portfolio[]) ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (project: Portfolio) => {
    setEditing(project);
    setForm({
      title: project.title,
      description: project.description,
      image_url: project.image_url ?? '',
      project_url: project.project_url ?? '',
      tech_stack: project.tech_stack.join(', '),
    });
    setDialogOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const payload = {
      title: form.title,
      description: form.description,
      image_url: form.image_url || null,
      project_url: form.project_url || null,
      tech_stack: form.tech_stack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
    };

    if (editing) {
      await updateProject(editing.id, payload);
    } else {
      await createProject(payload);
    }

    setSaving(false);
    setDialogOpen(false);
    fetchProjects();
    router.refresh();
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    await deleteProject(deleteTarget.id);
    setDeleting(false);
    setDeleteTarget(null);
    fetchProjects();
    router.refresh();
  };

  return (
    <AdminShell>
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Portfolio</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage your published projects.
          </p>
        </div>
        <Button onClick={openCreate} className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Add project</span>
        </Button>
      </div>

      <div className="rounded-xl border border-border/60">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="hidden lg:table-cell">Tech Stack</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="h-32 text-center">
                  <Loader2 className="mx-auto h-5 w-5 animate-spin text-muted-foreground" />
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-32 text-center text-sm text-muted-foreground"
                >
                  No projects yet. Click &quot;Add project&quot; to create one.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>
                    <div className="h-12 w-16 overflow-hidden rounded-md bg-muted">
                      {project.image_url && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-medium">{project.title}</div>
                    {project.project_url && (
                      <a
                        href={project.project_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Live link
                      </a>
                    )}
                  </TableCell>
                  <TableCell className="hidden max-w-xs md:table-cell">
                    <p className="truncate text-sm text-muted-foreground">
                      {project.description}
                    </p>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {project.tech_stack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="rounded border border-border/60 px-1.5 py-0.5 text-xs text-muted-foreground"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.tech_stack.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{project.tech_stack.length - 3}
                        </span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => openEdit(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => setDeleteTarget(project)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editing ? 'Edit project' : 'New project'}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="Project name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
                placeholder="Short project description"
                required
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="image_url">Image URL</Label>
              <Input
                id="image_url"
                value={form.image_url}
                onChange={(e) =>
                  setForm({ ...form, image_url: e.target.value })
                }
                placeholder="https://images.pexels.com/..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_url">Project URL</Label>
              <Input
                id="project_url"
                value={form.project_url}
                onChange={(e) =>
                  setForm({ ...form, project_url: e.target.value })
                }
                placeholder="https://..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tech_stack">Tech Stack</Label>
              <Input
                id="tech_stack"
                value={form.tech_stack}
                onChange={(e) =>
                  setForm({ ...form, tech_stack: e.target.value })
                }
                placeholder="Next.js, TypeScript, Supabase"
              />
              <p className="text-xs text-muted-foreground">
                Comma-separated list of technologies.
              </p>
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={saving}>
                {saving ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editing ? (
                  'Save changes'
                ) : (
                  'Create project'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete project?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{deleteTarget?.title}&quot;.
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminShell>
  );
}
