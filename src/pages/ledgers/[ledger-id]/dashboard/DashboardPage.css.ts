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

export const dashboardContainer = style({
  overflowY: 'auto',
  overflowX: 'hidden',
  width: '100%',
  padding: '16px 0',
});

export const chartContainer = style({
  width: '100%',
  maxWidth: '800px',
  padding: '16px',
});

export const pieChartWrapper = style({
  width: '100%',
  minHeight: '300px',
});

export const barChartWrapper = style({
  width: '100%',
  minHeight: '300px',
});

export const kpiGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
  width: '100%',
  maxWidth: '800px',
  padding: '0 16px',
});

export const kpiCard = style({
  padding: '20px',
  borderRadius: '12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
});

export const kpiLabel = style({
  fontSize: '14px',
  fontWeight: 500,
});

export const kpiValue = style({
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '1.2',
});

export const deltaInfo = style({
  marginTop: '4px',
});

export const rateChartContainer = style({
  width: '100%',
  maxWidth: '800px',
  padding: '16px',
});

export const sectionTitle = style({
  marginBottom: '16px',
  fontSize: '18px',
  fontWeight: 600,
});

export const rateChartWrapper = style({
  width: '100%',
  minHeight: '200px',
  backgroundColor: vars.color.gray0,
  borderRadius: '12px',
  padding: '16px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
});

export const comparisonContainer = style({
  width: '100%',
  maxWidth: '800px',
  padding: '16px',
});

export const comparisonCards = style({
  width: '100%',
});

export const comparisonCard = style({
  padding: '16px',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
});

export const kpiValueText = style({
  fontSize: '24px',
  fontWeight: 700,
  lineHeight: '1.2',
});

export const deltaText = style({
  fontSize: '14px',
  fontWeight: 500,
});

export const comparisonValueText = style({
  fontSize: '20px',
  fontWeight: 700,
  lineHeight: '1.2',
});

export const comparisonLabelText = style({
  textAlign: 'right',
});
