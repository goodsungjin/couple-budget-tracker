import * as css from './InputAmount.css';

interface Props {
  amount: number;
  onChange: (amount: number) => void;
}

const InputAmount = ({ amount, onChange }: Props) => {
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 숫자가 아닌 문자 제거
    const numericValue = e.target.value.replace(/[^0-9]/g, '');

    onChange(parseInt(numericValue));
  };

  return (
    <label htmlFor="amount" className={css.amountLabel}>
      <input
        type="text"
        inputMode="numeric"
        name="amount"
        placeholder="0"
        value={amount.toLocaleString()}
        onChange={handleAmountChange}
        className={css.amountInput}
      />
      원
    </label>
  );
};

export { InputAmount };
