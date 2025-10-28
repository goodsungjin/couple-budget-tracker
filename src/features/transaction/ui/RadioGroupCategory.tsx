import type { FlowType } from '@/shared/apis/transaction';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './RadioGroupCategory.css';

const FLOW_TYPES: { value: FlowType; label: string }[] = [
  { value: 'income', label: '수입' },
  { value: 'saving', label: '저축/투자' },
  { value: 'expense', label: '지출' },
];

interface Props {
  selectedFlowType: FlowType;
  onChange: (value: FlowType) => void;
}

const RadioGroupCategory = ({ selectedFlowType, onChange }: Props) => {
  const handleCategoryKeyDown = (e: React.KeyboardEvent, value: FlowType) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onChange(value);
    }
  };
  return (
    <Flex alignItems="center" gap="x3">
      <Text typography="body1" color="gray100">
        분류
      </Text>

      <Flex gap="x3">
        {FLOW_TYPES.map((flowType) => (
          <label
            key={flowType.value}
            className={css.label({
              isActive: selectedFlowType === flowType.value,
            })}
            onClick={() => onChange(flowType.value)}
            onKeyDown={(e) => handleCategoryKeyDown(e, flowType.value)}
          >
            <input
              type="radio"
              name="flowType"
              value={flowType.value}
              checked={selectedFlowType === flowType.value}
              onChange={() => onChange(flowType.value)}
              className={css.input}
            />

            <Text
              typography="body1"
              color={
                selectedFlowType === flowType.value ? 'primary50' : 'gray90'
              }
            >
              {flowType.label}
            </Text>
          </label>
        ))}
      </Flex>
    </Flex>
  );
};

export { RadioGroupCategory };
