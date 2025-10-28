import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const container = style({
  position: 'fixed',
  top: '0',
  left: '0',
  right: '0',
  zIndex: 1000,
  backgroundColor: vars.color.gray20,
  borderBottom: `1px solid ${vars.color.gray30}`,
  backdropFilter: 'blur(8px)',
});

export const offlineIcon = style({
  fontSize: '16px',
  animation: 'pulse 2s infinite',
});

export const syncingIcon = style({
  fontSize: '16px',
  animation: 'spin 1s linear infinite',
});

export const retryButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px 8px',
  borderRadius: '4px',
  transition: 'background-color 0.2s',
  ':hover': {
    backgroundColor: vars.color.red10,
  },
});
