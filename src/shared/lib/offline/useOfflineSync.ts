import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import { invalidateTransactionQueries } from '@/entities/transactions/lib/queryKeys';
import { createTransaction } from '@/shared/apis/transaction';
import { offlineQueue, type QueuedTransaction } from './offlineQueue';

export const useOfflineSync = (ledgerId: string) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isSyncing, setIsSyncing] = useState(false);
  const queryClient = useQueryClient();

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
    };

    const handleOffline = () => {
      setIsOnline(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const syncOfflineTransactions = useCallback(async () => {
    if (isSyncing) return;

    setIsSyncing(true);
    const queue = offlineQueue.getQueue();

    for (const queuedTransaction of queue) {
      try {
        await createTransaction(queuedTransaction.transaction);
        offlineQueue.removeTransaction(queuedTransaction.id);
      } catch (error) {
        console.error('Failed to sync transaction:', error);
        offlineQueue.incrementRetryCount(queuedTransaction.id);
      }
    }

    // 동기화 완료 후 캐시 무효화
    if (queue.length > 0) {
      invalidateTransactionQueries(queryClient, ledgerId);
    }

    setIsSyncing(false);
  }, [isSyncing, queryClient, ledgerId]);

  useEffect(() => {
    if (isOnline) {
      syncOfflineTransactions();
    }
  }, [isOnline, syncOfflineTransactions]);

  const addToOfflineQueue = (transaction: QueuedTransaction['transaction']) => {
    return offlineQueue.addTransaction(transaction);
  };

  const getOfflineQueueSize = () => {
    return offlineQueue.getQueueSize();
  };

  const getFailedTransactions = () => {
    return offlineQueue.getFailedTransactions();
  };

  const retryFailedTransactions = async () => {
    const failedTransactions = offlineQueue.getFailedTransactions();

    for (const failedTransaction of failedTransactions) {
      try {
        await createTransaction(failedTransaction.transaction);
        offlineQueue.removeTransaction(failedTransaction.id);
      } catch (error) {
        console.error('Failed to retry transaction:', error);
      }
    }
  };

  return {
    isOnline,
    isSyncing,
    addToOfflineQueue,
    getOfflineQueueSize,
    getFailedTransactions,
    retryFailedTransactions,
    syncOfflineTransactions,
  };
};
