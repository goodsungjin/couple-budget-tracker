import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/lib/vanilla-extract';

export const container = style({
  width: '100%',
  maxWidth: '800px',
  padding: '16px',
});

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '12px',
});

export const card = recipe({
  base: {
    padding: '16px',
    borderRadius: '12px',
    border: `1px solid ${vars.color.gray20}`,
    backgroundColor: vars.color.gray0,
    transition: 'all 0.2s',
    ':hover': {
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transform: 'translateY(-2px)',
    },
  },
  variants: {
    status: {
      posted: {
        borderColor: vars.color.primary30,
        backgroundColor: vars.color.primary5,
      },
      scheduled: {
        borderColor: vars.color.blue30,
        backgroundColor: vars.color.blue5,
      },
      skipped: {
        borderColor: vars.color.gray30,
        backgroundColor: vars.color.gray5,
        opacity: 0.6,
      },
      pending: {
        borderColor: vars.color.gray20,
        backgroundColor: vars.color.gray0,
      },
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});

export const emoji = style({
  fontSize: '24px',
  lineHeight: 1,
});

export const statusBadge = recipe({
  base: {
    padding: '4px 8px',
    borderRadius: '6px',
    fontSize: '12px',
    fontWeight: 500,
  },
  variants: {
    status: {
      posted: {
        backgroundColor: vars.color.primary20,
        color: vars.color.primary70,
      },
      scheduled: {
        backgroundColor: vars.color.blue20,
        color: vars.color.blue70,
      },
      skipped: {
        backgroundColor: vars.color.gray20,
        color: vars.color.gray60,
      },
      pending: {
        backgroundColor: vars.color.gray10,
        color: vars.color.gray70,
      },
    },
  },
  defaultVariants: {
    status: 'pending',
  },
});
