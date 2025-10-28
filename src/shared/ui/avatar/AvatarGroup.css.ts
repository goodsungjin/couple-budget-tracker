import { style } from '@vanilla-extract/css';

export const container = style({
  position: 'relative',
});

const GAP = 16;
export const avatarWrapper = style({
  position: 'relative',
  selectors: {
    '&:first-child': {
      zIndex: 1,
    },
    '&:nth-child(2)': {
      position: 'absolute',
      left: `${GAP}px`,
      zIndex: 2,
    },
    '&:nth-child(3)': {
      position: 'absolute',
      left: `${GAP * 2}px`,
      zIndex: 3,
    },
  },
});

export const remainingCount = style({
  width: '24px',
  height: '24px',
  borderRadius: '50%',
  backgroundColor: '#6B7280',
  color: 'white',
  fontSize: '12px',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: '-8px',
  border: '2px solid white',
  zIndex: 0,
});
