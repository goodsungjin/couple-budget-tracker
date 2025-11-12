import { queryOptions } from '@tanstack/react-query';
import { listMyPendingInvites } from '@/shared/apis/invites';

export const getPendingInvitesQueryOptions = () =>
  queryOptions({
    queryKey: ['invites', 'pending'],
    queryFn: () => listMyPendingInvites(),
  });

