import { useCallback, useRef, useState } from 'react';

interface UseDatePickerOptions {
  value?: string;
  defaultValue?: string;
  onChange?: (date: string) => void;
}

export const useDatePicker = ({
  value: controlledValue,
  defaultValue,
  onChange,
}: UseDatePickerOptions) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<
    string | undefined
  >(defaultValue);
  const dateInputRef = useRef<HTMLInputElement>(null);

  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = useCallback(
    (date: string) => {
      if (!isControlled) {
        setUncontrolledValue(date);
      }
      onChange?.(date);
    },
    [isControlled, onChange]
  );

  const openDatePicker = useCallback(() => {
    dateInputRef.current?.click();
    dateInputRef.current?.showPicker?.();
  }, []);

  return {
    value: currentValue,
    onChange: handleChange,
    openDatePicker,
    dateInputRef,
  };
};
