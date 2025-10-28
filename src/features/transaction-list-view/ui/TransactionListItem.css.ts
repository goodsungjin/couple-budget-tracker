import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const thumbnail = style({
  width: '46px',
  height: '46px',
  backgroundColor: vars.color.blue40,
  borderRadius: '50%',
});
