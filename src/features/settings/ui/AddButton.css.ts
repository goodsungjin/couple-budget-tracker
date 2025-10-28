import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style([
  vars.typography.body1,
  {
    width: '100%',
    border: `1px dashed ${vars.color.gray30}`,
    borderRadius: '8px',
    padding: '12px 0',
    backgroundColor: 'transparent',
    color: vars.color.gray60,
  },
  {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
]);
