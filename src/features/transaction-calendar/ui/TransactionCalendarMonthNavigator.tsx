import { vars } from '@/shared/lib/vanilla-extract';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { IconChevronRight } from '@/shared/ui/icon/IconChevronRight';
import { Text } from '@/shared/ui/text/Text';
import * as css from './TransactionCalendarMonthNavigator.css';

interface Props {
  onClickPrevious: () => void;
  onClickNext: () => void;
  month: number;
}

const TransactionCalendarMonthNavigator = ({
  onClickPrevious,
  onClickNext,
  month,
}: Props) => {
  return (
    <Flex alignItems="center" gap="x4">
      <button className={css.button} type="button" onClick={onClickPrevious}>
        <IconChevronLeft size={20} color={vars.color.gray90} />
      </button>

      <Text typography="h1Bold" color="gray90">
        {month}월
      </Text>

      <button className={css.button} type="button" onClick={onClickNext}>
        <IconChevronRight size={20} color={vars.color.gray90} />
      </button>
    </Flex>
  );
};

export { TransactionCalendarMonthNavigator };
