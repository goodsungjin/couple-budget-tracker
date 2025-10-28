import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/lib/vanilla-extract';

export const input = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
});

export const label = recipe({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 12px',
    border: `1px solid ${vars.color.gray20}`,
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    backgroundColor: vars.color.gray0,
  },
  variants: {
    isActive: {
      true: {
        borderColor: vars.color.primary50,
      },
    },
  },
});
