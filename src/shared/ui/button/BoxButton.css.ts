import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/lib/vanilla-extract';

// 공통 기본 스타일
const baseStyles = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'none',
});

// 사이즈 variants
const sizeVariants = {
  size: {
    small: {
      padding: '6px 8px',
      borderRadius: '4px',
    },
    large: {
      padding: '8px 12px',
      borderRadius: '8px',
    },
    xlarge: {
      padding: '12px 16px',
      borderRadius: '6px',
    },
  },
};

export type BoxButtonVariants = {
  size: 'small' | 'large' | 'xlarge';
  variant: 'primary' | 'secondary';
};

// Fill 버튼 스타일
export const fillButton = recipe({
  base: [baseStyles],
  variants: {
    ...sizeVariants,
    variant: {
      primary: [
        vars.typography.body1,
        {
          backgroundColor: vars.color.primary50,
          color: vars.color.gray0,
        },
        {
          selectors: {
            '&:disabled': {
              backgroundColor: vars.color.primary10,
              color: vars.color.primary5,
            },
          },
        },
      ],
      secondary: [],
    },
  },
});

// Outline 버튼 스타일
export const outlineButton = recipe({
  base: [
    baseStyles,
    {
      backgroundColor: 'transparent',
    },
  ],
  variants: {
    ...sizeVariants,
    variant: {
      secondary: [
        vars.typography.description,
        {
          border: `1px solid ${vars.color.gray20}`,
          color: vars.color.gray90,
        },
      ],
      primary: [],
    },
  },
});
