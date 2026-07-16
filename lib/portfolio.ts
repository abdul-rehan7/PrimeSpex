import { getSupabase } from '@/lib/supabase/client';
import type { PortfolioInput } from '@/lib/types';

export async function createProject(input: PortfolioInput) {
  const { error } = await getSupabase().from('portfolio').insert(input);
  if (error) return { error: error.message };
  return { success: true };
}

export async function updateProject(id: string, input: PortfolioInput) {
  const { error } = await getSupabase().from('portfolio').update(input).eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}

export async function deleteProject(id: string) {
  const { error } = await getSupabase().from('portfolio').delete().eq('id', id);
  if (error) return { error: error.message };
  return { success: true };
}
