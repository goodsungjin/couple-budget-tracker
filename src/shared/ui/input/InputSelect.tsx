import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Flex } from '@/shared/ui/flex/Flex';
import { ChevronDown } from '@/shared/ui/icon/ChevronDown';
import * as css from './InputSelect.css';

interface Props {
  onChange: (args: { id: string; name: string }) => void;
  value: string;
  options: { id: string; name: string }[];
}

const InputSelect = forwardRef<
  {
    onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  },
  Props
>(({ onChange, value, options }, ref) => {
  const inputRef = useRef<HTMLSelectElement>(null);

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange({
      id: e.target.value,
      name: e.target.options[e.target.selectedIndex].text,
    });
  };

  const handleDisplayClick = () => {
    inputRef.current?.focus();
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
        {options?.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    </Flex>
  );
});

export { InputSelect };
