import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: vars.color.gray0,
});

export const header = style({
  padding: '16px 0',
  borderBottom: `1px solid ${vars.color.gray20}`,
});

export const section = style({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
});

export const backButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '32px',
  height: '32px',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',

  ':hover': {
    backgroundColor: vars.color.gray10,
  },
});

export const backIcon = style({
  transform: 'rotate(90deg)',
  width: '20px',
  height: '20px',
  color: vars.color.gray60,
});

export const submitButton = style({
  width: '100%',
  marginTop: '8px',
});
