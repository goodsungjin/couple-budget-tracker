import { queryOptions } from '@tanstack/react-query';
import { listLedgerMembers } from '@/shared/apis/profiles';

export const getLedgerMembersQueryOptions = (ledgerId: string) =>
  queryOptions({
    queryKey: ['ledger', 'members', ledgerId],
    queryFn: () => listLedgerMembers(ledgerId),
  });
