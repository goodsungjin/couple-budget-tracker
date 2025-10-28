import { queryOptions } from '@tanstack/react-query';
import { month_kpis } from '@/shared/apis/dashboard';

export const getMonthKPIQueryOptions = (
  ledgerId: string,
  month: number,
  year: number
) =>
  queryOptions({
    queryKey: ['dashboard', 'month-kpi', ledgerId, month, year],
    queryFn: () => month_kpis(ledgerId, month, year),
  });
