import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const trigger = style({
  width: '100%',
  padding: '12px 4px',
  borderBottom: `1px solid ${vars.color.gray10}`,
  cursor: 'pointer',
  position: 'relative',
});

export const displayValue = style([
  vars.typography.body1,
  {
    flex: 1,
    color: vars.color.gray90,
    selectors: {
      '&[data-placeholder]': {
        color: vars.color.gray50,
      },
    },
  },
]);

export const dateInput = style({
  position: 'absolute',
  opacity: 0,
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
});
