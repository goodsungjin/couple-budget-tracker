import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import { FormProvider } from 'react-hook-form';
import { useCategoryFormSync } from '@/entities/category/hooks/useCategoryFormSync';
import { Section } from '@/features/settings-default-management/ui/Section';
import {
  type FixedExpenseFormValues,
  useFixedExpenseForm,
} from '@/features/settings-fixed-expense/model/useFixedExpenseForm';
import { DayOfMonthSelect } from '@/features/settings-fixed-expense/ui/DayOfMonthSelect';
import { RepeatTypeSelect } from '@/features/settings-fixed-expense/ui/RepeatTypeSelect';
import { AmountInput } from '@/features/transaction-form/ui/AmountInput';
import { CategorySelect } from '@/features/transaction-form/ui/CategorySelect';
import { FlowTypeRadioGroup } from '@/features/transaction-form/ui/FlowTypeRadioGroup';
import { TextInputField } from '@/features/transaction-form/ui/TextInputField';
import { updateSeries } from '@/shared/apis/recurringTransaction';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';
import * as css from './AddFixedExpense.css';

interface RecurringSeries {
  id: string;
  name: string;
  category_id: string;
  amount: number;
  monthday: number;
  start_on: string;
  payment_method_id?: string | null;
  currency?: string;
  end_on?: string | null;
  auto_post?: boolean;
  notes?: string | null;
  frequency?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

interface Props {
  ledgerId: string;
  onBack: () => void;
  isOpen: boolean;
  series: RecurringSeries | null;
}

const EditFixedExpense = ({ ledgerId, onBack, isOpen, series }: Props) => {
  const queryClient = useQueryClient();

  const form = useFixedExpenseForm({});

  // 소분류 카테고리 ID를 상위 카테고리로 변환하여 form 동기화
  useCategoryFormSync({
    form,
    categoryId: series?.category_id,
    ledgerId,
    enabled: !!series?.category_id,
  });

  // series가 변경되면 form 값 업데이트 (useCategoryFormSync 이후에 실행)
  useEffect(() => {
    if (series) {
      form.reset({
        amount: Number(series.amount) || 0,
        flowType: 'expense', // 기본값, useCategoryFormSync에서 자동으로 업데이트됨
        categoryId: series.category_id, // useCategoryFormSync가 이를 감지하여 변환
        repeatType: (series.frequency || 'monthly') as
          | 'daily'
          | 'weekly'
          | 'monthly'
          | 'yearly',
        dayOfMonth: series.monthday || 1,
        title: series.name || '',
      });
    }
  }, [series, form]);

  const { mutate: updateSeriesMutation } = useMutation({
    mutationFn: (params: {
      seriesId: string;
      patch: Parameters<typeof updateSeries>[1];
    }) => {
      return updateSeries(params.seriesId, params.patch);
    },
    onSuccess: () => {
      // 고정지출 리스트 쿼리 무효화
      queryClient.invalidateQueries({
        queryKey: ['recurringSeries', 'list', ledgerId],
      });
      onBack(); // 성공 후 뒤로가기
    },
  });

  const handleSubmit = form.handleSubmit((values: FixedExpenseFormValues) => {
    if (!series) return;

    // 소분류가 선택되어 있으면 소분류 ID를 사용, 없으면 상위 카테고리 ID 사용
    const finalCategoryId = values.subcategoryId || values.categoryId;

    updateSeriesMutation({
      seriesId: series.id,
      patch: {
        name: values.title,
        categoryId: finalCategoryId,
        amount: values.amount,
        monthday: values.dayOfMonth,
        // startOn은 수정하지 않음 (기존 값 유지)
        // paymentMethodId: values.paymentMethodId,
        // currency: series.currency || 'KRW',
        // endOn: series.end_on || undefined,
      },
    });
  });

  if (!series) return null;

  return (
    <TransitionRenderer
      isOpen={isOpen}
      animationType="slideLeft"
      animationDuration={300}
      className={css.base}
    >
      <FormProvider {...form}>
        <form onSubmit={handleSubmit}>
          <Flex px="x10" py="x10" height="100%" direction="column" gap="x10">
            <Section
              title={
                <Flex alignItems="center" gap="x1_5" onClick={onBack}>
                  <IconChevronLeft />
                  고정 내역 수정
                </Flex>
              }
            >
              <Flex direction="column" gap="x6">
                <Flex direction="column" gap="x4" flex={1}>
                  <AmountInput name="amount" />

                  <FlowTypeRadioGroup name="flowType" />

                  <CategorySelect
                    name="categoryId"
                    ledgerId={ledgerId}
                    flowTypeFieldName="flowType"
                  />

                  <RepeatTypeSelect name="repeatType" />

                  <DayOfMonthSelect name="dayOfMonth" />

                  <TextInputField
                    name="title"
                    label="거래처"
                    placeholder="거래처 이름을 입력하세요"
                    required
                  />
                </Flex>

                <Flex gap="x3" direction="column">
                  <BoxButton
                    type="submit"
                    variant="primary"
                    size="xlarge"
                    disabled={form.formState.isSubmitting}
                  >
                    {form.formState.isSubmitting ? '수정 중...' : '저장하기'}
                  </BoxButton>
                </Flex>
              </Flex>
            </Section>
          </Flex>
        </form>
      </FormProvider>
    </TransitionRenderer>
  );
};

export { EditFixedExpense };
export type { RecurringSeries };
