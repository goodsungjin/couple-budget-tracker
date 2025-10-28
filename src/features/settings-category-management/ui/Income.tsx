import { useQuery } from '@tanstack/react-query';
import { getListCategoriesQueryOptions } from '@/entities/category/apis/getListCategoriesQueryOptions';
import { AddButton } from '@/features/settings/ui/AddButton';
import { SettingsSharedList } from '@/features/settings/ui/SettingsSharedList';
import { Flex } from '@/shared/ui/flex/Flex';

interface Props {
  ledgerId: string;
  onAddCategory: () => void;
}
const Income = ({ ledgerId, onAddCategory }: Props) => {
  const { data: categories } = useQuery(
    getListCategoriesQueryOptions(ledgerId, { flowType: 'income' })
  );

  return (
    <Flex flex={1} gap="x6" direction="column">
      <AddButton onClick={onAddCategory}>카테고리 추가</AddButton>

      <SettingsSharedList
        list={categories?.map((category) => ({
          id: category.id,
          label: category.name,
          thumbnailUrl: 'category',
        }))}
      />
    </Flex>
  );
};

export { Income };
