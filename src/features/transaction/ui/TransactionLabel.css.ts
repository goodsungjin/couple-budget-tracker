import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const label = style([
  {
    width: '72px',
  },
]);

export const content = style({
  borderBottom: `1px solid ${vars.color.gray10}`,
});

export const input = style([
  vars.reset.input,
  vars.typography.body1,
  {
    flex: 1,
    color: vars.color.gray90,

    selectors: {
      '&::placeholder': {
        color: vars.color.gray50,
      },
    },
  },
]);
