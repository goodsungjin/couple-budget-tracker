import { useRadioGroupContext } from '@/shared/ui/radio-group/RadioGroup';
import { Text } from '@/shared/ui/text/Text';
import * as css from './radioGroupItem.css';

interface RadioGroupItemProps<T extends string> {
  value: T;
  label: string;
  disabled?: boolean;
}

const RadioGroupItem = <T extends string>({
  value,
  label,
  disabled = false,
}: RadioGroupItemProps<T>) => {
  const { value: selectedValue, onChange, name } = useRadioGroupContext();

  const isSelected = selectedValue === value;

  const handleClick = () => {
    if (!disabled) {
      onChange(value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
      e.preventDefault();
      onChange(value);
    }
  };

  return (
    <label
      className={css.label({ isActive: isSelected, disabled })}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={disabled ? -1 : 0}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => onChange(value)}
        disabled={disabled}
        className={css.input()}
        tabIndex={-1}
      />
      <Text typography="body1" color={isSelected ? 'primary50' : 'gray90'}>
        {label}
      </Text>
    </label>
  );
};

export { RadioGroupItem };
