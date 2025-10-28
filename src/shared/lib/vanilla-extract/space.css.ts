import { style } from '@vanilla-extract/css';

// 기본 단위 4px를 기준으로 한 spacing 스케일
export const spacingScale = {
  x0_5: 2, // 4 * 0.5
  x1: 4, // 4 * 1
  x1_5: 6, // 4 * 1.5
  x2: 8, // 4 * 2
  x2_5: 10, // 4 * 2.5
  x3: 12, // 4 * 3
  x3_5: 14, // 4 * 3.5
  x4: 16, // 4 * 4
  x5: 20, // 4 * 5
  x6: 24, // 4 * 6
  x7: 28, // 4 * 7
  x8: 32, // 4 * 8
  x9: 36, // 4 * 9
  x10: 40, // 4 * 10
  x11: 44, // 4 * 11
  x12: 48, // 4 * 12
  x14: 56, // 4 * 14
  x16: 64, // 4 * 16
} as const;

// Margin atomic classes
export const margin = {
  x0_5: style({ margin: `${spacingScale.x0_5}px` }),
  x1: style({ margin: `${spacingScale.x1}px` }),
  x1_5: style({ margin: `${spacingScale.x1_5}px` }),
  x2: style({ margin: `${spacingScale.x2}px` }),
  x2_5: style({ margin: `${spacingScale.x2_5}px` }),
  x3: style({ margin: `${spacingScale.x3}px` }),
  x3_5: style({ margin: `${spacingScale.x3_5}px` }),
  x4: style({ margin: `${spacingScale.x4}px` }),
  x5: style({ margin: `${spacingScale.x5}px` }),
  x6: style({ margin: `${spacingScale.x6}px` }),
  x7: style({ margin: `${spacingScale.x7}px` }),
  x8: style({ margin: `${spacingScale.x8}px` }),
  x9: style({ margin: `${spacingScale.x9}px` }),
  x10: style({ margin: `${spacingScale.x10}px` }),
  x11: style({ margin: `${spacingScale.x11}px` }),
  x12: style({ margin: `${spacingScale.x12}px` }),
  x14: style({ margin: `${spacingScale.x14}px` }),
  x16: style({ margin: `${spacingScale.x16}px` }),
};

// Padding atomic classes
export const padding = {
  x0_5: style({ padding: `${spacingScale.x0_5}px` }),
  x1: style({ padding: `${spacingScale.x1}px` }),
  x1_5: style({ padding: `${spacingScale.x1_5}px` }),
  x2: style({ padding: `${spacingScale.x2}px` }),
  x2_5: style({ padding: `${spacingScale.x2_5}px` }),
  x3: style({ padding: `${spacingScale.x3}px` }),
  x3_5: style({ padding: `${spacingScale.x3_5}px` }),
  x4: style({ padding: `${spacingScale.x4}px` }),
  x5: style({ padding: `${spacingScale.x5}px` }),
  x6: style({ padding: `${spacingScale.x6}px` }),
  x7: style({ padding: `${spacingScale.x7}px` }),
  x8: style({ padding: `${spacingScale.x8}px` }),
  x9: style({ padding: `${spacingScale.x9}px` }),
  x10: style({ padding: `${spacingScale.x10}px` }),
  x11: style({ padding: `${spacingScale.x11}px` }),
  x12: style({ padding: `${spacingScale.x12}px` }),
  x14: style({ padding: `${spacingScale.x14}px` }),
  x16: style({ padding: `${spacingScale.x16}px` }),
};

// Gap atomic classes (for flexbox/grid)
export const gap = {
  x0_5: style({ gap: `${spacingScale.x0_5}px` }),
  x1: style({ gap: `${spacingScale.x1}px` }),
  x1_5: style({ gap: `${spacingScale.x1_5}px` }),
  x2: style({ gap: `${spacingScale.x2}px` }),
  x2_5: style({ gap: `${spacingScale.x2_5}px` }),
  x3: style({ gap: `${spacingScale.x3}px` }),
  x3_5: style({ gap: `${spacingScale.x3_5}px` }),
  x4: style({ gap: `${spacingScale.x4}px` }),
  x5: style({ gap: `${spacingScale.x5}px` }),
  x6: style({ gap: `${spacingScale.x6}px` }),
  x7: style({ gap: `${spacingScale.x7}px` }),
  x8: style({ gap: `${spacingScale.x8}px` }),
  x9: style({ gap: `${spacingScale.x9}px` }),
  x10: style({ gap: `${spacingScale.x10}px` }),
  x11: style({ gap: `${spacingScale.x11}px` }),
  x12: style({ gap: `${spacingScale.x12}px` }),
  x14: style({ gap: `${spacingScale.x14}px` }),
  x16: style({ gap: `${spacingScale.x16}px` }),
};
