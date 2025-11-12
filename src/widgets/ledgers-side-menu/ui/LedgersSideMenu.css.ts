import { style } from '@vanilla-extract/css';

export const base = style([
  {
    height: '100%',
    width: '88px',
    padding: '24px',
    position: 'relative',
  },
]);

export const motion = style([
  {
    height: '100%',

    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',

    overflow: 'hidden',
    pointerEvents: 'all',
  },
]);
