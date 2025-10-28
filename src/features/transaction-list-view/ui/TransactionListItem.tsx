import { useMemo } from 'react';
import type { FlowType } from '@/shared/apis/transaction';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './TransactionListItem.css';

interface Props {
  merchant: string;
  flowType: FlowType;
  amount: number;
  createdBy: string;
  category: string;
  paymentMethod: string;
}

const TransactionListItem = ({
  merchant,
  flowType,
  amount,
  createdBy,
  category,
  paymentMethod,
}: Props) => {
  const tags = useMemo(() => {
    const result = [];

    if (category) {
      result.push(category);
    }

    if (createdBy) {
      result.push(createdBy);
    }

    if (paymentMethod) {
      result.push(paymentMethod);
    }

    return result;
  }, [category, createdBy, paymentMethod]);

  return (
    <Flex alignItems="center" justifyContent="between" gap="x4" py="x3" px="x2">
      <Flex alignItems="center" gap="x3" flex={1}>
        <Flex
          justifyContent="center"
          alignItems="center"
          className={css.thumbnail}
        >
          {category?.slice?.(0, 2).toUpperCase()}
        </Flex>

        <Flex direction="column" gap="x0_5">
          <Text typography="body1" color="gray90">
            {merchant}
          </Text>

          <Flex gap="x1_5">
            {tags.map((tag, index) => (
              <Text key={tag} typography="description" color="gray90">
                {index > 0 && '| '}
                {tag}
              </Text>
            ))}
          </Flex>
        </Flex>
      </Flex>

      <Text typography="subHeading2Bold" color="gray90">
        {flowType === 'income' ? '+' : '-'}
        {amount.toLocaleString()}원
      </Text>
    </Flex>
  );
};

export { TransactionListItem };
