import { Flex } from '@/shared/ui/flex/Flex';
import { FormError } from '@/shared/ui/form/FormError';
import { FormLabel } from '@/shared/ui/form/FormLabel';
import * as css from './formField.css';

interface Props {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
  direction?: 'row' | 'column';
}

const FormField = ({
  label,
  htmlFor,
  required,
  error,
  children,
  direction = 'row',
}: Props) => {
  return (
    <Flex direction="column" gap="x2" className={css.field}>
      <Flex
        direction={direction}
        alignItems={direction === 'row' ? 'center' : 'start'}
        justifyContent={direction === 'row' ? 'between' : 'start'}
        gap={direction === 'row' ? 'x4' : 'x2'}
        className={css.container}
      >
        <FormLabel htmlFor={htmlFor} required={required}>
          {label}
        </FormLabel>
        <Flex direction="column" flex={1} gap="x1">
          {children}
          <FormError message={error} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export { FormField };
