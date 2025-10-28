import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const toastContainer = style({
  position: 'fixed',
  top: '20px',
  right: '20px',
  zIndex: 9999,
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const toast = style({
  padding: '12px 16px',
  borderRadius: '8px',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  minWidth: '300px',
  maxWidth: '400px',
  animation: 'slideIn 0.3s ease-out',
});

export const successToast = style({
  backgroundColor: vars.color.primary5,
  border: `1px solid ${vars.color.primary10}`,
  color: vars.color.primary50,
});

export const errorToast = style({
  backgroundColor: vars.color.primary5,
  border: `1px solid ${vars.color.red30}`,
  color: vars.color.red90,
});

export const infoToast = style({
  backgroundColor: vars.color.blue10,
  border: `1px solid ${vars.color.blue30}`,
  color: vars.color.blue90,
});

export const toastIcon = style({
  width: '20px',
  height: '20px',
  flexShrink: 0,
});

export const toastContent = style({
  flex: 1,
  fontSize: '14px',
  fontWeight: '500',
});

export const toastCloseButton = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: '4px',
  borderRadius: '4px',
  color: 'inherit',
  opacity: 0.7,
  transition: 'opacity 0.2s',
  ':hover': {
    opacity: 1,
  },
});
