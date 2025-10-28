import { useEffect, useMemo } from 'react';
import type { CalendarDay } from '@/features/calendar/model/types';
import { useCalendar } from '@/features/calendar/model/useCalendar';
import type { ListTxResponse } from '@/shared/apis/transaction';
import { vars } from '@/shared/lib/vanilla-extract';
import { Flex } from '@/shared/ui/flex/Flex';
import { Float } from '@/shared/ui/float/Float';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { IconChevronRight } from '@/shared/ui/icon/IconChevronRight';
import { Text } from '@/shared/ui/text/Text';
import * as css from './TransactionCalendarView.css';

interface Props {
  onChangeDate: (args: { from: string; to: string }) => void;
  transactions: ListTxResponse;
  onClickDay: (date: string) => void;
}
const TransactionCalendarView = ({
  onChangeDate,
  transactions,
  onClickDay,
}: Props) => {
  const { calendarData, navigatePrevious, navigateNext, state } = useCalendar();

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

  const weeks = useMemo(
    () =>
      calendarData.days.reduce((acc, day) => {
        const week = day.date.week();
        if (!acc[week]) {
          acc[week] = [];
        }
        acc[week].push(day);
        return acc;
      }, [] as CalendarDay[][]),
    [calendarData.days]
  );

  useEffect(() => {
    onChangeDate({
      from: calendarData.firstDay.format('YYYY-MM-DD'),
      to: calendarData.lastDay.format('YYYY-MM-DD'),
    });
  }, [calendarData, onChangeDate]);

  return (
    <div className={css.base}>
      <Float placement="top-left" offsetY={'calc(-100% - 16px)'} offsetX="0">
        <Flex alignItems="center" gap="x4">
          <button
            className={css.navigationButton}
            type="button"
            onClick={navigatePrevious}
          >
            <IconChevronLeft size={20} color={vars.color.gray90} />
          </button>

          <Text typography="h1Bold" color="gray90">
            {state.currentDate.month() + 1}월
          </Text>

          <button
            className={css.navigationButton}
            type="button"
            onClick={navigateNext}
          >
            <IconChevronRight size={20} color={vars.color.gray90} />
          </button>
        </Flex>
      </Float>

      <Flex direction="column" width="890px" height="680px">
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
                className={css.day({ isToday: day.isToday })}
                onClick={() => onClickDay(day.date.format('YYYY-MM-DD'))}
                aria-label={`${day.date.format('YYYY년 M월 D일')} 선택`}
              >
                <Text typography="body1" color="gray90">
                  {day.date.format('D')}
                </Text>

                <Flex direction="column">
                  {!!map?.[day.date.format('YYYY-MM-DD')]?.expense && (
                    <Text typography="body2" color="red40">
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
    </div>
  );
};

export { TransactionCalendarView };
