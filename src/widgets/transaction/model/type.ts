import type { FlowType } from '@/shared/apis/transaction';

export interface TransactionInput {
  id?: string;
  amount: number;
  categoryId: string;
  flowType?: FlowType;
  memo?: string;
  title: string;
  date: string;
  paymentMethodId?: string;
}
