import { useQuery } from '@tanstack/react-query';
import { AddButton } from '@/features/settings/ui/AddButton';
import { SettingsSharedList } from '@/features/settings/ui/SettingsSharedList';
import { listRecurringSeries } from '@/shared/apis/recurringTransaction';
import { Flex } from '@/shared/ui/flex/Flex';

interface Props {
  ledgerId: string;
  onAddFixedExpense: () => void;
  onEditFixedExpense?: (seriesId: string) => void;
}
const SettingsFixedExpenseAllTab = ({
  ledgerId,
  onAddFixedExpense,
  onEditFixedExpense,
}: Props) => {
  const { data: recurringSeries } = useQuery({
    queryKey: ['recurringSeries', 'list', ledgerId],
    queryFn: () => listRecurringSeries({ ledgerId }),
  });

  return (
    <Flex flex={1} gap="x6" direction="column" height="100%">
      <AddButton onClick={onAddFixedExpense}>고정 내역 추가</AddButton>

      <SettingsSharedList
        list={recurringSeries?.map((item) => ({
          id: item.id,
          label: item.name,
          thumbnail: item.category_emoji,
        }))}
        onClick={onEditFixedExpense}
      />
    </Flex>
  );
};

export { SettingsFixedExpenseAllTab };
