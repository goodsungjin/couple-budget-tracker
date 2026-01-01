import { Text } from '@/shared/ui/text/Text';
import * as css from './formLabel.css';

interface Props {
  children: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
}

const FormLabel = ({ children, htmlFor, required }: Props) => {
  return (
    <Text
      as="label"
      htmlFor={htmlFor}
      typography="body1"
      color="gray100"
      className={css.label}
    >
      {children}
      {required && <span className={css.required}>*</span>}
    </Text>
  );
};

export { FormLabel };
