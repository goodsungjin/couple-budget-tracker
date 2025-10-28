import { supabase } from '@/shared/lib/supabase/supabase';

export async function listMyUnconsumedPurchases() {
  const { data, error } = await supabase
    .from('ledger_purchases')
    .select('id, purchased_at, expires_at, consumed_at')
    .is('consumed_at', null)
    .order('purchased_at', { ascending: true });
  if (error) throw error;
  return data ?? [];
}

export async function createLedgerFromPurchase(
  purchaseId: string,
  name?: string
) {
  const { data, error } = await supabase.rpc('create_ledger_from_purchase', {
    p_purchase_id: purchaseId,
    p_name: name ?? undefined,
  });
  if (error) throw error;
  return data;
}
