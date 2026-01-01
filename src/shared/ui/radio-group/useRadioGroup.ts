import { useCallback, useState } from 'react';

interface UseRadioGroupOptions<T> {
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
}

export const useRadioGroup = <T extends string>({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseRadioGroupOptions<T>) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<T | undefined>(
    defaultValue
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = useCallback(
    (newValue: T) => {
      if (!isControlled) {
        setUncontrolledValue(newValue);
      }
      onChange?.(newValue);
    },
    [isControlled, onChange]
  );

  return {
    value,
    onChange: handleChange,
  };
};
