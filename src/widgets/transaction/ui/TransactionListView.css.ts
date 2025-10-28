import { style } from '@vanilla-extract/css';

export const container = style({
  overflowY: 'auto',
  width: '420px',
  height: '100%',
});

export const base = style([
  {
    height: '100%',
  },
]);
