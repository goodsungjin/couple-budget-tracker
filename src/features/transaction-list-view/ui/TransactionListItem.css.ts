import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/lib/vanilla-extract';

export const thumbnail = recipe({
  base: {
    width: '46px',
    height: '46px',
    backgroundColor: vars.color.blue40,
    borderRadius: '50%',
    fontSize: '24px',
  },
  variants: {
    flowType: {
      income: {
        backgroundColor: 'rgba(205, 219, 243, 1)',
      },
      saving: {
        backgroundColor: 'rgba(205, 219, 243, 1)',
      },
      expense: {
        backgroundColor: 'rgba(243, 215, 215, 1)',
      },
    },
  },
  defaultVariants: {
    flowType: 'income',
  },
});
