import { redirect } from 'react-router';
import { getSessionQueryOptions } from '@/entities/auth/apis/getSessionQueryOptions';
import { getLedgerListQueryOptions } from '@/entities/ledger/apis/getLedgerLitsQueryOptions';
import { queryClient } from '@/shared/lib/react-query/reactQuery';

export const defaultLoader = async () => {
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split('/').filter(Boolean);

  const {
    data: { session },
  } = await queryClient.fetchQuery(getSessionQueryOptions());

  if (!session) {
    return redirect('/login');
  }

  if (pathSegments.length === 0 || pathSegments[0] === 'login') {
    const [ledger] = await queryClient.fetchQuery(getLedgerListQueryOptions());
    return redirect(`/${ledger.id}/dashboard`);
  }
};
