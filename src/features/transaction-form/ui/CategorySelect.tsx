import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { getListCategoriesQueryOptions } from '@/entities/category/apis/getListCategoriesQueryOptions';
import { SubcategorySelect } from '@/features/transaction-form/ui/SubcategorySelect';
import type { CategoryFlow } from '@/shared/apis/categories';
import { Flex } from '@/shared/ui/flex/Flex';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';
import { Select } from '@/shared/ui/select/Select';

interface CategorySelectProps {
  name: string;
  subcategoryName?: string;
  ledgerId: string;
  flowTypeFieldName: string;
  label?: string;
  required?: boolean;
}

const CategorySelect = ({
  name,
  subcategoryName = 'subcategoryId',
  ledgerId,
  flowTypeFieldName,
  label = '카테고리',
  required = false,
}: CategorySelectProps) => {
  const { control, watch, setValue } = useFormContext();
  const { error } = useFormField({ name });
  const flowType = watch(flowTypeFieldName) as CategoryFlow | undefined;

  const { data: allCategories } = useQuery(
    getListCategoriesQueryOptions({
      ledgerId,
      flowType: flowType || 'expense',
    })
  );

  // 상위 카테고리만 필터링 (parent_id가 null인 것들)
  const topCategories =
    allCategories?.filter((cat) => cat.parent_id === null) || [];

  const options = topCategories.map((category) => ({
    id: category.id,
    name: category.name,
  }));

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      <Flex gap="x3" alignItems="center">
        <div style={{ flex: 1 }}>
          <Controller
            name={name}
            control={control}
            render={({ field }) => (
              <Select
                value={field.value}
                onChange={(option) => {
                  field.onChange(option.id);
                  // 카테고리 변경 시 소분류 초기화
                  if (subcategoryName) {
                    setValue(subcategoryName, '');
                  }
                }}
                options={options}
                placeholder="카테고리 선택"
                name={name}
              />
            )}
          />
        </div>
        <div style={{ flex: 1 }}>
          <SubcategorySelect
            name={subcategoryName}
            ledgerId={ledgerId}
            flowTypeFieldName={flowTypeFieldName}
            categoryIdFieldName={name}
            placeholder="소분류 선택"
          />
        </div>
      </Flex>
    </FormField>
  );
};

export { CategorySelect };
