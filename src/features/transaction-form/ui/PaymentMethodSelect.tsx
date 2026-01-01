import { useQuery } from '@tanstack/react-query';
import { Controller, useFormContext } from 'react-hook-form';
import { getListPaymentMethodsQueryOptions } from '@/entities/payment-method/getListPaymentMethodsQueryOptions';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';
import { Select } from '@/shared/ui/select/Select';

interface PaymentMethodSelectProps {
  name: string;
  ledgerId: string;
  label?: string;
  required?: boolean;
}

const PaymentMethodSelect = ({
  name,
  ledgerId,
  label = '결제 수단',
  required = false,
}: PaymentMethodSelectProps) => {
  const { control } = useFormContext();
  const { error } = useFormField({ name });

  const { data: paymentMethods } = useQuery(
    getListPaymentMethodsQueryOptions(ledgerId)
  );

  const options =
    paymentMethods?.map((pm) => ({
      id: pm.id,
      name: pm.name,
    })) || [];

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select
            value={field.value}
            onChange={(option) => field.onChange(option.id)}
            options={options}
            placeholder="거래 수단을 선택하세요"
            name={name}
          />
        )}
      />
    </FormField>
  );
};

export { PaymentMethodSelect };
