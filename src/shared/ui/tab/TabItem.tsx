import * as css from './Tab.css';

export interface TabItemProps {
  id: string;
  label: string;
  disabled?: boolean;
  isActive?: boolean;
  variant?: 'default' | 'primary';
  onClick?: (tabId: string) => void;
}

const TabItem = ({
  id,
  label,
  disabled = false,
  isActive = false,
  variant = 'default',
  onClick,
}: TabItemProps) => {
  const handleClick = () => {
    if (disabled) return;
    onClick?.(id);
  };

  return (
    <button
      type="button"
      className={css.tabButton({
        variant,
        isActive,
      })}
      onClick={handleClick}
      disabled={disabled}
      aria-selected={isActive}
      role="tab"
      aria-controls={`tabpanel-${id}`}
    >
      {label}
    </button>
  );
};

export { TabItem };
