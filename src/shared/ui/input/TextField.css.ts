import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style([
  vars.typography.body1,
  {
    width: '100%',
    height: '100%',
    border: `1px solid ${vars.color.gray20}`,
    borderRadius: '8px',
    padding: '12px 16px',

    color: vars.color.gray90,
  },
]);
