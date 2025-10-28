import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../lib/vanilla-extract';

export const base = recipe({
  base: {
    display: 'flex',
  },
  variants: {
    gap: vars.gap,
    position: {
      relative: {
        position: 'relative',
      },
      absolute: {
        position: 'absolute',
      },
      fixed: {
        position: 'fixed',
      },
      sticky: {
        position: 'sticky',
      },
      static: {
        position: 'static',
      },
    },
    direction: {
      row: {
        flexDirection: 'row',
      },
      column: {
        flexDirection: 'column',
      },
    },
    justifyContent: {
      unset: {
        justifyContent: 'unset',
      },
      start: {
        justifyContent: 'flex-start',
      },
      end: {
        justifyContent: 'flex-end',
      },
      center: {
        justifyContent: 'center',
      },
      between: {
        justifyContent: 'space-between',
      },
      around: {
        justifyContent: 'space-around',
      },
    },
    alignItems: {
      unset: {
        alignItems: 'unset',
      },
      start: {
        alignItems: 'flex-start',
      },
      end: {
        alignItems: 'flex-end',
      },
      center: {
        alignItems: 'center',
      },
      between: {
        alignItems: 'space-between',
      },
      around: {
        alignItems: 'space-around',
      },
    },
    wrap: {
      unset: {
        flexWrap: 'unset',
      },
      nowrap: {
        flexWrap: 'nowrap',
      },
      wrap: {
        flexWrap: 'wrap',
      },
      wrapReverse: {
        flexWrap: 'wrap-reverse',
      },
    },
  },
  defaultVariants: {
    direction: 'row',
    justifyContent: 'unset',
    alignItems: 'unset',
    wrap: 'nowrap',
  },
});
