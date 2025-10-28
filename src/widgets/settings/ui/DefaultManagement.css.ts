import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style([{}]);

export const body = style([
  {
    overflowY: 'auto',
  },
]);

export const footer = style([
  {
    height: '70px',
    width: '100%',
    borderTop: `1px solid ${vars.color.gray10}`,
  },
]);
