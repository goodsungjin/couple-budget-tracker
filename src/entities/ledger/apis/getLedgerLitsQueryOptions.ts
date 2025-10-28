import { queryOptions } from '@tanstack/react-query';
import { listMyLedgers } from '@/shared/apis/ledgers';

export const getLedgerListQueryOptions = () =>
  queryOptions({
    queryKey: ['ledger', 'list'],
    queryFn: () => listMyLedgers(),
  });
