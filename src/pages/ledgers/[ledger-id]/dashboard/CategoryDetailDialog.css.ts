import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const dialogContent = style({
  width: '90vw',
  maxWidth: '600px',
  maxHeight: '80vh',
  height: '80vh',
  backgroundColor: vars.color.gray0,
  borderRadius: '16px',
  padding: '24px',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
});

export const closeButton = style([
  vars.reset.button,
  {
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    fontSize: '20px',
    color: vars.color.gray70,
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
      backgroundColor: vars.color.gray10,
    },
  },
]);

export const listContainer = style({
  flex: 1,
  overflowY: 'auto',
  minHeight: 0,
  overflowX: 'hidden',
});

export const contentWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  minHeight: 0,
  gap: '16px',
});

export const headerWrapper = style({
  flexShrink: 0,
});
