import type { TransactionFormValues } from '@/features/transaction-form/model/useTransactionForm';

export const validateTransactionForm = (
  values: TransactionFormValues
): Record<string, string> => {
  const errors: Record<string, string> = {};

  if (!values.amount || values.amount <= 0) {
    errors.amount = '금액을 입력해주세요';
  }

  if (!values.categoryId) {
    errors.categoryId = '카테고리를 선택해주세요';
  }

  if (!values.date) {
    errors.date = '날짜를 선택해주세요';
  }

  if (!values.merchant || values.merchant.trim() === '') {
    errors.merchant = '거래처를 입력해주세요';
  }

  return errors;
};
