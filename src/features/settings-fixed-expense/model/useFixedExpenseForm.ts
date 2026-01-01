import { type UseFormReturn, useForm } from 'react-hook-form';
import type { FlowType } from '@/shared/apis/transaction';

export interface FixedExpenseFormValues {
  amount: number;
  flowType: FlowType;
  categoryId: string;
  subcategoryId?: string;
  repeatType: 'daily' | 'weekly' | 'monthly' | 'yearly';
  dayOfMonth: number;
  title: string;
}

interface UseFixedExpenseFormOptions {
  defaultValues?: Partial<FixedExpenseFormValues>;
}

export const useFixedExpenseForm = ({
  defaultValues,
}: UseFixedExpenseFormOptions): UseFormReturn<FixedExpenseFormValues> => {
  const form = useForm<FixedExpenseFormValues>({
    defaultValues: {
      amount: defaultValues?.amount ?? 0,
      flowType: defaultValues?.flowType ?? 'expense',
      categoryId: defaultValues?.categoryId ?? '',
      subcategoryId: defaultValues?.subcategoryId ?? '',
      repeatType: defaultValues?.repeatType ?? 'monthly',
      dayOfMonth: defaultValues?.dayOfMonth ?? 1,
      title: defaultValues?.title ?? '',
    },
    mode: 'onChange',
  });

  return form;
};

