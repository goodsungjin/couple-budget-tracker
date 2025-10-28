import type { RecipeVariants } from '@vanilla-extract/recipes';
import type { BoxButtonVariants } from './BoxButton.css';
import * as css from './BoxButton.css';

interface Props extends BoxButtonVariants {
  children: React.ReactNode;
  onClick?: () => void;
  style?: 'fill' | 'outline';
  disabled?: boolean;
}

const BoxButton = ({
  children,
  onClick,
  style = 'fill',
  disabled = false,
  ...props
}: Props & Omit<RecipeVariants<typeof css.fillButton>, 'variant'>) => {
  const buttonClass =
    style === 'fill' ? css.fillButton(props) : css.outlineButton(props);

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export { BoxButton };
