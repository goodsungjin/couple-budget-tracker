import { cn } from '@/shared/utils/combineClassName';
import { vars } from '../../lib/vanilla-extract';

interface Props {
  children: React.ReactNode;
  typography: keyof typeof vars.typography;
  color: keyof typeof vars.color;
  className?: string;
}

const Text = ({ children, typography, color, className }: Props) => {
  return (
    <p
      className={cn(vars.typography[typography], className)}
      style={{ color: vars.color[color] }}
    >
      {children}
    </p>
  );
};

export { Text };
