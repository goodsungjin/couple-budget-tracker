import { useMemo } from 'react';
import type {
  CalendarDay,
  MonthCalendarData,
  WeekCalendarData,
} from '@/features/calendar/model/types';
import type { ListTxResponse } from '@/shared/apis/transaction';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './TransactionCalendarDays.css';

interface Props {
  transactions: ListTxResponse;
  calendarData: MonthCalendarData | WeekCalendarData;
  onClickDay: (date: string) => void;
}

const TransactionCalendarDays = ({
  transactions,
  onClickDay,
  calendarData,
}: Props) => {
  const map = useMemo(() => {
    return transactions?.reduce(
      (acc, transaction) => {
        const date = transaction.occurred_on;

        const income =
          transaction.flow_type === 'income' ? transaction.amount : 0;
        const expense =
          transaction.flow_type === 'expense' ? transaction.amount : 0;
        const saving =
          transaction.flow_type === 'saving' ? transaction.amount : 0;

        acc[date] = {
          income: (acc[date]?.income || 0) + income,
          expense: (acc[date]?.expense || 0) + expense,
          saving: (acc[date]?.saving || 0) + saving,
        };

        return acc;
      },
      {} as Record<string, { income: number; expense: number; saving: number }>
    );
  }, [transactions]);

  const weeks = useMemo(() => {
    const result: CalendarDay[][] = [];
    for (let i = 0; i < calendarData.days.length; i += 7) {
      result.push(calendarData.days.slice(i, i + 7));
    }
    return result;
  }, [calendarData.days]);

  return (
    <Flex className={css.base} direction="column" width="890px" height="680px">
      {weeks.map((week) => (
        <Flex
          flex={1}
          key={week.map((day) => day.date.toString()).join(',')}
          direction="row"
          className={css.week}
        >
          {week.map((day) => (
            <button
              key={day.date.toString()}
              type="button"
              className={css.day({
                isToday: day.isToday,
                isCurrentMonth: day.isCurrentMonth,
              })}
              onClick={() => onClickDay(day.date.format('YYYY-MM-DD'))}
              aria-label={`${day.date.format('YYYY년 M월 D일')} 선택`}
            >
              <Text
                typography="body1"
                color={
                  day.isCurrentMonth
                    ? day.date.day() === 0 // 일요일
                      ? 'red40'
                      : day.date.day() === 6 // 토요일
                        ? 'blue40'
                        : 'gray50' // 평일
                    : 'gray50'
                }
              >
                {day.date.format('D')}
              </Text>

              <Flex direction="column">
                {!!map?.[day.date.format('YYYY-MM-DD')]?.expense && (
                  <Text typography="body2" color="red50">
                    -
                    {map?.[
                      day.date.format('YYYY-MM-DD')
                    ]?.expense.toLocaleString()}
                  </Text>
                )}

                {!!map?.[day.date.format('YYYY-MM-DD')]?.income && (
                  <Text typography="body2" color="blue50">
                    +
                    {map?.[
                      day.date.format('YYYY-MM-DD')
                    ]?.income.toLocaleString()}
                  </Text>
                )}
              </Flex>
            </button>
          ))}
        </Flex>
      ))}
    </Flex>
  );
};

export { TransactionCalendarDays };
