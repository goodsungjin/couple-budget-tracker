import { supabase } from '@/shared/lib/supabase/supabase';

export const month_kpis = async (
  ledgerId: string,
  month: number,
  year: number
) => {
  const { data, error } = await supabase
    .rpc('month_kpis', {
      p_ledger_id: ledgerId,
      p_month: month,
      p_year: year,
    })
    .single();
  if (error) throw error;
  return data;
};
