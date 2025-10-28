import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/lib/vanilla-extract';

export const base = style({
  position: 'relative',
});

export const week = style({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  height: '100%',
});

export const day = recipe({
  base: [
    vars.reset.button,
    {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'start',
      gap: '16px',
      height: '100%',
      paddingTop: '24px',
      borderRadius: '16px',
    },
  ],
  variants: {
    isToday: {
      true: {
        backgroundColor: vars.color.primary5,
      },
      false: {},
    },
  },
  defaultVariants: {
    isToday: false,
  },
});

export const navigationButton = style([vars.reset.button]);
