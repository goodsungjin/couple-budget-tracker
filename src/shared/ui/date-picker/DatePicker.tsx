import { forwardRef } from 'react';
import { useDatePicker } from '@/shared/ui/date-picker/useDatePicker';
import { Flex } from '@/shared/ui/flex/Flex';
import { CalendarIcon } from '@/shared/ui/icon/CalendarIcon';
import * as css from './datePicker.css';

interface DatePickerProps {
  value?: string;
  defaultValue?: string;
  onChange?: (date: string) => void;
  placeholder?: string;
  name?: string;
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(
  ({ value, defaultValue, onChange, placeholder, name }, forwardedRef) => {
    const {
      value: currentValue,
      onChange: handleChange,
      openDatePicker,
      dateInputRef,
    } = useDatePicker({
      value,
      defaultValue,
      onChange,
    });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleChange(e.target.value);
    };

    return (
      <Flex
        alignItems="center"
        justifyContent="between"
        onClick={openDatePicker}
        className={css.trigger}
      >
        <span
          className={css.displayValue}
          data-placeholder={!currentValue ? placeholder : undefined}
        >
          {currentValue || placeholder || ''}
        </span>
        <CalendarIcon size={20} />
        <input
          ref={(node) => {
            if (typeof forwardedRef === 'function') {
              forwardedRef(node);
            } else if (forwardedRef) {
              forwardedRef.current = node;
            }
            dateInputRef.current = node;
          }}
          type="date"
          value={currentValue || ''}
          onChange={handleDateChange}
          name={name}
          className={css.dateInput}
          tabIndex={-1}
        />
      </Flex>
    );
  }
);

DatePicker.displayName = 'DatePicker';

export { DatePicker };
