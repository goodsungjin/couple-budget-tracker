import * as css from './TextField.css';

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  name: string;
  required: boolean;
  type:
    | 'text'
    | 'number'
    | 'email'
    | 'password'
    | 'tel'
    | 'url'
    | 'search'
    | 'date'
    | 'time'
    | 'datetime-local'
    | 'month'
    | 'week';
}

const TextField = ({
  value,
  onChange,
  placeholder,
  name,
  required,
  type,
}: Props) => {
  return (
    <input
      type={type}
      className={css.base}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      name={name}
      required={required}
    />
  );
};

export { TextField };
