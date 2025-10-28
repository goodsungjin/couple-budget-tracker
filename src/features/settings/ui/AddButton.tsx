import * as css from './AddButton.css';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
}

const AddButton = ({ onClick, children }: Props) => {
  return (
    <button type="button" onClick={onClick} className={css.base}>
      {children}
    </button>
  );
};

export { AddButton };
