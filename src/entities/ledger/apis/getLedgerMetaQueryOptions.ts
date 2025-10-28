import { queryOptions } from '@tanstack/react-query';
import { getLedgerMeta } from '@/shared/apis/ledgers';

export const getLedgerMetaQueryOptions = (ledgerId: string) =>
  queryOptions({
    queryKey: ['ledger', 'meta', ledgerId],
    queryFn: () => getLedgerMeta(ledgerId),
  });
