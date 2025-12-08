import { queryOptions } from '@tanstack/react-query';
import { listMonthActivityCompatible } from '@/shared/apis/recurringTransaction';
import { transactionKeys } from '../lib/queryKeys';

export const getListTransactionQueryOptions = ({
  ledgerId,
  from,
  to,
}: {
  ledgerId: string;
  from: string;
  to: string;
}) =>
  queryOptions({
    queryKey: transactionKeys.list(ledgerId, from, to),
    queryFn: () =>
      listMonthActivityCompatible({ ledgerId, from: from, to: to }),
  });
