import { queryOptions } from '@tanstack/react-query';
import { getMyProfile } from '@/shared/apis/profiles';

export const getUserProfileQueryOptions = () =>
  queryOptions({
    queryKey: ['user-profile', 'me'],
    queryFn: () => getMyProfile(),
  });
