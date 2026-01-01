import { style } from '@vanilla-extract/css';

export const label = style({
  display: 'inline-block',
  width: '72px',
  flexShrink: 0,
});

export const required = style({
  marginLeft: '4px',
  color: 'red',
});
