import { useCallback, useRef, useState } from 'react';

interface SelectOption {
  id: string;
  name: string;
}

interface UseSelectOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (option: SelectOption) => void;
  options: SelectOption[];
}

export const useSelect = ({
  value: controlledValue,
  defaultValue,
  onChange,
  options,
}: UseSelectOptions) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<
    string | undefined
  >(defaultValue);
  const selectRef = useRef<HTMLSelectElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const selectedOption = options.find((opt) => opt.id === currentValue);

  const handleChange = useCallback(
    (option: SelectOption) => {
      if (!isControlled) {
        setUncontrolledValue(option.id);
      }
      onChange?.(option);
    },
    [isControlled, onChange]
  );

  const openSelect = useCallback(() => {
    try {
      selectRef.current?.focus();
      selectRef.current?.click();
      selectRef.current?.showPicker?.();
    } catch {}
  }, []);

  return {
    value: currentValue,
    selectedOption,
    onChange: handleChange,
    openSelect,
    selectRef,
  };
};
