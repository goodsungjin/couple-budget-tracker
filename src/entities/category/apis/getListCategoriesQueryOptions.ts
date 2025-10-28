import { queryOptions } from '@tanstack/react-query';
import { type CategoryFlow, listCategories } from '@/shared/apis/categories';

export const getListCategoriesQueryOptions = ({
  ledgerId,
  flowType,
}: {
  ledgerId: string;
  flowType: CategoryFlow;
}) =>
  queryOptions({
    queryKey: ['category', 'list', ledgerId, { flowType }],
    queryFn: () => listCategories(ledgerId, { flowType }),
  });
