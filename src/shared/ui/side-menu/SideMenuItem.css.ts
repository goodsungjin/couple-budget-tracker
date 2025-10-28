import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../lib/vanilla-extract';

export const base = recipe({
  base: [
    {
      cursor: 'pointer',
      borderRadius: '8px',
      transition: 'background-color 0.2s ease',
    },
    {
      ':hover': {
        backgroundColor: vars.color.gray10,
      },
    },
  ],
  variants: {
    isActive: {
      true: {
        backgroundColor: vars.color.gray10,
      },
    },
  },
});

export const label = style({
  whiteSpace: 'nowrap',
  paddingRight: '8px',
});

export const icon = style({
  flexShrink: 0,
});
