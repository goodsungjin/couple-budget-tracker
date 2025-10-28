import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Flex } from '@/shared/ui/flex/Flex';
import { CalendarIcon } from '@/shared/ui/icon/CalendarIcon';
import * as css from './InputDate.css';

interface Props {
  selectedDate: string;
  onChange: (date: string) => void;
}

const InputDate = forwardRef<
  {
    onClick: () => void;
  },
  Props
>(({ selectedDate, onChange }, ref) => {
  const dateInputRef = useRef<HTMLInputElement>(null);

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleDisplayClick = () => {
    dateInputRef.current?.click();
    dateInputRef.current?.showPicker();
  };

  useImperativeHandle(ref, () => ({
    onClick: handleDisplayClick,
  }));

  return (
    <Flex
      alignItems="center"
      justifyContent="between"
      onClick={handleDisplayClick}
    >
      <CalendarIcon size={20} />

      <input
        ref={dateInputRef}
        type="date"
        value={selectedDate}
        onChange={handleDateChange}
        className={css.dateInput}
        tabIndex={-1}
      />
    </Flex>
  );
});

export { InputDate };
