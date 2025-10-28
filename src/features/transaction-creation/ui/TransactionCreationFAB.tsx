import { vars } from '@/shared/lib/vanilla-extract/index.ts';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconPlus } from '@/shared/ui/icon/PlusIcon.tsx';
import * as css from './TransactionCreationFAB.css.ts';

interface Props {
  onClick: () => void;
}
const TransactionCreationFAB = ({ onClick }: Props) => {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      className={css.base}
      onClick={onClick}
    >
      <IconPlus size={48} color={vars.color.gray0} />
    </Flex>
  );
};

export { TransactionCreationFAB };
