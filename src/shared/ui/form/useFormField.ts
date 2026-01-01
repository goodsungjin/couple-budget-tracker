import { useFormContext } from 'react-hook-form';

interface UseFormFieldOptions {
  name: string;
}

export const useFormField = ({ name }: UseFormFieldOptions) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext();

  const error = errors[name];

  return {
    name,
    register,
    error: error?.message as string | undefined,
    control,
  };
};
