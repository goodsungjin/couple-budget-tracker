import { useQuery } from '@tanstack/react-query';
import { forwardRef, useImperativeHandle, useRef } from 'react';
import { getListCategoriesQueryOptions } from '@/entities/category/apis/getListCategoriesQueryOptions';
import type { CategoryFlow } from '@/shared/apis/categories';
import { Flex } from '@/shared/ui/flex/Flex';
import { ChevronDown } from '@/shared/ui/icon/ChevronDown';
import * as css from './InputCategory.css';

interface Props {
  onChange: (args: { id: string; name: string }) => void;
  value: string;
  ledgerId: string;
  flowType: CategoryFlow;
}

const InputCategory = forwardRef<
  {
    onClick: () => void;
  },
  Props
>(({ onChange, value, flowType, ledgerId }, ref) => {
  const { data: categories } = useQuery(
    getListCategoriesQueryOptions({ ledgerId, flowType })
  );
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleDisplayClick = () => {
    inputRef.current?.click?.();
    inputRef.current?.showPicker?.();
  };

  useImperativeHandle(ref, () => ({
    onClick: handleDisplayClick,
  }));

  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      onClick={handleDisplayClick}
    >
      <ChevronDown size={20} />

      <select
        ref={inputRef}
        value={value}
        defaultValue={value}
        onChange={handleOnChange}
        className={css.base}
        tabIndex={-1}
      >
        {categories?.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </Flex>
  );
});

export { InputCategory };
