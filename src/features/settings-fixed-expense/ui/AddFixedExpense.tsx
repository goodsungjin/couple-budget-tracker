import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { Section } from '@/features/settings-default-management/ui/Section';
import { InputAmount } from '@/features/transaction/ui/InputAmount';
import { InputCategory } from '@/features/transaction/ui/InputCategory';
import { TransactionLabel } from '@/features/transaction/ui/TransactionLabel';
import { createSeries } from '@/shared/apis/recurringTransaction';
import type { FlowType } from '@/shared/apis/transaction';
import type { Database } from '@/shared/lib/supabase/database.types';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { InputSelect } from '@/shared/ui/input/InputSelect';
import { TextField } from '@/shared/ui/input/TextField';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';
import * as css from './AddFixedExpense.css';

const FLOW_TYPE_KOR_MAP = {
  income: '수입',
  expense: '지출',
  saving: '저축/투자',
};

interface Props {
  ledgerId: string;
  onBack: () => void;
  isOpen: boolean;
}

const AddFixedExpense = ({ ledgerId, onBack, isOpen }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { mutate: createTopCategoryMutation } = useMutation({
    mutationFn: (params: {
      ledgerId: string;
      name: string;
      categoryId: string;
      amount: number;
      monthday: number;
      startOn: string;
      paymentMethodId?: string;
      currency?: string;
      endOn?: string | null;
      autoPost?: boolean;
      notes?: string | null;
      autoMaterialize?: boolean;
      backfillPostMode?: Database['public']['Enums']['backfill_post_mode_enum'];
    }) => {
      return createSeries(params);
    },
    onSuccess: () => {
      setIsSubmitting(false);
      onBack(); // 성공 후 뒤로가기
    },
    onError: () => {
      setIsSubmitting(false);
    },
  });

  const handleSubmit = () => {
    setIsSubmitting(true);
    createTopCategoryMutation({
      ledgerId,
      name: fixedExpenseInput.title,
      categoryId: fixedExpenseInput.categoryId,
      amount: fixedExpenseInput.amount,
      monthday: fixedExpenseInput.dayOfMonth,
      startOn: new Date().toISOString(),
      // paymentMethodId: fixedExpenseInput.paymentMethodId,
      // currency: 'KRW',
      // endOn: fixedExpenseInput.endOn,
    });
  };

  const [fixedExpenseInput, setFixedExpenseInput] = useState<{
    flowType: FlowType;
    categoryId: string;
    repeatType: 'daily' | 'weekly' | 'monthly' | 'yearly';
    dayOfMonth: number;
    amount: number;
    title: string;
  }>({
    dayOfMonth: 1,
    flowType: 'income',
    categoryId: '',
    repeatType: 'daily',
    amount: 0,
    title: '',
  });

  return (
    <TransitionRenderer
      isOpen={isOpen}
      animationType="slideLeft"
      animationDuration={300}
      className={css.base}
    >
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
            <Flex direction="row" gap="x1">
              {(['income', 'expense', 'saving'] as FlowType[]).map((item) => (
                <BoxButton
                  key={item}
                  size="large"
                  {...(fixedExpenseInput.flowType === item
                    ? { style: 'fill', variant: 'primary' }
                    : { style: 'outline', variant: 'secondary' })}
                  onClick={() => {
                    setFixedExpenseInput((prev) => ({
                      ...prev,
                      flowType: item,
                    }));
                  }}
                >
                  {FLOW_TYPE_KOR_MAP[item]}
                </BoxButton>
              ))}
            </Flex>

            <TransactionLabel
              label="카테고리"
              value={fixedExpenseInput.categoryId}
              placeholder="카테고리를 선택하세요"
              onChange={() => {}}
              renderInput={(ref) => (
                <InputCategory
                  ledgerId={ledgerId}
                  flowType={fixedExpenseInput.flowType}
                  ref={ref}
                  value={fixedExpenseInput.categoryId}
                  onChange={(category) =>
                    setFixedExpenseInput((prev) => ({
                      ...prev,
                      categoryId: category.id,
                    }))
                  }
                />
              )}
            />

            <TransactionLabel
              label="반복 주기"
              value={fixedExpenseInput.repeatType}
              placeholder="카테고리를 선택하세요"
              onChange={() => {}}
              renderInput={(ref) => (
                <InputSelect
                  ref={ref}
                  options={[
                    {
                      id: 'daily',
                      name: '매일',
                    },
                    {
                      id: 'weekly',
                      name: '매주',
                    },
                    {
                      id: 'monthly',
                      name: '매월',
                    },
                    {
                      id: 'yearly',
                      name: '매년',
                    },
                  ]}
                  value={fixedExpenseInput.repeatType}
                  onChange={(repeatType) =>
                    setFixedExpenseInput((prev) => ({
                      ...prev,
                      repeatType: repeatType.id as
                        | 'daily'
                        | 'weekly'
                        | 'monthly'
                        | 'yearly',
                    }))
                  }
                />
              )}
            />

            <TransactionLabel
              label="반복 일"
              value={fixedExpenseInput.dayOfMonth.toString()}
              placeholder="카테고리를 선택하세요"
              onChange={() => {}}
              renderInput={(ref) => (
                <InputSelect
                  ref={ref}
                  options={Array.from({ length: 31 }, (_, index) => ({
                    id: (index + 1).toString(),
                    name: (index + 1).toString(),
                  }))}
                  value={fixedExpenseInput.dayOfMonth.toString()}
                  onChange={(dayOfMonth) =>
                    setFixedExpenseInput((prev) => ({
                      ...prev,
                      dayOfMonth: Number(dayOfMonth.id),
                    }))
                  }
                />
              )}
            />

            <InputAmount
              amount={fixedExpenseInput.amount}
              onChange={(amount) =>
                setFixedExpenseInput((prev) => ({
                  ...prev,
                  amount,
                }))
              }
            />

            <TransactionLabel
              label="거래처"
              value={fixedExpenseInput.title}
              placeholder="거래처 이름을 입력하세요"
              onChange={(title) =>
                setFixedExpenseInput((prev) => ({
                  ...prev,
                  title,
                }))
              }
            />

            <BoxButton onClick={handleSubmit} size="large" variant="primary">
              {isSubmitting ? '추가 중...' : '저장하기'}
            </BoxButton>
          </Flex>
        </Section>
      </Flex>
    </TransitionRenderer>
  );
};

export { AddFixedExpense };
