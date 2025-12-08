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

  return useMutation({
    mutationFn: async (transaction: CreateTxArgs) => {
      // if (!isOnline) {
      //   // 오프라인일 때는 큐에 추가하고 임시 ID 반환
      //   const queueId = addToOfflineQueue(transaction);
      //   return { id: queueId, offline: true };
      // }
      return createTransaction(transaction);
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
}: UseCreateTransactionOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newTransaction: UpdateTxArgs) => {
      return updateTransaction(newTransaction);
    },
    onSuccess: (data) => {
      onSuccess?.();

      queryClient.setQueriesData(
        { queryKey: transactionKeys.lists() },
        (oldData: unknown) => {
          console.log('📊 기존 데이터:', oldData);
          if (!oldData || !Array.isArray(oldData)) return [data];
          return oldData.map((transaction) =>
            transaction.id === data.id ? data : transaction
          );
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
