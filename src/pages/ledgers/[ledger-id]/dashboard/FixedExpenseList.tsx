import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { getListOccurrencesMonthAutoQueryOptions } from '@/entities/recurring-transaction/apis/getListOccurrencesMonthAutoQueryOptions';
import { listCategories } from '@/shared/apis/categories';
import { Flex } from '@/shared/ui/flex/Flex';
import { Text } from '@/shared/ui/text/Text';
import * as css from './FixedExpenseList.css';

interface Props {
  ledgerId: string;
  year: number;
  month: number;
}

const FixedExpenseList = ({ ledgerId, year, month }: Props) => {
  const { data: occurrences, isLoading: isLoadingOccurrences } = useQuery(
    getListOccurrencesMonthAutoQueryOptions({
      ledgerId,
      year,
      month,
    })
  );

  const { data: categories, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['category', 'list', ledgerId, 'all'],
    queryFn: () => listCategories(ledgerId, { includeInactive: false }),
  });

  // 카테고리 정보를 맵으로 변환
  const categoryMap = useMemo(() => {
    const map = new Map();
    if (categories) {
      for (const cat of categories) {
        map.set(cat.id, cat);
      }
    }
    return map;
  }, [categories]);

  // 지출(expense)만 필터링하고 카테고리 정보 추가
  const expenseOccurrences = useMemo(() => {
    if (!occurrences || !categories) return [];
    return occurrences
      .map((occ) => {
        const category = categoryMap.get(occ.category_id);
        // 카테고리의 flow_type 확인 (parent 카테고리 확인)
        const parentCategory = category?.parent_id
          ? categoryMap.get(category.parent_id)
          : category;
        const flowType = parentCategory?.flow_type || category?.flow_type;

        return {
          ...occ,
          category_emoji: category?.emoji || '💰',
          flow_type: flowType,
          // resolved_amount가 있으면 사용, 없으면 amount 사용
          displayAmount: occ.resolved_amount ?? occ.amount ?? 0,
        };
      })
      .filter((occ) => occ.flow_type === 'expense');
  }, [occurrences, categories, categoryMap]);

  // 합계 금액 계산
  const totalAmount = useMemo(() => {
    return expenseOccurrences.reduce((sum, occ) => {
      return sum + (occ.displayAmount ?? 0);
    }, 0);
  }, [expenseOccurrences]);

  if (isLoadingOccurrences || isLoadingCategories) {
    return null;
  }

  console.log('FixedExpenseList - occurrences:', occurrences);
  console.log('FixedExpenseList - categories:', categories);
  console.log('FixedExpenseList - expenseOccurrences:', expenseOccurrences);

  if (!expenseOccurrences || expenseOccurrences.length === 0) {
    return null;
  }

  return (
    <Flex direction="column" gap="x4" className={css.container}>
      <Flex alignItems="center" justifyContent="between">
        <Text typography="h2" color="gray90">
          고정 지출
        </Text>
        <Text typography="subHeading1Bold" color="gray90">
          합계: {totalAmount.toLocaleString()}원
        </Text>
      </Flex>
      <div className={css.grid}>
        {expenseOccurrences.map((occurrence) => {
          const isPosted = occurrence.status === 'posted';
          const isScheduled = occurrence.status === 'scheduled';
          const isSkipped = occurrence.status === 'skipped';

          return (
            <div
              key={occurrence.id}
              className={css.card({
                status: isPosted
                  ? 'posted'
                  : isScheduled
                    ? 'scheduled'
                    : isSkipped
                      ? 'skipped'
                      : 'pending',
              })}
            >
              <Flex direction="column" gap="x2">
                <Flex alignItems="center" justifyContent="between">
                  <Flex alignItems="center" gap="x2">
                    <span className={css.emoji}>
                      {occurrence.category_emoji || '💰'}
                    </span>
                    <Text typography="body1Bold" color="gray90">
                      {occurrence.series_name}
                    </Text>
                  </Flex>
                  <Text
                    typography="subHeading2Bold"
                    color={isPosted ? 'gray90' : 'gray60'}
                  >
                    {occurrence.displayAmount?.toLocaleString() ?? '0'}원
                  </Text>
                </Flex>

                <Flex alignItems="center" justifyContent="between">
                  <Text typography="description" color="gray60">
                    {dayjs(occurrence.scheduled_on).format('M월 D일')}
                  </Text>
                  <span
                    className={css.statusBadge({
                      status: isPosted
                        ? 'posted'
                        : isScheduled
                          ? 'scheduled'
                          : isSkipped
                            ? 'skipped'
                            : 'pending',
                    })}
                  >
                    {isPosted
                      ? '등록됨'
                      : isScheduled
                        ? '예정'
                        : isSkipped
                          ? '건너뜀'
                          : '대기'}
                  </span>
                </Flex>
              </Flex>
            </div>
          );
        })}
      </div>
    </Flex>
  );
};

export { FixedExpenseList };
