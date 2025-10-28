import type { RecipeVariants } from '@vanilla-extract/recipes';
import { cn } from '@/shared/utils/combineClassName';
import * as css from './Float.css';

interface Props {
  children: React.ReactNode;
  className?: string;
  offsetX?: string;
  offsetY?: string;
}
const Float = ({
  children,
  placement,
  position,
  className,
  offsetX,
  offsetY,
}: Props & RecipeVariants<typeof css.base>) => {
  return (
    <div
      className={cn(css.base({ placement, position }), className)}
      style={{
        transform:
          offsetX && offsetY ? `translate(${offsetX}, ${offsetY})` : undefined,
      }}
    >
      {children}
    </div>
  );
};

export { Float };
