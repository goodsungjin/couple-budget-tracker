import { useState } from 'react';
import { InputAmount } from '@/features/transaction/ui/InputAmount';
import { InputCategory } from '@/features/transaction/ui/InputCategory';
import { InputDate } from '@/features/transaction/ui/InputDate';
import { RadioGroupCategory } from '@/features/transaction/ui/RadioGroupCategory';
import { TransactionLabel } from '@/features/transaction/ui/TransactionLabel';
import type { CreateTxArgs } from '@/shared/apis/transaction';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';

interface Props {
  ledgerId: string;
  onSubmit: (transaction: Omit<CreateTxArgs, 'p_ledger_id'>) => void;
  onClose: () => void;
  defaultTransactionInput: Omit<CreateTxArgs, 'p_ledger_id'> | null;
}
const TransactionOverlay = ({
  ledgerId,
  onSubmit,
  onClose,
  defaultTransactionInput,
}: Props) => {
  const [transactionInput, setTransactionInput] = useState<
    Omit<CreateTxArgs, 'p_ledger_id'>
  >(
    defaultTransactionInput ?? {
      p_amount: 0,
      p_category_id: '',
      p_occurred_on: '',
      p_memo: '',
      p_merchant: '',
      p_flow_type: 'expense',
    }
  );
  const [displayCategoryName, setDisplayCategoryName] = useState<string>('');

  return (
    <Dialog onClickBackdrop={onClose}>
      <Flex
        gap="x4"
        width="500px"
        height="628px"
        py="x10"
        px="x10"
        direction="column"
      >
        <Text typography="body1" color="gray100">
          거래 내역 추가
        </Text>

        <InputAmount
          amount={transactionInput.p_amount}
          onChange={(amount) =>
            setTransactionInput((prev) => ({
              ...prev,
              p_amount: amount,
            }))
          }
        />

        <RadioGroupCategory
          selectedFlowType={transactionInput.p_flow_type ?? 'expense'}
          onChange={(flowType) =>
            setTransactionInput((prev) => ({
              ...prev,
              p_flow_type: flowType,
            }))
          }
        />

        <TransactionLabel
          label="날짜"
          value={transactionInput.p_occurred_on}
          placeholder="날짜를 선택하세요"
          readonly
          onChange={() => {}}
          renderInput={(ref) => (
            <InputDate
              ref={ref}
              selectedDate={transactionInput.p_occurred_on}
              onChange={(occurred_on) =>
                setTransactionInput((prev) => ({
                  ...prev,
                  p_occurred_on: occurred_on,
                }))
              }
            />
          )}
        />

        <TransactionLabel
          label="카테고리"
          value={displayCategoryName}
          placeholder="카테고리를 선택하세요"
          onChange={() => {}}
          renderInput={(ref) => (
            <InputCategory
              ledgerId={ledgerId}
              flowType={transactionInput.p_flow_type ?? 'expense'}
              ref={ref}
              value={transactionInput.p_category_id}
              onChange={({ id, name }) => {
                setTransactionInput((prev) => ({
                  ...prev,
                  p_category_id: id,
                }));
                setDisplayCategoryName(name);
              }}
            />
          )}
        />

        <TransactionLabel
          label="거래처"
          value={transactionInput.p_merchant ?? ''}
          placeholder="거래처 이름을 입력하세요"
          onChange={(merchant) =>
            setTransactionInput((prev) => ({
              ...prev,
              p_merchant: merchant,
            }))
          }
        />

        <TransactionLabel
          label="메모"
          value={transactionInput.p_memo ?? ''}
          placeholder="메모를 입력하세요"
          onChange={(memo) =>
            setTransactionInput((prev) => ({
              ...prev,
              p_memo: memo,
            }))
          }
        />

        <TransactionLabel
          label="거래 수단"
          value={transactionInput.p_payment_method_id ?? ''}
          placeholder="거래 수단을 선택하세요"
          onChange={() => {}}
          renderInput={() => (
            <InputDate
              selectedDate={transactionInput.p_payment_method_id ?? ''}
              onChange={(payment_method_id) =>
                setTransactionInput((prev) => ({
                  ...prev,
                  p_payment_method_id: payment_method_id,
                }))
              }
            />
          )}
        />

        <BoxButton
          variant="primary"
          size="xlarge"
          onClick={() => {
            onSubmit(transactionInput);
          }}
        >
          저장하기
        </BoxButton>
      </Flex>
    </Dialog>
  );
};

export { TransactionOverlay };
