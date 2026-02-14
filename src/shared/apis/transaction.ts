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

type ListTxByParentCategoryArgs =
  Database['public']['Functions']['list_transactions_by_parent_category']['Args'];
/**
 * parent 카테고리 ID로 거래를 조회합니다.
 * parent 카테고리 자체에 직접 연결된 거래와 하위 카테고리에 연결된 거래를 모두 반환합니다.
 */
export async function listTransactionsByParentCategory(params: {
  ledgerId: string;
  parentCategoryId: string;
  from?: string;
  to?: string;
  flow?: 'income' | 'expense' | 'saving';
}) {
  const { data, error } = await supabase.rpc(
    'list_transactions_by_parent_category',
    {
      p_ledger_id: params.ledgerId,
      p_parent_category_id: params.parentCategoryId,
      p_from: params.from,
      p_to: params.to,
      p_flow: params.flow,
    } as ListTxByParentCategoryArgs
  );
  if (error) throw error;
  return (data ?? []) as ListTxResponse;
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
