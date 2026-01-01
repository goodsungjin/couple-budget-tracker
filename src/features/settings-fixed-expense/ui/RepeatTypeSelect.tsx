import { Controller, useFormContext } from 'react-hook-form';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';
import type { SelectOption } from '@/shared/ui/select/Select';
import { Select } from '@/shared/ui/select/Select';

interface RepeatTypeSelectProps {
  name: string;
  label?: string;
  required?: boolean;
}

const REPEAT_TYPE_OPTIONS: SelectOption[] = [
  { id: 'daily', name: '매일' },
  { id: 'weekly', name: '매주' },
  { id: 'monthly', name: '매월' },
  { id: 'yearly', name: '매년' },
];

const RepeatTypeSelect = ({
  name,
  label = '반복 주기',
  required = false,
}: RepeatTypeSelectProps) => {
  const { control } = useFormContext();
  const { error } = useFormField({ name });

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={(option) => {
              field.onChange(option.id);
            }}
            options={REPEAT_TYPE_OPTIONS}
            placeholder="반복 주기를 선택하세요"
            name={name}
          />
        )}
      />
    </FormField>
  );
};

export { RepeatTypeSelect };
