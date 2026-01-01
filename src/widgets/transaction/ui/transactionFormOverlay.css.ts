import { style } from '@vanilla-extract/css';

export const form = style({
  width: '100%',
  height: '100%',
});

export const container = style({
  maxHeight: '90vh',
  overflowY: 'auto',
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  lineHeight: 1,
});
