import { style } from '@vanilla-extract/css';

export const base = style({
  position: 'relative',
});

export const slideContainer = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
});
