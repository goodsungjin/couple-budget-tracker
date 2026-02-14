import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useOutletContext } from 'react-router';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getMonthKPIQueryOptions } from '@/entities/dashboard/api/getMonthKPIQueryOptions';
import { useCalendar } from '@/features/calendar/model/useCalendar';
import { categoryExpenseBreakdown } from '@/shared/apis/dashboard';
import { vars } from '@/shared/lib/vanilla-extract';
import { Flex } from '@/shared/ui/flex/Flex';
import { IconChevronLeft } from '@/shared/ui/icon/IconChevronLeft';
import { IconChevronRight } from '@/shared/ui/icon/IconChevronRight';
import { Text } from '@/shared/ui/text/Text';
import { CategoryDetailDialog } from './CategoryDetailDialog';
import * as css from './DashboardPage.css';
import { FixedExpenseList } from './FixedExpenseList';

const DashboardPage = () => {
  const { ledgerId } = useOutletContext<{ ledgerId: string }>();
  const { state, navigatePrevious, navigateNext } = useCalendar();
  const from = state.currentDate.clone().startOf('month').format('YYYY-MM-DD');
  const to = state.currentDate
    .clone()
    .add(1, 'month')
    .startOf('month')
    .format('YYYY-MM-DD');

  const [selectedCategory, setSelectedCategory] = useState<{
    id: string;
    name: string;
    level: string;
  } | null>(null);

  const { data: monthKPI } = useSuspenseQuery(
    getMonthKPIQueryOptions(ledgerId, from, to, true)
  );
  const { data: dataCategoryExpenseBreakdown } = useQuery({
    queryKey: ['dashboard', 'category-expense-breakdown', ledgerId, from, to],
    queryFn: () =>
      categoryExpenseBreakdown({
        from,
        to,
        ledgerId,
        includeScheduled: true,
        level: 'parent',
      }),
  });

  console.log('# dataCategoryExpenseBreakdown', dataCategoryExpenseBreakdown);

  // 차트 데이터 변환
  type CategoryExpenseItem = {
    group_name: string;
    amount_total: number;
    amount_posted: number;
    amount_scheduled: number;
    group_emoji?: string;
    group_id: string;
    group_level: string;
    scheduled_count: number;
    tx_count: number;
  };

  const chartData =
    dataCategoryExpenseBreakdown?.map((item: CategoryExpenseItem) => {
      console.log('# chartData item:', {
        group_id: item.group_id,
        group_name: item.group_name,
        group_level: item.group_level,
        tx_count: item.tx_count,
      });
      return {
        name: item.group_name || '기타',
        value: Number(item.amount_total || 0),
        categoryId: item.group_id,
        categoryName: item.group_name || '기타',
        categoryLevel: item.group_level,
      };
    }) || [];

  const handleChartClick = (data: {
    categoryId: string;
    categoryName: string;
    categoryLevel?: string;
  }) => {
    setSelectedCategory({
      id: data.categoryId,
      name: data.categoryName,
      level: data.categoryLevel || 'leaf',
    });
  };

  // 차트 색상 팔레트
  const CHART_COLORS = [
    vars.color.primary40,
    vars.color.blue40,
    vars.color.red40,
    vars.color.primary30,
    vars.color.blue30,
    vars.color.red30,
    vars.color.primary50,
    vars.color.blue50,
    vars.color.red50,
  ];

  // 금액 포맷팅 함수
  const formatCurrency = (value: number) => {
    return value?.toLocaleString();
  };

  // KPI 요약 데이터
  const kpiSummaryData = [
    {
      name: '지출',
      value: monthKPI?.expense ?? 0,
      color: vars.color.red40,
      bgColor: vars.color.red5,
    },
    {
      name: '수입',
      value: monthKPI?.income ?? 0,
      color: vars.color.blue40,
      bgColor: vars.color.blue5,
    },
    {
      name: '절약',
      value: monthKPI?.saving ?? 0,
      color: vars.color.primary40,
      bgColor: vars.color.primary5,
    },
  ];

  return (
    <Flex
      direction="column"
      gap="x4"
      alignItems="center"
      justifyContent="start"
      flex={1}
      className={css.dashboardContainer}
    >
      <Flex alignItems="center" gap="x4">
        <button
          className={css.navigationButton}
          type="button"
          onClick={navigatePrevious}
        >
          <IconChevronLeft size={20} color={vars.color.gray90} />
        </button>

        <Text typography="h1Bold" color="gray90">
          {state.currentDate.month() + 1}월
        </Text>

        <button
          className={css.navigationButton}
          type="button"
          onClick={navigateNext}
        >
          <IconChevronRight size={20} color={vars.color.gray90} />
        </button>
      </Flex>

      {/* KPI 카드 그리드 */}
      <div className={css.kpiGrid}>
        {kpiSummaryData.map((item) => (
          <div
            key={item.name}
            className={css.kpiCard}
            style={{ backgroundColor: item.bgColor }}
          >
            <Text typography="body2" color="gray70" className={css.kpiLabel}>
              총{item.name}
            </Text>
            <p className={css.kpiValue} style={{ color: item.color }}>
              {formatCurrency(item.value)}원
            </p>
          </div>
        ))}
      </div>

      {chartData.length > 0 && (
        <Flex direction="column" gap="x4" className={css.chartContainer}>
          <Text typography="h2" color="gray90">
            카테고리별 지출
          </Text>
          <div className={css.pieChartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) =>
                    `${name}: ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                  onClick={(_, index) => {
                    const clickedData = chartData[index];
                    if (clickedData) {
                      handleChartClick({
                        categoryId: clickedData.categoryId,
                        categoryName: clickedData.categoryName,
                        categoryLevel: clickedData.categoryLevel,
                      });
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  {chartData.map((item, index) => (
                    <Cell
                      key={`cell-${item.name}-${index}`}
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: vars.color.gray0,
                    border: `1px solid ${vars.color.gray20}`,
                    borderRadius: '8px',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className={css.barChartWrapper}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  tick={{ fontSize: 12 }}
                />
                <YAxis tickFormatter={formatCurrency} />
                <Tooltip
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{
                    backgroundColor: vars.color.gray0,
                    border: `1px solid ${vars.color.gray20}`,
                    borderRadius: '8px',
                  }}
                />
                <Bar
                  dataKey="value"
                  fill={vars.color.primary40}
                  onClick={(data: unknown, index: number) => {
                    if (
                      typeof data === 'object' &&
                      data !== null &&
                      index !== undefined
                    ) {
                      const clickedData = chartData[index];
                      if (clickedData) {
                        handleChartClick({
                          categoryId: clickedData.categoryId,
                          categoryName: clickedData.categoryName,
                          categoryLevel: clickedData.categoryLevel,
                        });
                      }
                    }
                  }}
                  style={{ cursor: 'pointer' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Flex>
      )}

      <FixedExpenseList
        ledgerId={ledgerId}
        year={state.currentDate.year()}
        month={state.currentDate.month() + 1}
      />

      {selectedCategory && (
        <CategoryDetailDialog
          isOpen={!!selectedCategory}
          onClose={() => setSelectedCategory(null)}
          ledgerId={ledgerId}
          categoryId={selectedCategory.id}
          categoryName={selectedCategory.name}
          categoryLevel={selectedCategory.level}
          from={from}
          to={to}
        />
      )}
    </Flex>
  );
};

export { DashboardPage };
