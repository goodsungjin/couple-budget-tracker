import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';
import { Select } from '@/shared/ui/select/Select';

interface DayOfMonthSelectProps {
  name: string;
  label?: string;
  required?: boolean;
}

const DAY_OPTIONS = Array.from({ length: 31 }, (_, index) => ({
  id: (index + 1).toString(),
  name: (index + 1).toString(),
}));

const DayOfMonthSelect = ({
  name,
  label = '반복 일',
  required = false,
}: DayOfMonthSelectProps) => {
  const { control } = useFormContext();
  const { error } = useFormField({ name });

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value?.toString()}
            onChange={(option) => {
              field.onChange(Number(option.id));
            }}
            options={DAY_OPTIONS}
            placeholder="반복 일을 선택하세요"
            name={name}
          />
        )}
      />
    </FormField>
  );
};

export { DayOfMonthSelect };

