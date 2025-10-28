import type { QueryClient } from '@tanstack/react-query';

/**
 * Transaction 관련 쿼리 키를 중앙 관리
 * 쿼리 키 변경 시 한 곳에서만 수정하면 됨
 */
export const transactionKeys = {
  all: ['transactions'] as const,
  lists: () => [...transactionKeys.all, 'list'] as const,
  list: (ledgerId: string, from: string, to: string) =>
    [...transactionKeys.lists(), ledgerId, from, to] as const,
  details: () => [...transactionKeys.all, 'detail'] as const,
  detail: (id: string) => [...transactionKeys.details(), id] as const,
} as const;

/**
 * 특정 ledger의 모든 transaction 쿼리를 무효화
 */
export const invalidateTransactionQueries = (
  queryClient: QueryClient,
  ledgerId: string
) => {
  return queryClient.invalidateQueries({
    queryKey: ['transactions', 'list', ledgerId],
  });
};

/**
 * 특정 날짜 범위의 transaction 쿼리만 무효화
 */
export const invalidateTransactionQueriesByDateRange = (
  queryClient: QueryClient,
  ledgerId: string,
  from: string,
  to: string
) => {
  return queryClient.invalidateQueries({
    queryKey: ['transactions', 'list', ledgerId, from, to],
  });
};
