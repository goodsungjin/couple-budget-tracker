import { queryOptions } from '@tanstack/react-query';
import { listPaymentMethods } from '@/shared/apis/paymentMethod';

export const getListPaymentMethodsQueryOptions = (ledgerId: string) =>
  queryOptions({
    queryKey: ['payment-method', 'list', ledgerId],
    queryFn: () => listPaymentMethods(ledgerId),
  });
