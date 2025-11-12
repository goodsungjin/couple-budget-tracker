import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  type CreateTxArgs,
  createTransaction,
  deleteTransaction,
  type UpdateTxArgs,
  updateTransaction,
} from '@/shared/apis/transaction';
import { transactionKeys } from '../lib/queryKeys';

interface UseCreateTransactionOptions {
  ledgerId: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const useCreateTransaction = ({
  ledgerId,
  onSuccess,
  onError,
}: UseCreateTransactionOptions) => {
  const queryClient = useQueryClient();
  // const { isOnline, addToOfflineQueue } = useOfflineSync(ledgerId);

  console.log('🔍 useCreateTransaction', ledgerId, onSuccess, onError);
  return useMutation({
    mutationFn: async (transaction: CreateTxArgs) => {
      // if (!isOnline) {
      //   // 오프라인일 때는 큐에 추가하고 임시 ID 반환
      //   const queueId = addToOfflineQueue(transaction);
      //   return { id: queueId, offline: true };
      // }
      return createTransaction(transaction);
    },
    onMutate: async (newTransaction) => {
      // // 진행 중인 쿼리들을 취소
      // await queryClient.cancelQueries({
      //   queryKey: transactionKeys.lists(),
      // });

      // 이전 데이터를 백업
      const previousData = queryClient.getQueriesData({
        queryKey: transactionKeys.lists(),
      });

      // Optimistic update: 임시 transaction 추가
      const optimisticTransaction = {
        id: `temp-${Date.now()}`, // 임시 ID
        ledger_id: newTransaction.p_ledger_id,
        occurred_on: newTransaction.p_occurred_on,
        amount: newTransaction.p_amount,
        signed_amount:
          newTransaction.p_flow_type === 'income'
            ? newTransaction.p_amount
            : -newTransaction.p_amount,
        currency: 'KRW',
        merchant: newTransaction.p_merchant || '',
        memo: newTransaction.p_memo || '',
        category_id: newTransaction.p_category_id,
        category_parent_id: null,
        flow_type: newTransaction.p_flow_type,
        payment_method_id: null,
        created_by: null,
        created_at: new Date().toISOString(),
      };

      // 모든 관련 쿼리에 optimistic update 적용
      console.log('🔍 Optimistic update 시작:', optimisticTransaction);
      queryClient.setQueriesData(
        { queryKey: transactionKeys.lists() },
        (oldData: unknown) => {
          console.log('📊 기존 데이터:', oldData);
          if (!oldData || !Array.isArray(oldData))
            return [optimisticTransaction];
          return [optimisticTransaction, ...oldData];
        }
      );

      // 특정 날짜 범위 쿼리도 업데이트 (Calendar에서 사용)
      queryClient.setQueriesData(
        {
          queryKey: transactionKeys.lists(),
          predicate: (query) => {
            const queryKey = query.queryKey;
            return queryKey.includes(ledgerId) && queryKey.includes('list');
          },
        },
        (oldData: unknown) => {
          if (!oldData || !Array.isArray(oldData))
            return [optimisticTransaction];
          return [optimisticTransaction, ...oldData];
        }
      );

      return { previousData };
    },
    // onError: (err, _newTransaction, context) => {
    //   // 에러 발생 시 이전 데이터로 롤백
    //   if (context?.previousData) {
    //     for (const [queryKey, data] of context.previousData) {
    //       queryClient.setQueryData(queryKey, data);
    //     }
    //   }
    //   onError?.(err);
    // },
    // onSettled: () => {
    //   // 성공/실패 관계없이 캐시 무효화하여 최신 데이터 가져오기
    //   // 모든 transaction 쿼리를 무효화
    //   queryClient.invalidateQueries({
    //     queryKey: transactionKeys.lists(),
    //   });
    // },
    onSuccess: (data) => {
      onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: transactionKeys.lists() },
        (oldData: unknown) => {
          console.log('📊 기존 데이터:', oldData);
          if (!oldData || !Array.isArray(oldData)) return [data];
          return [data, ...oldData];
        }
      );
    },
  });
};

export const useUpdateTransaction = ({
  ledgerId,
  onSuccess,
  onError,
}: UseCreateTransactionOptions) => {
  const queryClient = useQueryClient();

  console.log('🔍 useUpdateTransaction', ledgerId, onSuccess, onError);

  return useMutation({
    mutationFn: async (transaction: UpdateTxArgs) => {
      return updateTransaction(transaction);
    },
    onSuccess: (data) => {
      onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: transactionKeys.lists() },
        (oldData: unknown) => {
          console.log('📊 기존 데이터:', oldData);
          if (!oldData || !Array.isArray(oldData)) return [data];
          return [data, ...oldData];
        }
      );
    },
  });
};

export const useDeleteTransaction = ({
  ledgerId,
  onSuccess,
  onError,
}: UseCreateTransactionOptions) => {
  const queryClient = useQueryClient();

  console.log('🔍 useDeleteTransaction', ledgerId, onSuccess, onError);

  return useMutation({
    mutationFn: async (id: string) => {
      return deleteTransaction({ p_id: id });
    },
    onSuccess: (_, id) => {
      onSuccess?.();
      queryClient.setQueriesData(
        { queryKey: transactionKeys.lists() },
        (oldData: unknown) => {
          console.log('📊 기존 데이터:', oldData);
          if (!oldData || !Array.isArray(oldData)) return [];
          return oldData.filter((transaction) => transaction.id !== id);
        }
      );
    },
    onError: (error) => {
      onError?.(error);
    },
  });
};
