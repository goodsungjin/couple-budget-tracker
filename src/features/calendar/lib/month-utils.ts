import dayjs from 'dayjs';
import type { CalendarDay, MonthCalendarData } from '../model/types';
import { isSameDay, isToday, isWeekend } from './date-utils';

/**
 * 특정 월의 첫 번째 날을 반환
 */
export const getMonthStart = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.startOf('month');
};

/**
 * 특정 월의 마지막 날을 반환
 */
export const getMonthEnd = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.endOf('month');
};

/**
 * 특정 월의 첫 번째 주의 시작일을 반환 (일요일 기준)
 */
export const getMonthFirstWeekStart = (date: dayjs.Dayjs): dayjs.Dayjs => {
  const monthStart = getMonthStart(date);
  return monthStart.startOf('week');
};

/**
 * 특정 월의 마지막 주의 종료일을 반환 (토요일 기준)
 */
export const getMonthLastWeekEnd = (date: dayjs.Dayjs): dayjs.Dayjs => {
  const monthEnd = getMonthEnd(date);
  return monthEnd.endOf('week');
};

/**
 * 특정 월의 주차 수를 계산
 */
export const getMonthWeekCount = (date: dayjs.Dayjs): number => {
  const firstWeekStart = getMonthFirstWeekStart(date);
  const lastWeekEnd = getMonthLastWeekEnd(date);
  return lastWeekEnd.diff(firstWeekStart, 'week') + 1;
};

/**
 * 특정 월의 모든 날짜를 생성 (6주 x 7일 = 42개)
 */
export const generateMonthDays = (
  date: dayjs.Dayjs,
  selectedDate: dayjs.Dayjs | null = null
): CalendarDay[] => {
  const monthStart = getMonthStart(date);
  const monthEnd = getMonthEnd(date);
  const firstWeekStart = getMonthFirstWeekStart(date);
  const lastWeekEnd = getMonthLastWeekEnd(date);

  const days: CalendarDay[] = [];
  let currentDate = firstWeekStart;

  while (currentDate.isSameOrBefore(lastWeekEnd, 'day')) {
    const isCurrentMonth = currentDate.isSame(date, 'month');
    const isPreviousMonth = currentDate.isBefore(monthStart, 'day');
    const isNextMonth = currentDate.isAfter(monthEnd, 'day');
    const isTodayDate = isToday(currentDate);
    const isSelected = selectedDate
      ? isSameDay(currentDate, selectedDate)
      : false;
    const isWeekendDay = isWeekend(currentDate);

    days.push({
      date: currentDate,
      isCurrentMonth,
      isPreviousMonth,
      isNextMonth,
      isToday: isTodayDate,
      isSelected,
      isWeekend: isWeekendDay,
    });

    currentDate = currentDate.add(1, 'day');
  }

  return days;
};

/**
 * 월별 캘린더 데이터를 생성
 */
export const generateMonthCalendarData = (
  date: dayjs.Dayjs,
  selectedDate: dayjs.Dayjs | null = null
): MonthCalendarData => {
  const days = generateMonthDays(date, selectedDate);
  const firstDay = getMonthStart(date);
  const lastDay = getMonthEnd(date);
  const weekCount = getMonthWeekCount(date);

  return {
    days,
    firstDay,
    lastDay,
    weekCount,
  };
};

/**
 * 이전 월로 이동
 */
export const getPreviousMonth = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.subtract(1, 'month');
};

/**
 * 다음 월로 이동
 */
export const getNextMonth = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.add(1, 'month');
};

/**
 * 특정 월의 주차별로 날짜를 그룹화
 */
export const groupMonthDaysByWeek = (days: CalendarDay[]): CalendarDay[][] => {
  const weeks: CalendarDay[][] = [];

  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  return weeks;
};

/**
 * 특정 월의 특정 주차의 날짜들을 반환
 */
export const getWeekDaysFromMonth = (
  date: dayjs.Dayjs,
  weekIndex: number,
  selectedDate: dayjs.Dayjs | null = null
): CalendarDay[] => {
  const monthData = generateMonthCalendarData(date, selectedDate);
  const weeks = groupMonthDaysByWeek(monthData.days);

  return weeks[weekIndex] || [];
};
