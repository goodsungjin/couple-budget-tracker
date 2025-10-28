import { useState } from 'react';
import { useBatchCreateTransaction } from '@/entities/transactions/hooks/useBatchCreateTransaction';
import { InputAmount } from '@/features/transaction/ui/InputAmount';
import { InputCategory } from '@/features/transaction/ui/InputCategory';
import { InputDate } from '@/features/transaction/ui/InputDate';
import { RadioGroupCategory } from '@/features/transaction/ui/RadioGroupCategory';
import { TransactionLabel } from '@/features/transaction/ui/TransactionLabel';
import type { CreateTxArgs, FlowType } from '@/shared/apis/transaction';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import { useToast } from '@/shared/ui/toast/ToastProvider';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';

interface TransactionForm {
  amount: number;
  flowType: FlowType;
  category: string;
  date: string;
  memo: string;
  title: string;
}

interface Props {
  ledgerId: string;
  onSubmit: (transactions: Omit<CreateTxArgs, 'p_ledger_id'>[]) => void;
  onClose: () => void;
  isOpen: boolean;
}

const BatchTransactionOverlay = ({ ledgerId, isOpen, onClose }: Props) => {
  const [transactions, setTransactions] = useState<TransactionForm[]>([
    {
      amount: 0,
      flowType: 'expense',
      category: '',
      date: '',
      memo: '',
      title: '',
    },
  ]);
  const { showToast } = useToast();

  const { mutate: mutateBatchCreate, isPending } = useBatchCreateTransaction({
    ledgerId,
    onSuccess: (results) => {
      const successCount = results.filter((r) => r.success).length;
      const failCount = results.length - successCount;

      if (successCount > 0) {
        showToast(
          'success',
          `${successCount}개의 거래가 성공적으로 추가되었습니다!`
        );
      }
      if (failCount > 0) {
        showToast('error', `${failCount}개의 거래 추가에 실패했습니다.`);
      }
      onClose();
    },
    onError: (error) => {
      showToast('error', '배치 거래 추가에 실패했습니다.');
      console.error('Batch transaction creation failed:', error);
    },
  });

  const handleBatchSubmit = (
    transactions: Omit<CreateTxArgs, 'p_ledger_id'>[]
  ) => {
    mutateBatchCreate(
      transactions.map((t) => ({ ...t, p_ledger_id: ledgerId }))
    );
  };

  const addTransaction = () => {
    setTransactions((prev) => [
      ...prev,
      {
        amount: 0,
        flowType: 'expense',
        category: '',
        date: '',
        memo: '',
        title: '',
      },
    ]);
  };

  const removeTransaction = (index: number) => {
    setTransactions((prev) => prev.filter((_, i) => i !== index));
  };

  const updateTransaction = (
    index: number,
    field: keyof TransactionForm,
    value: string | number | FlowType
  ) => {
    setTransactions((prev) =>
      prev.map((transaction, i) =>
        i === index ? { ...transaction, [field]: value } : transaction
      )
    );
  };

  const handleSubmit = () => {
    const validTransactions = transactions.filter(
      (t) => t.amount > 0 && t.category && t.date && t.title
    );

    if (validTransactions.length === 0) {
      showToast('error', '유효한 거래를 최소 1개 이상 입력해주세요.');
      return;
    }

    const transactionData = validTransactions.map((transaction) => ({
      p_amount: transaction.amount,
      p_category_id: transaction.category,
      p_occurred_on: transaction.date,
      p_memo: transaction.memo,
      p_merchant: transaction.title,
      p_flow_type: transaction.flowType,
    }));

    handleBatchSubmit(transactionData);
  };

  return (
    <TransitionRenderer isOpen={isOpen} animationType="fade">
      <Dialog onClickBackdrop={onClose}>
        <Flex
          gap="x4"
          width="600px"
          height="700px"
          py="x10"
          px="x10"
          direction="column"
        >
          <Text typography="h2" color="gray100">
            배치 거래 내역 추가
          </Text>

          <Flex direction="column" gap="x4" flex={1}>
            {transactions.map((transaction, index) => (
              <Flex
                key={`transaction-${index}-${transaction.title}-${transaction.amount}`}
                direction="column"
                gap="x3"
              >
                <Flex justifyContent="between" alignItems="center">
                  <Text typography="body1" color="gray90">
                    거래 {index + 1}
                  </Text>
                  {transactions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeTransaction(index)}
                      style={{
                        color: 'red',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                      }}
                    >
                      삭제
                    </button>
                  )}
                </Flex>

                <InputAmount
                  amount={transaction.amount}
                  onChange={(amount) =>
                    updateTransaction(index, 'amount', amount)
                  }
                />

                <RadioGroupCategory
                  selectedFlowType={transaction.flowType}
                  onChange={(flowType) =>
                    updateTransaction(index, 'flowType', flowType)
                  }
                />

                <TransactionLabel
                  label="날짜"
                  value={transaction.date}
                  placeholder="날짜를 선택하세요"
                  readonly
                  onChange={() => {}}
                  renderInput={(ref) => (
                    <InputDate
                      ref={ref}
                      selectedDate={transaction.date}
                      onChange={(date) =>
                        updateTransaction(index, 'date', date)
                      }
                    />
                  )}
                />

                <TransactionLabel
                  label="카테고리"
                  value={transaction.category}
                  placeholder="카테고리를 선택하세요"
                  onChange={() => {}}
                  renderInput={(ref) => (
                    <InputCategory
                      ledgerId={ledgerId}
                      flowType={transaction.flowType}
                      ref={ref}
                      value={transaction.category}
                      onChange={(category) =>
                        updateTransaction(index, 'category', category.id)
                      }
                    />
                  )}
                />

                <TransactionLabel
                  label="거래처"
                  value={transaction.title}
                  placeholder="거래처 이름을 입력하세요"
                  onChange={(title) => updateTransaction(index, 'title', title)}
                />

                <TransactionLabel
                  label="메모"
                  value={transaction.memo}
                  placeholder="메모를 입력하세요"
                  onChange={(memo) => updateTransaction(index, 'memo', memo)}
                />
              </Flex>
            ))}
          </Flex>

          <Flex gap="x3">
            <BoxButton
              variant="secondary"
              size="large"
              onClick={addTransaction}
            >
              거래 추가
            </BoxButton>

            <BoxButton
              variant="primary"
              size="large"
              onClick={handleSubmit}
              disabled={isPending}
            >
              {isPending ? '저장 중...' : `${transactions.length}개 거래 저장`}
            </BoxButton>
          </Flex>
        </Flex>
      </Dialog>
    </TransitionRenderer>
  );
};

export { BatchTransactionOverlay };
