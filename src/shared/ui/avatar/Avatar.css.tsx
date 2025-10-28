import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';

export const base = recipe({
  base: {
    borderRadius: '50%',
    overflow: 'hidden',
  },
  variants: {
    size: {
      small: {
        width: '24px',
        height: '24px',
      },
      medium: {
        width: '32px',
        height: '32px',
      },
      large: {
        width: '40px',
        height: '40px',
      },
    },
  },
});

export const image = style({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});
