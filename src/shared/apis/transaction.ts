import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

export type FlowType = Database['public']['Enums']['flow_type_enum'];

export type CreateTxArgs =
  Database['public']['Functions']['create_transaction']['Args'];

export async function createTransaction(args: CreateTxArgs) {
  const { data, error } = await supabase
    .rpc('create_transaction', args)
    .single();
  if (error) throw error;
  return data;
}

export type UpdateTxArgs =
  Database['public']['Functions']['update_transaction']['Args'];
export async function updateTransaction(args: UpdateTxArgs) {
  const { data, error } = await supabase
    .rpc('update_transaction', args)
    .single();
  if (error) throw error;
  return data;
}

type DeleteTxArgs =
  Database['public']['Functions']['delete_transaction']['Args'];
export async function deleteTransaction(args: DeleteTxArgs) {
  const { error } = await supabase.rpc('delete_transaction', args);
  if (error) throw error;
}

type ListTxArgs = Database['public']['Functions']['list_transactions']['Args'];
export type ListTxResponse =
  Database['public']['Functions']['list_transactions']['Returns'];
export async function listTransactions(args: ListTxArgs) {
  const { data, error } = await supabase.rpc('list_transactions', args);
  if (error) throw error;
  return data ?? [];
}

/** (선택) v_transactions를 직접 조회해야 한다면, 반환 타입 명세만 붙임 */
export async function getTransactionById(ledgerId: string, id: string) {
  const { data, error } = await supabase
    .from('v_transactions')
    .select(`
      id, ledger_id, occurred_on, amount, signed_amount, currency,
      merchant, memo, category_id, category_parent_id, flow_type,
      payment_method_id, created_by, created_at
    `)
    .eq('id', id)
    .eq('ledger_id', ledgerId)
    .single();

  if (error) {
    if ((error as { code?: string }).code === 'PGRST116') return null;
    throw error;
  }
  return data;
}
