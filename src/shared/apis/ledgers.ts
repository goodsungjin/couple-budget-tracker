import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

type MemberRole = Database['public']['Enums']['member_role'];

export async function listMyLedgers() {
  const { data, error } = await supabase
    .from('ledgers')
    .select('id, name, created_by, created_at, base_member_cap, purchase_id')
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data ?? [];
}

export async function getLedgerMeta(ledgerId: string) {
  const [countRes, capRes] = await Promise.all([
    supabase
      .from('ledger_members')
      .select('user_id', { count: 'exact', head: true })
      .eq('ledger_id', ledgerId),
    supabase.rpc('effective_member_cap', { l: ledgerId }),
  ]);
  if (countRes.error) throw countRes.error;
  if (capRes.error) throw capRes.error;
  return {
    memberCount: countRes.count ?? 0,
    memberCap: (capRes.data ?? 0) as number,
  };
}

export async function addMember(
  ledgerId: string,
  userId: string,
  role: MemberRole = 'editor'
) {
  const { error } = await supabase
    .from('ledger_members')
    .insert({ ledger_id: ledgerId, user_id: userId, role });
  if (error) throw error;
}

export async function changeMemberRole(
  ledgerId: string,
  userId: string,
  role: MemberRole
) {
  const { error } = await supabase
    .from('ledger_members')
    .update({ role })
    .match({ ledger_id: ledgerId, user_id: userId });
  if (error) throw error;
}

export async function removeMember(ledgerId: string, userId: string) {
  const { error } = await supabase
    .from('ledger_members')
    .delete()
    .match({ ledger_id: ledgerId, user_id: userId });
  if (error) throw error;
}
