import { Controller, useFormContext } from 'react-hook-form';
import { DatePicker } from '@/shared/ui/date-picker/DatePicker';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';

interface DatePickerFieldProps {
  name: string;
  label?: string;
  required?: boolean;
}

const DatePickerField = ({
  name,
  label = '날짜',
  required = false,
}: DatePickerFieldProps) => {
  const { control } = useFormContext();
  const { error } = useFormField({ name });

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <DatePicker
            value={field.value}
            onChange={field.onChange}
            placeholder="날짜를 선택하세요"
            name={name}
          />
        )}
      />
    </FormField>
  );
};

export { DatePickerField };
