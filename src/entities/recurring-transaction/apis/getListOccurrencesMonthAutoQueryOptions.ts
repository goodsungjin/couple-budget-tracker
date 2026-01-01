import { queryOptions } from '@tanstack/react-query';
import type { Database } from '@/shared/lib/supabase/database.types';
import { listOccurrencesMonthAuto } from '@/shared/apis/recurringTransaction';

export const getListOccurrencesMonthAutoQueryOptions = ({
  ledgerId,
  year,
  month,
  status,
}: {
  ledgerId: string;
  year: number;
  month: number;
  status?: Database['public']['Enums']['occurrence_status_enum'];
}) =>
  queryOptions({
    queryKey: ['recurring-occurrences', 'month-auto', ledgerId, year, month, status],
    queryFn: () =>
      listOccurrencesMonthAuto({
        ledgerId,
        year,
        month,
        status,
      }),
  });

