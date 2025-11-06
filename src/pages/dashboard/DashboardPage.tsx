import { useQuery } from '@tanstack/react-query';
import { useOutletContext } from 'react-router';
import { getMonthKPIQueryOptions } from '@/entities/dashboard/api/getMonthKPIQueryOptions';
import { useCalendar } from '@/features/calendar/model/useCalendar';
import { vars } from '@/shared/lib/vanilla-extract';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { IconChevronRight } from '@/shared/ui/icon/IconChevronRight';
import { Text } from '@/shared/ui/text/Text';
import * as css from './DashboardPage.css';

const DashboardPage = () => {
  const { ledgerId } = useOutletContext<{ ledgerId: string }>();
  const { state, navigatePrevious, navigateNext } = useCalendar();
  const { data: monthKPI } = useQuery({
    ...getMonthKPIQueryOptions(
      ledgerId,
      state.currentDate.month() + 1,
      state.currentDate.year()
    ),
  });

  console.log('# monthKPI', monthKPI);

  return (
    <Flex
      direction="column"
      gap="x4"
      alignItems="center"
      justifyContent="center"
      flex={1}
    >
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

      <Flex direction="column" gap="x4">
        <Flex gap="x2">
          <Text typography="h2" color="gray90">
            총 지출 :
          </Text>
          <Text typography="h2" color="gray90">
            {monthKPI?.expense_total.toLocaleString()}
          </Text>
        </Flex>
        <Flex gap="x2">
          <Text typography="h2" color="gray90">
            총 수입 :
          </Text>
          <Text typography="h2" color="gray90">
            {monthKPI?.income_total.toLocaleString()}
          </Text>
        </Flex>
        <Flex gap="x2">
          <Text typography="h2" color="gray90">
            총 절약 :
          </Text>
          <Text typography="h2" color="gray90">
            {monthKPI?.saving_total.toLocaleString()}
          </Text>
        </Flex>
      </Flex>

      <Flex direction="column" gap="x4">
        <Text typography="h2" color="gray90">
          지출 증감률 :
        </Text>
        <Text typography="h2" color="gray90">
          {monthKPI?.expense_rate?.toLocaleString()}
        </Text>

        <Text typography="h2" color="gray90">
          절약 증감률 :
        </Text>
        <Text typography="h2" color="gray90">
          {monthKPI?.saving_rate?.toLocaleString()}
        </Text>
      </Flex>

      <Flex direction="column" gap="x4">
        <Text typography="h2" color="gray90">
          지난달보다 {monthKPI?.expense_delta?.toLocaleString()} 더 사용했어요
        </Text>
        <Text typography="h2" color="gray90">
          지난달보다 {monthKPI?.saving_delta?.toLocaleString()} 더 절약했어요
        </Text>
        <Text typography="h2" color="gray90">
          지난달보다 {monthKPI?.income_delta?.toLocaleString()} 더 수입했어요
        </Text>
      </Flex>
    </Flex>
  );
};

export { DashboardPage };
