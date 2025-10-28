import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style({
  width: '100%',
  height: '1px',
  backgroundColor: vars.color.gray10,
  border: 'none',
  margin: 0,
  padding: 0,
});
