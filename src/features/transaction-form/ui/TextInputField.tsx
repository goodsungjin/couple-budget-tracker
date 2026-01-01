import { useFormContext } from 'react-hook-form';
import { FormField } from '@/shared/ui/form/FormField';
import { useFormField } from '@/shared/ui/form/useFormField';
import * as css from './textInputField.css';

interface TextInputFieldProps {
  name: string;
  label: string;
  placeholder?: string;
  required?: boolean;
  multiline?: boolean;
}

const TextInputField = ({
  name,
  label,
  placeholder,
  required = false,
  multiline = false,
}: TextInputFieldProps) => {
  const { register } = useFormContext();
  const { error } = useFormField({ name });

  return (
    <FormField label={label} htmlFor={name} required={required} error={error}>
      {multiline ? (
        <textarea
          {...register(name)}
          id={name}
          placeholder={placeholder}
          className={css.textarea}
        />
      ) : (
        <input
          {...register(name)}
          id={name}
          type="text"
          placeholder={placeholder}
          className={css.input}
        />
      )}
    </FormField>
  );
};

export { TextInputField };
