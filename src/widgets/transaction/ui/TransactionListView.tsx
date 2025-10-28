import dayjs from 'dayjs';
import { useMemo } from 'react';
import { TransactionListItem } from '@/features/transaction-list-view/ui/TransactionListItem';
import type { ListTxResponse } from '@/shared/apis/transaction';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './TransactionListView.css';

interface Props {
  transactions: ListTxResponse;
}
const TransactionListView = ({ transactions }: Props) => {
  const grouped = useMemo(() => {
    const res = transactions.reduce<{
      ids: string[];
      map: Record<string, typeof transactions>;
    }>(
      (acc, tx) => {
        const date = tx.occurred_on;
        if (!acc.map[date]) {
          acc.map[date] = [];
          acc.ids.push(date);
        }
        acc.map[date].push(tx);
        return acc;
      },
      { ids: [], map: {} }
    );
    res.ids.sort((a, b) => b.localeCompare(a));
    return res;
  }, [transactions]);

  return (
    <div className={css.container}>
      <Flex direction="column" gap="x6" className={css.base}>
        {grouped.ids.map((date) => (
          <Flex key={date} direction="column" gap="x1">
            <Text typography="body2" color="gray60">
              {dayjs(date).daysInMonth()
                ? dayjs(date).format('D일 dddd')
                : dayjs(date).format('M월 D일 dddd')}
            </Text>

            <Flex direction="column" gap="x2">
              {grouped.map[date].map((transaction) => (
                <TransactionListItem
                  category={transaction.category_name}
                  key={transaction.id}
                  paymentMethod={transaction.payment_method_name}
                  merchant={transaction.merchant}
                  flowType={transaction.flow_type}
                  amount={transaction.amount}
                  createdBy={transaction.created_by_name}
                />
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </div>
  );
};

export { TransactionListView };
