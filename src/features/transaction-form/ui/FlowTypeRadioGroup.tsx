import { Controller, useFormContext } from 'react-hook-form';
import type { FlowType } from '@/shared/apis/transaction';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';
import { RadioGroup } from '@/shared/ui/radio-group/RadioGroup';
import { RadioGroupItem } from '@/shared/ui/radio-group/RadioGroupItem';

interface FlowTypeRadioGroupProps {
  name: string;
  label?: string;
  required?: boolean;
}

const FLOW_TYPES: { value: FlowType; label: string }[] = [
  { value: 'income', label: '수입' },
  { value: 'expense', label: '지출' },
  { value: 'saving', label: '저축/투자' },
];

const FlowTypeRadioGroup = ({
  name,
  label = '분류',
  required = false,
}: FlowTypeRadioGroupProps) => {
  const { control } = useFormContext();
  const { error } = useFormField({ name });

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <RadioGroup
            name={name}
            value={field.value}
            onChange={field.onChange}
            direction="row"
            gap="x3"
          >
            {FLOW_TYPES.map((flowType) => (
              <RadioGroupItem
                key={flowType.value}
                value={flowType.value}
                label={flowType.label}
              />
            ))}
          </RadioGroup>
        )}
      />
    </FormField>
  );
};

export { FlowTypeRadioGroup };
