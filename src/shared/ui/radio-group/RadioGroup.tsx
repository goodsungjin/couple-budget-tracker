import { createContext, useContext } from 'react';
import { Flex } from '@/shared/ui/flex/Flex';
import { useRadioGroup } from '@/shared/ui/radio-group/useRadioGroup';

interface RadioGroupContextValue<T extends string> {
  value?: T;
  onChange: (value: T) => void;
  name: string;
}

const RadioGroupContext = createContext<
  RadioGroupContextValue<string> | undefined
>(undefined);

interface RadioGroupProps<T extends string> {
  children: React.ReactNode;
  value?: T;
  defaultValue?: T;
  onChange?: (value: T) => void;
  name: string;
  direction?: 'row' | 'column';
  gap?: string;
}

const RadioGroup = <T extends string>({
  children,
  value,
  defaultValue,
  onChange,
  name,
  direction = 'row',
  gap = 'x3',
}: RadioGroupProps<T>) => {
  const { value: currentValue, onChange: handleChange } = useRadioGroup({
    value,
    defaultValue,
    onChange,
  });

  return (
    <RadioGroupContext.Provider
      value={{
        value: currentValue,
        onChange: () => handleChange,
        name,
      }}
    >
      <Flex direction={direction} gap={'x3'}>
        {children}
      </Flex>
    </RadioGroupContext.Provider>
  );
};

const useRadioGroupContext = () => {
  const context = useContext(RadioGroupContext);
  if (!context) {
    throw new Error('RadioGroupItem must be used within RadioGroup');
  }
  return context;
};

export { RadioGroup, useRadioGroupContext };
