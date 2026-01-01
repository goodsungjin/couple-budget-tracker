import { type UseFormReturn, useForm } from 'react-hook-form';
import type { FlowType } from '@/shared/apis/transaction';

export interface TransactionFormValues {
  amount: number;
  flowType: FlowType;
  categoryId: string;
  subcategoryId?: string;
  date: string;
  paymentMethodId?: string;
  merchant: string;
  memo?: string;
}

interface UseTransactionFormOptions {
  defaultValues?: Partial<TransactionFormValues>;
}

export const useTransactionForm = ({
  defaultValues,
}: UseTransactionFormOptions): UseFormReturn<TransactionFormValues> => {
  const form = useForm<TransactionFormValues>({
    defaultValues: {
      amount: defaultValues?.amount ?? 0,
      flowType: defaultValues?.flowType ?? 'expense',
      categoryId: defaultValues?.categoryId ?? '',
      subcategoryId: defaultValues?.subcategoryId ?? '',
      date: defaultValues?.date ?? '',
      paymentMethodId: defaultValues?.paymentMethodId ?? '',
      merchant: defaultValues?.merchant ?? '',
      memo: defaultValues?.memo ?? '',
    },
    mode: 'onChange',
  });

  return form;
};
