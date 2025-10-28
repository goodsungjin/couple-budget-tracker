import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style({
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',
});

export const backdrop = style({
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  width: '100%',
  height: '100%',

  backgroundColor: 'rgba(30, 30, 30, 0.5)',
});

export const content = style([
  {
    borderRadius: '16px',
    boxShadow: '0px 6px 32px 0px rgba(0, 0, 0, 0.12)',
    backgroundColor: vars.color.gray0,
    overflow: 'hidden',
  },
]);
