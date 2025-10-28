import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const container = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: vars.color.gray10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
});

export const errorIcon = style({
  fontSize: '64px',
  opacity: 0.7,
});

export const errorDetails = style({
  backgroundColor: vars.color.red10,
  border: `1px solid ${vars.color.red30}`,
  borderRadius: '8px',
  padding: '16px',
  maxWidth: '600px',
  maxHeight: '300px',
  overflow: 'auto',
});

export const errorStack = style({
  fontSize: '12px',
  fontFamily: 'monospace',
  color: vars.color.red80,
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
  margin: 0,
  padding: '8px 0',
});
