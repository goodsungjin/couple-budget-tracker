import { Text } from '@/shared/ui/text/Text';
import * as css from './formError.css';

interface Props {
  message?: string;
}

const FormError = ({ message }: Props) => {
  if (!message) {
    return null;
  }

  return (
    <Text typography="description" color="red5" className={css.error}>
      {message}
    </Text>
  );
};

export { FormError };
