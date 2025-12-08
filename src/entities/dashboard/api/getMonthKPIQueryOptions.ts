import { queryOptions } from '@tanstack/react-query';
import { getKpis } from '@/shared/apis/dashboard';

export const getMonthKPIQueryOptions = (
  ledgerId: string,
  from: string,
  to: string,
  includeScheduled?: boolean
) =>
  queryOptions({
    queryKey: ['dashboard', 'month-kpi', ledgerId, from, to],
    queryFn: () =>
      getKpis({
        ledgerId,
        from,
        to,
        includeScheduled,
      }),
  });
