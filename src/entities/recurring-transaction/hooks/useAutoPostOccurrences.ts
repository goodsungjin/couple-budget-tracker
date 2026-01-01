import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useEffect, useRef } from 'react';
import { getListOccurrencesMonthAutoQueryOptions } from '@/entities/recurring-transaction/apis/getListOccurrencesMonthAutoQueryOptions';
import { transactionKeys } from '@/entities/transactions/lib/queryKeys';
import { getToday } from '@/features/calendar/lib/date-utils';
import { postOccurrence } from '@/shared/apis/recurringTransaction';

interface UseAutoPostOccurrencesOptions {
  ledgerId: string;
  year: number;
  month: number;
  enabled?: boolean;
}

/**
 * 진입한 월에 고정지출이 있고 아직 트랜잭션으로 변하지 않았다면 자동으로 변환하는 hook
 */
export const useAutoPostOccurrences = ({
  ledgerId,
  year,
  month,
  enabled = true,
}: UseAutoPostOccurrencesOptions) => {
  const queryClient = useQueryClient();
  const processedMonthRef = useRef<string | null>(null);

  // useQuery로 scheduled 상태인 occurrence 조회 (enabled 옵션으로 제어)
  const { data: occurrences } = useQuery({
    ...getListOccurrencesMonthAutoQueryOptions({
      ledgerId,
      year,
      month,
      status: 'scheduled',
    }),
    enabled: enabled && !!ledgerId,
  });

  const { mutate: postOccurrenceMutation } = useMutation({
    mutationFn: postOccurrence,
    onSuccess: () => {
      // 트랜잭션 목록 쿼리 무효화하여 최신 데이터 가져오기
      queryClient.invalidateQueries({
        queryKey: transactionKeys.lists(),
      });
      // occurrence 쿼리도 무효화하여 최신 상태 반영
      queryClient.invalidateQueries({
        queryKey: [
          'recurring-occurrences',
          'month-auto',
          ledgerId,
          year,
          month,
          'scheduled',
        ],
      });
    },
  });

  useEffect(() => {
    if (!enabled) return;

    const monthKey = `${year}-${month}`;
    // 이미 처리한 월이면 스킵
    if (processedMonthRef.current === monthKey) return;

    if (!occurrences || occurrences.length === 0) {
      processedMonthRef.current = monthKey;
      return;
    }

    const today = getToday();

    // 오늘 날짜가 지난 occurrence만 필터링
    const occurrencesToPost = occurrences.filter((occurrence) => {
      if (!occurrence.scheduled_on) return false;
      const scheduledDate = dayjs(occurrence.scheduled_on);
      return (
        scheduledDate.isBefore(today, 'day') ||
        scheduledDate.isSame(today, 'day')
      );
    });

    if (occurrencesToPost.length === 0) {
      processedMonthRef.current = monthKey;
      return;
    }

    // 각 occurrence를 트랜잭션으로 변환
    for (const occurrence of occurrencesToPost) {
      if (occurrence.id) {
        postOccurrenceMutation(occurrence.id);
      }
    }

    processedMonthRef.current = monthKey;
  }, [year, month, enabled, occurrences, postOccurrenceMutation]);
};
