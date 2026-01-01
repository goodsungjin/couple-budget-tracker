import { Controller, useFormContext } from 'react-hook-form';
import { FormError } from '@/shared/ui/form/FormError';
import { useFormField } from '@/shared/ui/form/useFormField';
import { Text } from '@/shared/ui/text/Text';
import * as css from './amountInput.css';

interface AmountInputProps {
  name: string;
  required?: boolean;
}

const AmountInput = ({ name, required = false }: AmountInputProps) => {
  const { control } = useFormContext();
  const { error } = useFormField({ name });

  return (
    <div className={css.container}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const handleAmountChange = (
            e: React.ChangeEvent<HTMLInputElement>
          ) => {
            const numericValue = e.target.value.replace(/[^0-9]/g, '');
            field.onChange(numericValue ? parseInt(numericValue, 10) : 0);
          };

          return (
            <>
              <label htmlFor={name} className={css.amountLabel}>
                <input
                  {...field}
                  id={name}
                  type="text"
                  inputMode="numeric"
                  placeholder="금액을 입력하세요"
                  value={field.value ? field.value.toLocaleString() : ''}
                  onChange={handleAmountChange}
                  className={css.amountInput}
                />
                <span className={css.unit}>원</span>
              </label>
              <FormError message={error} />
            </>
          );
        }}
      />
    </div>
  );
};

export { AmountInput };
