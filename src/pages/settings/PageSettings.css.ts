import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';
import { spacingScale } from '@/shared/lib/vanilla-extract/space.css';

export const base = style([
  {
    width: '740px',
    height: '628px',
  },
]);

export const side = style([
  {
    height: '100%',
    width: '152px',
    backgroundColor: vars.color.gray5,
  },
]);

export const sideItem = style([
  {
    borderRadius: '8px',
    padding: `${spacingScale.x2}px ${spacingScale.x4}px`,
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    gap: spacingScale.x1_5,
    width: '100%',
  },
]);

export const body = style([{}]);

export const bodyContent = style([
  {
    overflowY: 'auto',
  },
]);
