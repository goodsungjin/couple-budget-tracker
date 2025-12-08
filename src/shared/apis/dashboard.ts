import { supabase } from '@/shared/lib/supabase/supabase';

export async function getKpis(params: {
  ledgerId: string;
  from: string; // 'YYYY-MM-DD' inclusive
  to: string; // 'YYYY-MM-DD' exclusive
  includeScheduled?: boolean; // default false
}) {
  const { data, error } = await supabase.rpc('month_kpis', {
    p_ledger_id: params.ledgerId,
    p_from: params.from,
    p_to: params.to,
    p_include_scheduled: params.includeScheduled ?? false,
  });
  if (error) throw error;
  return data?.[0];
}

// 카테고리 지출 집계
export async function categoryExpenseBreakdown(params: {
  ledgerId: string;
  from: string; // 'YYYY-MM-DD' inclusive
  to: string; // 'YYYY-MM-DD' exclusive
  includeScheduled?: boolean; // default: false
  level?: 'leaf' | 'parent'; // default: 'leaf'
}) {
  const { data, error } = await supabase.rpc('category_expense_breakdown', {
    p_ledger_id: params.ledgerId,
    p_from: params.from,
    p_to: params.to,
    p_include_scheduled: params.includeScheduled ?? false,
    p_level: params.level ?? 'leaf',
  });
  if (error) throw error;
  return data ?? [];
}
