import { supabase } from '@/shared/lib/supabase/supabase';

export async function getMyProfile() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session?.user) throw new Error('Not authenticated');

  const { data, error } = await supabase
    .from('profiles')
    .select('id, display_name, email, avatar_url, created_at')
    .eq('id', session.user.id)
    .single();

  if (error) throw error;
  return data;
}

export async function listLedgerMembers(ledgerId: string) {
  const { data, error } = await supabase.rpc('get_ledger_members', {
    p_ledger_id: ledgerId,
  });
  if (error) throw error;
  return data ?? [];
}
