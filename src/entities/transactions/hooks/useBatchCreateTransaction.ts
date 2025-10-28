import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type CreateTxArgs,
  createTransaction,
} from '@/shared/apis/transaction';
import { useOfflineSync } from '@/shared/lib/offline/useOfflineSync';
import {
  invalidateTransactionQueries,
  transactionKeys,
} from '../lib/queryKeys';

interface UseBatchCreateTransactionOptions {
  ledgerId: string;
  onSuccess?: (
    results: Array<{
      success: boolean;
      transaction: CreateTxArgs;
      error?: Error;
    }>
  ) => void;
  onError?: (error: Error) => void;
}

export const useBatchCreateTransaction = ({
  ledgerId,
  onSuccess,
  onError,
}: UseBatchCreateTransactionOptions) => {
  const queryClient = useQueryClient();
  const { isOnline, addToOfflineQueue } = useOfflineSync(ledgerId);

  return useMutation({
    mutationFn: async (transactions: CreateTxArgs[]) => {
      if (!isOnline) {
        // 오프라인일 때는 모든 거래를 큐에 추가
        const queueIds = transactions.map((transaction) =>
          addToOfflineQueue(transaction)
        );
        return {
          results: queueIds.map((id) => ({ id, offline: true })),
          offline: true,
        };
      }

      // 온라인일 때는 배치로 처리
      const results = await Promise.allSettled(
        transactions.map((transaction) => createTransaction(transaction))
      );

      return {
        results: results.map((result, index) => ({
          success: result.status === 'fulfilled',
          transaction: transactions[index],
          data: result.status === 'fulfilled' ? result.value : undefined,
          error: result.status === 'rejected' ? result.reason : undefined,
        })),
        offline: false,
      };
    },
    onMutate: async (transactions) => {
      // 진행 중인 쿼리들을 취소
      await queryClient.cancelQueries({
        queryKey: transactionKeys.lists(),
      });

      // 이전 데이터를 백업
      const previousData = queryClient.getQueriesData({
        queryKey: transactionKeys.lists(),
      });

      // Optimistic update: 모든 거래를 임시로 추가
      const optimisticTransactions = transactions.map((transaction, index) => ({
        id: `temp-batch-${Date.now()}-${index}`,
        ledger_id: transaction.p_ledger_id,
        occurred_on: transaction.p_occurred_on,
        amount: transaction.p_amount,
        signed_amount:
          transaction.p_flow_type === 'income'
            ? transaction.p_amount
            : -transaction.p_amount,
        currency: 'KRW',
        merchant: transaction.p_merchant || '',
        memo: transaction.p_memo || '',
        category_id: transaction.p_category_id,
        category_parent_id: null,
        flow_type: transaction.p_flow_type,
        payment_method_id: null,
        created_by: null,
        created_at: new Date().toISOString(),
      }));

      // 모든 관련 쿼리에 optimistic update 적용
      queryClient.setQueriesData(
        { queryKey: transactionKeys.lists() },
        (oldData: unknown) => {
          if (!oldData || !Array.isArray(oldData))
            return optimisticTransactions;
          return [...optimisticTransactions, ...oldData];
        }
      );

      return { previousData };
    },
    onError: (err, _transactions, context) => {
      // 에러 발생 시 이전 데이터로 롤백
      if (context?.previousData) {
        for (const [queryKey, data] of context.previousData) {
          queryClient.setQueryData(queryKey, data);
        }
      }
      onError?.(err);
    },
    onSettled: () => {
      // 성공/실패 관계없이 캐시 무효화하여 최신 데이터 가져오기
      invalidateTransactionQueries(queryClient, ledgerId);
    },
    onSuccess: (data) => {
      if (data.offline) {
        onSuccess?.(
          data.results.map(() => ({
            success: true,
            transaction: {} as CreateTxArgs,
          }))
        );
      } else {
        onSuccess?.(
          data.results as Array<{
            success: boolean;
            transaction: CreateTxArgs;
            data: string | undefined;
            error: any;
          }>
        );
      }
    },
  });
};
