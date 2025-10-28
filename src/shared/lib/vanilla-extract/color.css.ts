import { createVar, style } from '@vanilla-extract/css';

// CSS 변수 정의 - 번들 사이즈 최적화를 위해 개별 변수로 분리
const primary5 = createVar();
const primary10 = createVar();
const primary20 = createVar();
const primary30 = createVar();
const primary40 = createVar();
const primary50 = createVar();
const primary60 = createVar();
const primary70 = createVar();
const primary80 = createVar();
const primary90 = createVar();

const red5 = createVar();
const red10 = createVar();
const red20 = createVar();
const red30 = createVar();
const red40 = createVar();
const red50 = createVar();
const red60 = createVar();
const red70 = createVar();
const red80 = createVar();
const red90 = createVar();

const blue5 = createVar();
const blue10 = createVar();
const blue20 = createVar();
const blue30 = createVar();
const blue40 = createVar();
const blue50 = createVar();
const blue60 = createVar();
const blue70 = createVar();
const blue80 = createVar();
const blue90 = createVar();

const gray0 = createVar();
const gray5 = createVar();
const gray10 = createVar();
const gray20 = createVar();
const gray30 = createVar();
const gray40 = createVar();
const gray50 = createVar();
const gray60 = createVar();
const gray70 = createVar();
const gray80 = createVar();
const gray90 = createVar();
const gray100 = createVar();

// CSS 변수 값 설정을 위한 글로벌 스타일
export const colorVars = style({
  vars: {
    [primary5]: '#F5FDF7',
    [primary10]: '#D1F4D9',
    [primary20]: '#AEEBBB',
    [primary30]: '#79DE8F',
    [primary40]: '#28A443',
    [primary50]: '#1C732F',
    [primary60]: '#19682A',
    [primary70]: '#145221',
    [primary80]: '#0D3415',
    [primary90]: '#09230E',

    [red5]: '#FEFAFB',
    [red10]: '#FBE7E9',
    [red20]: '#F6C9CE',
    [red30]: '#EFA7AE',
    [red40]: '#E96263',
    [red50]: '#DB3243',
    [red60]: '#A81D2B',
    [red70]: '#8B1924',
    [red80]: '#5B1018',
    [red90]: '#3E0B10',

    [blue5]: '#F9FBFF',
    [blue10]: '#E1ECFD',
    [blue20]: '#BDD6FA',
    [blue30]: '#92BDF8',
    [blue40]: '#5E9CF4',
    [blue50]: '#0E61D3',
    [blue60]: '#0C52B3',
    [blue70]: '#0A4494',
    [blue80]: '#072B5F',
    [blue90]: '#041D41',

    [gray0]: '#FFFFFF',
    [gray5]: '#F8F8F8',
    [gray10]: '#EAEAEA',
    [gray20]: '#D8D8D8',
    [gray30]: '#BABABA',
    [gray40]: '#AAAAAA',
    [gray50]: '#9B9B9B',
    [gray60]: '#666666',
    [gray70]: '#565656',
    [gray80]: '#474747',
    [gray90]: '#2D2D2D',
    [gray100]: '#1E1E1E',
  },
});

// 기존 호환성을 위한 객체 (선택적 사용)
export const color = {
  primary5,
  primary10,
  primary20,
  primary30,
  primary40,
  primary50,
  primary60,
  primary70,
  primary80,
  primary90,
  red5,
  red10,
  red20,
  red30,
  red40,
  red50,
  red60,
  red70,
  red80,
  red90,
  blue5,
  blue10,
  blue20,
  blue30,
  blue40,
  blue50,
  blue60,
  blue70,
  blue80,
  blue90,
  gray0,
  gray5,
  gray10,
  gray20,
  gray30,
  gray40,
  gray50,
  gray60,
  gray70,
  gray80,
  gray90,
  gray100,
} as const;
