import { useRef } from 'react';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './TransactionLabel.css';

interface Props {
  label: string;
  value: string;
  placeholder: string;
  readonly?: boolean;
  onChange: (value: string) => void;
  renderInput?: (
    ref: React.RefObject<{
      onClick: () => void;
    }>
  ) => React.ReactNode;
}

const TransactionLabel = ({
  label,
  value,
  placeholder,
  readonly,
  onChange,
  renderInput,
}: Props) => {
  const ref = useRef<{
    onClick: () => void;
  }>({
    onClick: () => {},
  });

  return (
    <Flex alignItems="center" justifyContent="between">
      <Text className={css.label} typography="body1" color="gray100">
        {label}
      </Text>

      <Flex
        justifyContent="between"
        alignItems="center"
        className={css.content}
        flex={1}
        py="x3"
        px="x1"
        gap="x2"
        onClick={ref.current.onClick}
      >
        <input
          className={css.input}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          readOnly={readonly}
        />

        {renderInput && <div>{renderInput(ref)}</div>}
      </Flex>
    </Flex>
  );
};

export { TransactionLabel };
