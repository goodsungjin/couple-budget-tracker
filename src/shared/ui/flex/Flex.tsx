import type { RecipeVariants } from '@vanilla-extract/recipes';
import { spacingScale } from '../../lib/vanilla-extract/space.css.ts';
import { cn } from '../../utils/combineClassName';
import * as css from './Flex.css.ts';

type Props = RecipeVariants<typeof css.base> & {
  children: React.ReactNode;
  className?: string;
  px?: keyof typeof spacingScale;
  py?: keyof typeof spacingScale;
  flex?: number;
  height?: string;
  width?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
};

const Flex = ({
  children,
  className,
  px,
  py,
  flex,
  height,
  width,
  onClick,
  ...props
}: Props) => {
  return (
    <div
      className={cn(css.base(props), className)}
      onClick={onClick}
      style={{
        paddingLeft: px ? spacingScale[px] : undefined,
        paddingRight: px ? spacingScale[px] : undefined,
        paddingTop: py ? spacingScale[py] : undefined,
        paddingBottom: py ? spacingScale[py] : undefined,
        flex: flex ? flex : undefined,
        height: height ? height : undefined,
        width: width ? width : undefined,
      }}
    >
      {children}
    </div>
  );
};

export { Flex };
