import type dayjs from 'dayjs';
import { useCallback, useMemo, useState } from 'react';
import { getToday } from '@/features/calendar/lib/date-utils';
import {
  generateMonthCalendarData,
  getNextMonth,
  getPreviousMonth,
} from '@/features/calendar/lib/month-utils';
import {
  generateWeekCalendarData,
  getNextWeek,
  getPreviousWeek,
} from '@/features/calendar/lib/week-utils';
import type {
  CalendarState,
  CalendarViewMode,
  MonthCalendarData,
  WeekCalendarData,
} from './types';

/**
 * 캘린더 상태 관리를 위한 커스텀 훅
 */
export const useCalendar = (initialDate?: dayjs.Dayjs) => {
  const today = getToday();
  const initialCurrentDate = initialDate || today;

  const [state, setState] = useState<CalendarState>({
    currentDate: initialCurrentDate,
    selectedDate: null,
    viewMode: 'month',
  });

  /**
   * 현재 날짜 업데이트
   */
  const setCurrentDate = useCallback((date: dayjs.Dayjs) => {
    setState((prev) => ({
      ...prev,
      currentDate: date,
    }));
  }, []);

  /**
   * 선택된 날짜 업데이트
   */
  const setSelectedDate = useCallback((date: dayjs.Dayjs | null) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  /**
   * 뷰 모드 업데이트
   */
  const setViewMode = useCallback((mode: CalendarViewMode) => {
    setState((prev) => ({
      ...prev,
      viewMode: mode,
    }));
  }, []);

  /**
   * 이전 월/주로 이동
   */
  const navigatePrevious = useCallback(() => {
    setState((prev) => {
      const newDate =
        prev.viewMode === 'month'
          ? getPreviousMonth(prev.currentDate)
          : getPreviousWeek(prev.currentDate);

      return {
        ...prev,
        currentDate: newDate,
      };
    });
  }, []);

  /**
   * 다음 월/주로 이동
   */
  const navigateNext = useCallback(() => {
    setState((prev) => {
      const newDate =
        prev.viewMode === 'month'
          ? getNextMonth(prev.currentDate)
          : getNextWeek(prev.currentDate);

      return {
        ...prev,
        currentDate: newDate,
      };
    });
  }, []);

  /**
   * 오늘 날짜로 이동
   */
  const navigateToToday = useCallback(() => {
    setState((prev) => ({
      ...prev,
      currentDate: today,
    }));
  }, [today]);

  /**
   * 특정 날짜로 이동
   */
  const navigateToDate = useCallback((date: dayjs.Dayjs) => {
    setState((prev) => ({
      ...prev,
      currentDate: date,
    }));
  }, []);

  /**
   * 날짜 선택
   */
  const selectDate = useCallback((date: dayjs.Dayjs) => {
    setState((prev) => ({
      ...prev,
      selectedDate: date,
    }));
  }, []);

  /**
   * 선택된 날짜 해제
   */
  const clearSelection = useCallback(() => {
    setState((prev) => ({
      ...prev,
      selectedDate: null,
    }));
  }, []);

  /**
   * 월별 캘린더 데이터 생성
   */
  const monthData = useMemo((): MonthCalendarData => {
    return generateMonthCalendarData(state.currentDate, state.selectedDate);
  }, [state.currentDate, state.selectedDate]);

  /**
   * 주별 캘린더 데이터 생성
   */
  const weekData = useMemo((): WeekCalendarData => {
    return generateWeekCalendarData(state.currentDate, state.selectedDate);
  }, [state.currentDate, state.selectedDate]);

  /**
   * 현재 뷰 모드에 따른 캘린더 데이터
   */
  const calendarData = useMemo(() => {
    return state.viewMode === 'month' ? monthData : weekData;
  }, [state.viewMode, monthData, weekData]);

  /**
   * 현재 월/주가 오늘을 포함하는지 확인
   */
  const isCurrentPeriod = useMemo(() => {
    if (state.viewMode === 'month') {
      return state.currentDate.isSame(today, 'month');
    } else {
      return state.currentDate.isSame(today, 'week');
    }
  }, [state.currentDate, state.viewMode, today]);

  return {
    // 상태
    state,
    calendarData,
    isCurrentPeriod,

    // 네비게이션 함수들
    navigatePrevious,
    navigateNext,
    navigateToToday,
    navigateToDate,

    // 날짜 선택 함수들
    selectDate,
    clearSelection,
    setSelectedDate,

    // 상태 업데이트 함수들
    setCurrentDate,
    setViewMode,
  };
};
