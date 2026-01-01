import { FormProvider } from 'react-hook-form';
import { useCategoryFormSync } from '@/entities/category/hooks/useCategoryFormSync';
import { useTransactionForm } from '@/features/transaction-form/model/useTransactionForm';
import { AmountInput } from '@/features/transaction-form/ui/AmountInput';
import { CategorySelect } from '@/features/transaction-form/ui/CategorySelect';
import { DatePickerField } from '@/features/transaction-form/ui/DatePickerField';
import { FlowTypeRadioGroup } from '@/features/transaction-form/ui/FlowTypeRadioGroup';
import { PaymentMethodSelect } from '@/features/transaction-form/ui/PaymentMethodSelect';
import { TextInputField } from '@/features/transaction-form/ui/TextInputField';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import type { TransactionInput } from '@/widgets/transaction/model/type';
import * as css from './transactionFormOverlay.css';

interface Props {
  ledgerId: string;
  onSubmit: (transaction: TransactionInput) => void;
  onClose: () => void;
  defaultTransactionInput: TransactionInput | null;
  onDelete?: (id: string) => void;
}

const TransactionFormOverlay = ({
  ledgerId,
  onSubmit,
  onClose,
  defaultTransactionInput,
  onDelete,
}: Props) => {
  const form = useTransactionForm({
    defaultValues: defaultTransactionInput
      ? {
          amount: defaultTransactionInput.amount,
          flowType: defaultTransactionInput.flowType || 'expense',
          categoryId: defaultTransactionInput.categoryId,
          date: defaultTransactionInput.date,
          paymentMethodId: defaultTransactionInput.paymentMethodId,
          merchant: defaultTransactionInput.title,
          memo: defaultTransactionInput.memo,
        }
      : undefined,
  });

  // 소분류 카테고리 ID를 상위 카테고리로 변환하여 form 동기화
  useCategoryFormSync({
    form,
    categoryId: defaultTransactionInput?.categoryId,
    ledgerId,
    enabled: !!defaultTransactionInput?.categoryId,
  });

  const handleSubmit = form.handleSubmit((values) => {
    // 소분류가 선택되어 있으면 소분류 ID를 사용, 없으면 상위 카테고리 ID 사용
    const finalCategoryId = values.subcategoryId || values.categoryId;

    onSubmit({
      id: defaultTransactionInput?.id,
      amount: values.amount,
      categoryId: finalCategoryId,
      flowType: values.flowType,
      memo: values.memo,
      title: values.merchant,
      date: values.date,
      paymentMethodId: values.paymentMethodId,
    });
  });

  return (
    <Dialog onClickBackdrop={onClose}>
      <FormProvider {...form}>
        <form onSubmit={handleSubmit} className={css.form}>
          <Flex
            gap="x4"
            width="500px"
            height="auto"
            py="x10"
            px="x10"
            direction="column"
            className={css.container}
          >
            <Flex justifyContent="end" alignItems="center">
              <button
                type="button"
                onClick={onClose}
                className={css.closeButton}
                aria-label="닫기"
              >
                <Text typography="h2" color="gray100">
                  ×
                </Text>
              </button>
            </Flex>

            <Flex direction="column" gap="x4" flex={1}>
              <AmountInput name="amount" />

              <FlowTypeRadioGroup name="flowType" />

              <DatePickerField name="date" />

              <CategorySelect
                name="categoryId"
                ledgerId={ledgerId}
                flowTypeFieldName="flowType"
              />

              <PaymentMethodSelect name="paymentMethodId" ledgerId={ledgerId} />

              <TextInputField
                name="merchant"
                label="거래처"
                placeholder="거래처 이름을 입력하세요"
                required
              />

              <TextInputField
                name="memo"
                label="메모"
                placeholder="거래 내역에 대한 메모를 입력하세요"
                multiline
              />
            </Flex>

            <Flex gap="x3" direction="column">
              <BoxButton
                type="submit"
                variant="primary"
                size="xlarge"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? '저장 중...' : '저장하기'}
              </BoxButton>

              {defaultTransactionInput?.id && onDelete && (
                <BoxButton
                  type="button"
                  variant="secondary"
                  size="xlarge"
                  onClick={() => {
                    if (defaultTransactionInput?.id) {
                      onDelete(defaultTransactionInput.id);
                    }
                  }}
                >
                  삭제하기
                </BoxButton>
              )}
            </Flex>
          </Flex>
        </form>
      </FormProvider>
    </Dialog>
  );
};

export { TransactionFormOverlay };
