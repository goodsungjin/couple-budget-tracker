import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

type PMType = Database['public']['Enums']['payment_method_type'];

export async function listPaymentMethods(
  ledgerId: string,
  opts?: { includeInactive?: boolean; type?: PMType }
) {
  const { data, error } = await supabase.rpc('list_payment_methods', {
    p_ledger_id: ledgerId,
  });
  if (error) throw error;

  const rows = data ?? [];
  return rows
    .filter((r) => (opts?.includeInactive ? true : r.active))
    .filter((r) => (opts?.type ? r.type === opts.type : true));
}

/** 단건 조회는 목록 RPC를 재사용해서 필터 (조인/타입 불확실성 제거) */
export async function getPaymentMethodById(ledgerId: string, methodId: string) {
  const rows = await listPaymentMethods(ledgerId, { includeInactive: true });
  return rows.find((r) => r.id === methodId) ?? null;
}

export type CreatePMArgs =
  Database['public']['Functions']['create_payment_method']['Args'];

export async function createPaymentMethod(args: CreatePMArgs) {
  const { data, error } = await supabase.rpc('create_payment_method', args);
  if (error) throw error;
  return data;
}

type UpdatePMArgs =
  Database['public']['Functions']['update_payment_method']['Args'];
export async function updatePaymentMethod(args: UpdatePMArgs): Promise<void> {
  const { error } = await supabase.rpc('update_payment_method', args);
  if (error) throw error;
}

export async function archivePaymentMethod(methodId: string) {
  await updatePaymentMethod({ p_method_id: methodId, p_active: false });
}
export async function activatePaymentMethod(methodId: string) {
  await updatePaymentMethod({ p_method_id: methodId, p_active: true });
}

type SetOwnersArgs =
  Database['public']['Functions']['set_payment_method_owners']['Args'];
export async function setPaymentMethodOwners(args: SetOwnersArgs) {
  const { error } = await supabase.rpc('set_payment_method_owners', args);
  if (error) throw error;
}

export async function getIssuerCatalog() {
  const { data, error } = await supabase.from('issuer_catalog').select('*');
  if (error) throw error;
  return data ?? [];
}
