import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style([
  {
    width: '68px',
    height: '68px',
    borderRadius: '50%',
    backgroundColor: vars.color.primary40,
    cursor: 'pointer',
  },
]);
