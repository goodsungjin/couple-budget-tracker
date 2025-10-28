import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

type CatInsert = Database['public']['Tables']['categories']['Insert'];
export type CategoryFlow = Database['public']['Enums']['flow_type_enum'];

export async function listCategories(
  ledgerId: string,
  opts?: { flowType?: CategoryFlow; includeInactive?: boolean }
) {
  const q = supabase
    .from('categories')
    .select(
      'id, ledger_id, name, flow_type, parent_id, emoji, sort_index, active, is_system_seed, created_at'
    )
    .eq('ledger_id', ledgerId)
    .order('parent_id', { ascending: true })
    .order('sort_index', { ascending: true })
    .order('name', { ascending: true });

  if (opts?.flowType) q.eq('flow_type', opts.flowType);
  if (!opts?.includeInactive) q.eq('active', true);

  const { data, error } = await q;
  if (error) throw error;
  return data ?? [];
}

export async function createTopCategory(input: {
  ledgerId: string;
  name: string;
  flowType: CategoryFlow;
  emoji?: string | null;
  sortIndex?: number;
  active?: boolean;
}) {
  const payload: CatInsert = {
    ledger_id: input.ledgerId,
    name: input.name,
    flow_type: input.flowType,
    parent_id: null,
    emoji: input.emoji ?? null,
    sort_index: input.sortIndex ?? 0,
    active: input.active ?? true,
    is_system_seed: false,
  };
  const { error } = await supabase.from('categories').insert(payload);
  if (error) throw error;
}

export async function createSubCategory(input: {
  ledgerId: string;
  parentId: string;
  name: string;
  sortIndex?: number;
  active?: boolean;
}) {
  const payload: CatInsert = {
    ledger_id: input.ledgerId,
    parent_id: input.parentId,
    name: input.name,
    flow_type: 'expense',
    sort_index: input.sortIndex ?? 0,
    active: input.active ?? true,
    is_system_seed: false,
  };
  const { error } = await supabase.from('categories').insert(payload);
  if (error) throw error;
}

export async function updateCategory(
  id: string,
  patch: Partial<Pick<CatInsert, 'name' | 'emoji' | 'sort_index' | 'active'>>
) {
  const { error } = await supabase
    .from('categories')
    .update(patch)
    .eq('id', id);
  if (error) throw error;
}

export async function deleteCategory(id: string) {
  const { error } = await supabase.from('categories').delete().eq('id', id);
  if (error) throw error;
}
