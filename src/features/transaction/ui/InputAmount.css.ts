import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const amountLabel = style([
  vars.typography.h1Bold,
  {
    padding: '12px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${vars.color.primary50}`,
  },
]);

export const amountInput = style([
  vars.reset.input,
  {
    flex: 1,
  },
]);
