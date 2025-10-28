import { style } from '@vanilla-extract/css';

const h1Bold = style({
  fontWeight: 700,
  fontSize: '26px',
  lineHeight: '120%',
  letterSpacing: '0%',
});

const h1Regular = style({
  fontWeight: 700,
  fontSize: '24px',
  lineHeight: '120%',
  letterSpacing: '0%',
});

const h2 = style({
  fontWeight: 400,
  fontStyle: 'normal',
  fontSize: '24px',
  lineHeight: '120%',
  letterSpacing: '0%',
});

const subHeading1Bold = style({
  fontWeight: 700,
  fontSize: '20px',
  lineHeight: '120%',
  letterSpacing: '0%',
});

const subHeading2Bold = style({
  fontWeight: 700,
  fontSize: '18px',
  lineHeight: '140%',
  letterSpacing: '0%',
});
const subHeading2 = style({
  fontWeight: 500,
  fontSize: '18px',
  lineHeight: '140%',
  letterSpacing: '0%',
});

const body1Bold = style({
  fontWeight: 700,
  fontSize: '16px',
  lineHeight: '140%',
  letterSpacing: '0%',
});

const body1 = style({
  fontWeight: 400,
  fontSize: '16px',
  lineHeight: '140%',
  letterSpacing: '0%',
});

const body2 = style({
  fontWeight: 400,
  fontSize: '14px',
  lineHeight: '140%',
  letterSpacing: '0%',
});

const description = style({
  fontWeight: 400,
  fontSize: '12px',
  lineHeight: '140%',
  letterSpacing: '0%',
});

export const typography = {
  h1Bold,
  h1Regular,
  h2,
  subHeading1Bold,
  subHeading2Bold,
  subHeading2,
  body1Bold,
  body1,
  body2,
  description,
};
