import { queryOptions } from '@tanstack/react-query';
import { getSession } from '@/shared/apis/auth';

export const getSessionQueryOptions = () =>
  queryOptions({
    queryKey: ['session'],
    queryFn: () => getSession(),
  });
