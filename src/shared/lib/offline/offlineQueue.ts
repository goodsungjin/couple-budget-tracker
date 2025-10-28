import type { CreateTxArgs } from '@/shared/apis/transaction';

export interface QueuedTransaction {
  id: string;
  transaction: CreateTxArgs;
  timestamp: number;
  retryCount: number;
}

class OfflineQueue {
  private queue: QueuedTransaction[] = [];
  private readonly STORAGE_KEY = 'offline_transaction_queue';
  private readonly MAX_RETRY_COUNT = 3;

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (stored) {
        this.queue = JSON.parse(stored);
      }
    } catch (error) {
      console.error('Failed to load offline queue from storage:', error);
      this.queue = [];
    }
  }

  private saveToStorage() {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.queue));
    } catch (error) {
      console.error('Failed to save offline queue to storage:', error);
    }
  }

  addTransaction(transaction: CreateTxArgs): string {
    const id = `offline-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const queuedTransaction: QueuedTransaction = {
      id,
      transaction,
      timestamp: Date.now(),
      retryCount: 0,
    };

    this.queue.push(queuedTransaction);
    this.saveToStorage();
    return id;
  }

  getQueue(): QueuedTransaction[] {
    return [...this.queue];
  }

  removeTransaction(id: string): boolean {
    const index = this.queue.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.queue.splice(index, 1);
      this.saveToStorage();
      return true;
    }
    return false;
  }

  incrementRetryCount(id: string): boolean {
    const item = this.queue.find((item) => item.id === id);
    if (item) {
      item.retryCount++;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  clearQueue(): void {
    this.queue = [];
    this.saveToStorage();
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  hasFailedTransactions(): boolean {
    return this.queue.some((item) => item.retryCount >= this.MAX_RETRY_COUNT);
  }

  getFailedTransactions(): QueuedTransaction[] {
    return this.queue.filter((item) => item.retryCount >= this.MAX_RETRY_COUNT);
  }
}

export const offlineQueue = new OfflineQueue();
