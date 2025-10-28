import { queryOptions } from '@tanstack/react-query';
import { listTransactions } from '@/shared/apis/transaction';
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
      listTransactions({ p_ledger_id: ledgerId, p_from: from, p_to: to }),
  });
