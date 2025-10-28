import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
});

export const thumbnail = style({
  width: '44px',
  height: '44px',
  backgroundColor: vars.color.blue40,
  borderRadius: '50%',
});

export const ul = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const pencel = style({
  display: 'none',
  cursor: 'pointer',
});

export const li = style([
  {
    borderRadius: '8px',
    transition: 'background-color 0.2s ease',

    ':hover': {
      backgroundColor: vars.color.gray5,
      [`.${pencel}`]: {
        display: 'block',
      },
    },
  },
]);
