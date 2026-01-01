import { forwardRef } from 'react';
import { Flex } from '@/shared/ui/flex/Flex';
import { ChevronDown } from '@/shared/ui/icon/ChevronDown';
import { useSelect } from '@/shared/ui/select/useSelect';
import * as css from './select.css';

interface SelectOption {
  id: string;
  name: string;
}

interface SelectProps {
  value?: string;
  defaultValue?: string;
  onChange?: (option: SelectOption) => void;
  options: SelectOption[];
  placeholder?: string;
  name?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    { value, defaultValue, onChange, options, placeholder, name },
    forwardedRef
  ) => {
    const {
      selectedOption,
      onChange: handleChange,
      openSelect,
      selectRef,
    } = useSelect({
      value,
      defaultValue,
      onChange,
      options,
    });

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      const option = options.find((opt) => opt.id === e.target.value);
      if (option) {
        handleChange(option);
      }
    };

    const displayValue = selectedOption?.name || '';

    return (
      <Flex
        alignItems="center"
        justifyContent="between"
        onClick={openSelect}
        className={css.trigger}
      >
        <span
          className={css.displayValue}
          data-placeholder={!selectedOption ? placeholder : undefined}
        >
          {displayValue || placeholder || ''}
        </span>
        <ChevronDown size={20} />
        <select
          ref={(node) => {
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
            selectRef.current = node;
          }}
          value={selectedOption?.id || ''}
          onChange={handleSelectChange}
          name={name}
          className={css.select}
          tabIndex={-1}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name}
            </option>
          ))}
        </select>
      </Flex>
    );
  }
);

Select.displayName = 'Select';

export { Select };
export type { SelectOption };
