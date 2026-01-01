import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { getListCategoriesQueryOptions } from '@/entities/category/apis/getListCategoriesQueryOptions';
import type { CategoryFlow } from '@/shared/apis/categories';
import { Select } from '@/shared/ui/select/Select';

interface SubcategorySelectProps {
  name: string;
  ledgerId: string;
  flowTypeFieldName: string;
  categoryIdFieldName: string;
  placeholder?: string;
}

const SubcategorySelect = ({
  name,
  ledgerId,
  flowTypeFieldName,
  categoryIdFieldName,
  placeholder = '소분류 선택',
}: SubcategorySelectProps) => {
  const { control, watch } = useFormContext();
  const flowType = watch(flowTypeFieldName) as CategoryFlow | undefined;
  const categoryId = watch(categoryIdFieldName) as string | undefined;

  const { data: allCategories } = useQuery(
    getListCategoriesQueryOptions({
      ledgerId,
      flowType: flowType || 'expense',
    })
  );

  // 선택된 카테고리의 소분류만 필터링
  const subcategories =
    allCategories?.filter((cat) => cat.parent_id === categoryId) || [];

  const options = subcategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Select
          value={field.value}
          onChange={(option) => field.onChange(option.id)}
          options={options}
          placeholder={placeholder}
          name={name}
        />
      )}
    />
  );
};

export { SubcategorySelect };
