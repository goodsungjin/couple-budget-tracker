import { cn } from '@/shared/utils/combineClassName';
import { vars } from '../../lib/vanilla-extract';

interface Props {
  children: React.ReactNode;
  typography: keyof typeof vars.typography;
  color: keyof typeof vars.color;
  className?: string;
  as?: 'p' | 'span' | 'label';
  htmlFor?: string;
}

const Text = ({
  children,
  typography,
  color,
  className,
  as = 'p',
  htmlFor,
}: Props) => {
  const Component = as;

  return (
    <Component
      className={cn(vars.typography[typography], className)}
      style={{ color: vars.color[color] }}
      htmlFor={htmlFor}
    >
      {children}
    </Component>
  );
};

export { Text };
