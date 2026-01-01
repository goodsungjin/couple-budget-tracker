import { style } from '@vanilla-extract/css';
import { vars } from '@/shared/lib/vanilla-extract';

const baseInput = style([
  vars.reset.input,
  vars.typography.body1,
  {
    width: '100%',
    padding: '12px 4px',
    borderBottom: `1px solid ${vars.color.gray10}`,
    color: vars.color.gray90,
    selectors: {
      '&::placeholder': {
        color: vars.color.gray50,
      },
      '&:focus': {
        outline: 'none',
        borderBottomColor: vars.color.primary50,
      },
    },
  },
]);

export const input = baseInput;

export const textarea = style([
  baseInput,
  {
    resize: 'vertical',
    minHeight: '80px',
  },
]);
