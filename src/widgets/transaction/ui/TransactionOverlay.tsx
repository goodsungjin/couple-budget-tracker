import { useState } from 'react';
import { InputAmount } from '@/features/transaction/ui/InputAmount';
import { InputCategory } from '@/features/transaction/ui/InputCategory';
import { InputDate } from '@/features/transaction/ui/InputDate';
import { RadioGroupCategory } from '@/features/transaction/ui/RadioGroupCategory';
import { TransactionLabel } from '@/features/transaction/ui/TransactionLabel';
import { BoxButton } from '@/shared/ui/button/BoxButton';
import { Dialog } from '@/shared/ui/dialog/Dialog';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import type { TransactionInput } from '@/widgets/transaction/model/type';

interface Props {
  ledgerId: string;
  onSubmit: (transaction: TransactionInput) => void;
  onClose: () => void;
  defaultTransactionInput: TransactionInput | null;
  onDelete: (id: string) => void;
}
const TransactionOverlay = ({
  ledgerId,
  onSubmit,
  onClose,
  defaultTransactionInput,
  onDelete,
}: Props) => {
  const [transactionInput, setTransactionInput] = useState<TransactionInput>(
    defaultTransactionInput ?? {
      amount: 0,
      categoryId: '',
      date: '',
      memo: '',
      title: '',
      flowType: 'expense',
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
          amount={transactionInput.amount}
          onChange={(amount) =>
            setTransactionInput((prev) => ({
              ...prev,
              amount,
            }))
          }
        />

        <RadioGroupCategory
          selectedFlowType={transactionInput.flowType ?? 'expense'}
          onChange={(flowType) =>
            setTransactionInput((prev) => ({
              ...prev,
              flowType,
            }))
          }
        />

        <TransactionLabel
          label="날짜"
          value={transactionInput.date}
          placeholder="날짜를 선택하세요"
          readonly
          onChange={() => {}}
          renderInput={(ref) => (
            <InputDate
              ref={ref}
              selectedDate={transactionInput.date}
              onChange={(date) =>
                setTransactionInput((prev) => ({
                  ...prev,
                  date,
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
              flowType={transactionInput.flowType ?? 'expense'}
              ref={ref}
              value={transactionInput.categoryId}
              onChange={({ id, name }) => {
                setTransactionInput((prev) => ({
                  ...prev,
                  categoryId: id,
                }));
                setDisplayCategoryName(name);
              }}
            />
          )}
        />

        <TransactionLabel
          label="거래처"
          value={transactionInput.title ?? ''}
          placeholder="거래처 이름을 입력하세요"
          onChange={(title) =>
            setTransactionInput((prev) => ({
              ...prev,
              title,
            }))
          }
        />

        <TransactionLabel
          label="메모"
          value={transactionInput.memo ?? ''}
          placeholder="메모를 입력하세요"
          onChange={(memo) =>
            setTransactionInput((prev) => ({
              ...prev,
              memo,
            }))
          }
        />

        <TransactionLabel
          label="거래 수단"
          value={transactionInput.paymentMethodId ?? ''}
          placeholder="거래 수단을 선택하세요"
          onChange={() => {}}
          renderInput={() => (
            <InputDate
              selectedDate={transactionInput.paymentMethodId ?? ''}
              onChange={(paymentMethodId) =>
                setTransactionInput((prev) => ({
                  ...prev,
                  paymentMethodId,
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

        <BoxButton
          variant="secondary"
          size="xlarge"
          onClick={() => {
            onDelete(transactionInput.id ?? '');
          }}
        >
          삭제하기
        </BoxButton>
      </Flex>
    </Dialog>
  );
};

export { TransactionOverlay };
