import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

export const container = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
});

export const title = style({
  marginBottom: '4px',
});

export const amountLabel = style([
  vars.typography.h1Bold,
  {
    padding: '12px 4px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottom: `1px solid ${vars.color.primary50}`,
    width: '100%',
  },
]);

export const amountInput = style([
  vars.reset.input,
  {
    flex: 1,
    border: 'none',
    outline: 'none',
  },
]);

export const unit = style({
  marginLeft: '8px',
});
