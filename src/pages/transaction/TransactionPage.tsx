import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getListTransactionQueryOptions } from '@/entities/transactions/api/getListTransactionQueryOptions';
import { useCreateTransaction } from '@/entities/transactions/hooks/useCreateTransaction';
import { useCalendar } from '@/features/calendar/model/useCalendar';
import { TransactionCalendarDays } from '@/features/transaction-calendar/ui/TransactionCalendarDays';
import { TransactionCalendarMonthNavigator } from '@/features/transaction-calendar/ui/TransactionCalendarMonthNavigator';
import { TransactionCreationFAB } from '@/features/transaction-creation/ui/TransactionCreationFAB';
import type { CreateTxArgs } from '@/shared/apis/transaction';
import { Flex } from '@/shared/ui/flex/Flex';
import { Float } from '@/shared/ui/float/Float';
import { OfflineIndicator } from '@/shared/ui/offline-indicator/OfflineIndicator';
import { useToast } from '@/shared/ui/toast/ToastProvider';
import { TransitionRenderer } from '@/shared/ui/transition/TransitionRenderer';
import { BatchTransactionOverlay } from '@/widgets/transaction/ui/BatchTransactionOverlay';
import { TransactionListView } from '@/widgets/transaction/ui/TransactionListView';
import { TransactionOverlay } from '@/widgets/transaction/ui/TransactionOverlay';
import * as css from './TransactionPage.css';

interface Props {
  ledgerId: string;
}
const TransactionPage = ({ ledgerId }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [defaultTransactionInput, setDefaultTransactionInput] = useState<Omit<
    CreateTxArgs,
    'p_ledger_id'
  > | null>(null);
  const [isBatchOpen, setIsBatchOpen] = useState(false);
  const { showToast } = useToast();

  const { calendarData, navigatePrevious, navigateNext, state } = useCalendar();
  const { data: transactions } = useQuery({
    ...getListTransactionQueryOptions({
      ledgerId,
      from: calendarData.days[0].date.format('YYYY-MM-DD'),
      to: calendarData.days[calendarData.days.length - 1].date.format(
        'YYYY-MM-DD'
      ),
    }),
    enabled: !!(
      calendarData.days[0].date &&
      calendarData.days[calendarData.days.length - 1].date
    ),
  });
  const { mutate: mutateCreateTransaction } = useCreateTransaction({
    ledgerId,
    onSuccess: () => {
      setIsOpen(false);
      showToast('success', '거래 내역이 성공적으로 추가되었습니다!');
    },
    onError: (error) => {
      console.error('Transaction 생성 실패:', error);
      showToast('error', '거래 내역 추가에 실패했습니다. 다시 시도해주세요.');
    },
  });

  return (
    <>
      <Flex className={css.base} direction="column" flex={1} gap="x4">
        <TransactionCalendarMonthNavigator
          month={state.currentDate.month() + 1}
          onClickNext={navigateNext}
          onClickPrevious={navigatePrevious}
        />

        <Flex gap="x10" className={css.body}>
          <TransactionCalendarDays
            calendarData={calendarData}
            transactions={transactions ?? []}
            onClickDay={(date) => {
              setDefaultTransactionInput(() => ({
                p_ledger_id: ledgerId,
                p_flow_type: 'expense',
                p_occurred_on: date,
                p_amount: 0,
                p_category_id: '',
                p_memo: '',
                p_merchant: '',
              }));
              setIsOpen(true);
            }}
          />
          <TransactionListView transactions={transactions ?? []} />
        </Flex>

        <Float placement="bottom-right" offsetY="-60px" offsetX="-40px">
          <TransactionCreationFAB onClick={() => setIsOpen(true)} />
        </Float>
      </Flex>

      <TransitionRenderer isOpen={isOpen} animationType="fade">
        <TransactionOverlay
          defaultTransactionInput={defaultTransactionInput}
          onClose={() => setIsOpen(false)}
          ledgerId={ledgerId}
          onSubmit={(transaction) => {
            mutateCreateTransaction({
              ...transaction,
              p_ledger_id: ledgerId,
            });
          }}
        />
      </TransitionRenderer>

      <BatchTransactionOverlay
        onClose={() => setIsBatchOpen(false)}
        ledgerId={ledgerId}
        isOpen={isBatchOpen}
        onSubmit={(transactions) => {
          // 배치 업데이트는 BatchTransactionOverlay 내부에서 처리
          console.log('Batch transactions:', transactions);
        }}
      />
      <OfflineIndicator ledgerId={ledgerId} />
    </>
  );
};

export { TransactionPage };
