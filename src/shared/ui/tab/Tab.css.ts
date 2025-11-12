import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '@/shared/lib/vanilla-extract';

// Tab 컨테이너 스타일
export const tabContainer = style({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
});

// Tab 리스트 스타일
export const tabList = style({
  display: 'flex',
  borderBottom: `1px solid ${vars.color.gray20}`,
  gap: '0',
});

// Tab 버튼 기본 스타일
const baseTabButton = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '8px 4px',
  border: 'none',
  backgroundColor: 'transparent',
  cursor: 'pointer',
  position: 'relative',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
});

// Tab 버튼 variants
export const tabButton = recipe({
  base: [baseTabButton],
  variants: {
    variant: {
      default: [
        vars.typography.body2,
        {
          color: vars.color.gray60,
          ':hover': {
            color: vars.color.gray90,
            backgroundColor: vars.color.gray5,
          },
        },
      ],
      primary: [
        vars.typography.body2,
        {
          color: vars.color.gray60,
          ':hover': {
            color: vars.color.primary50,
            backgroundColor: vars.color.primary5,
          },
        },
      ],
    },
    isActive: {
      true: {},
      false: {},
    },
  },
  compoundVariants: [
    {
      variants: {
        variant: 'default',
        isActive: true,
      },
      style: {
        color: vars.color.gray90,
        fontWeight: 600,
        borderBottom: `2px solid ${vars.color.gray90}`,
      },
    },
    {
      variants: {
        variant: 'primary',
        isActive: true,
      },
      style: {
        color: vars.color.primary50,
        fontWeight: 600,
        borderBottom: `2px solid ${vars.color.primary50}`,
      },
    },
  ],
});

// Tab 패널 스타일
export const tabPanel = style({
  padding: '16px 0',
  width: '100%',
  overflow: 'hidden',
});

// Tab 패널 숨김/표시 스타일
export const tabPanelHidden = style({
  display: 'none',
});

export const tabPanelVisible = style({
  display: 'block',
});

// Tab 인디케이터 스타일 (선택적 사용)
export const tabIndicator = style({
  position: 'absolute',
  bottom: '-1px',
  left: 0,
  right: 0,
  height: '2px',
  backgroundColor: vars.color.primary50,
  transition: 'all 0.2s ease',
});

// Tab 크기 variants
export const tabSize = {
  small: style({
    padding: '8px 12px',
    fontSize: '12px',
  }),
  medium: style({
    padding: '12px 16px',
    fontSize: '14px',
  }),
  large: style({
    padding: '16px 20px',
    fontSize: '16px',
  }),
};
