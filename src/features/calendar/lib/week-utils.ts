import dayjs from 'dayjs';
import type { CalendarDay, WeekCalendarData } from '../model/types';
import { isSameDay, isToday, isWeekend } from './date-utils';

/**
 * 특정 날짜가 속한 주의 시작일을 반환 (일요일 기준)
 */
export const getWeekStart = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.startOf('week');
};

/**
 * 특정 날짜가 속한 주의 종료일을 반환 (토요일 기준)
 */
export const getWeekEnd = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.endOf('week');
};

/**
 * 특정 주의 모든 날짜를 생성 (7개)
 */
export const generateWeekDays = (
  date: dayjs.Dayjs,
  selectedDate: dayjs.Dayjs | null = null
): CalendarDay[] => {
  const weekStart = getWeekStart(date);
  const weekEnd = getWeekEnd(date);

  const days: CalendarDay[] = [];
  let currentDate = weekStart;

  while (currentDate.isSameOrBefore(weekEnd, 'day')) {
    const isCurrentMonth = true; // 주별 뷰에서는 항상 true
    const isPreviousMonth = false; // 주별 뷰에서는 사용하지 않음
    const isNextMonth = false; // 주별 뷰에서는 사용하지 않음
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
 * 주별 캘린더 데이터를 생성
 */
export const generateWeekCalendarData = (
  date: dayjs.Dayjs,
  selectedDate: dayjs.Dayjs | null = null
): WeekCalendarData => {
  const days = generateWeekDays(date, selectedDate);
  const firstDay = getWeekStart(date);
  const lastDay = getWeekEnd(date);
  const weekNumber = date.week();

  return {
    days,
    firstDay,
    lastDay,
    weekNumber,
  };
};

/**
 * 이전 주로 이동
 */
export const getPreviousWeek = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.subtract(1, 'week');
};

/**
 * 다음 주로 이동
 */
export const getNextWeek = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return date.add(1, 'week');
};

/**
 * 특정 주의 특정 요일로 이동
 */
export const getWeekDay = (
  date: dayjs.Dayjs,
  dayOfWeek: number
): dayjs.Dayjs => {
  const weekStart = getWeekStart(date);
  return weekStart.add(dayOfWeek, 'day');
};

/**
 * 특정 주의 월요일을 반환
 */
export const getWeekMonday = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return getWeekDay(date, 1); // 월요일은 1
};

/**
 * 특정 주의 금요일을 반환
 */
export const getWeekFriday = (date: dayjs.Dayjs): dayjs.Dayjs => {
  return getWeekDay(date, 5); // 금요일은 5
};

/**
 * 특정 주가 현재 주인지 확인
 */
export const isCurrentWeek = (date: dayjs.Dayjs): boolean => {
  const today = dayjs();
  return date.isSame(today, 'week');
};

/**
 * 특정 주가 이번 달에 속하는지 확인
 */
export const isWeekInCurrentMonth = (
  date: dayjs.Dayjs,
  month: dayjs.Dayjs
): boolean => {
  const weekStart = getWeekStart(date);
  const weekEnd = getWeekEnd(date);
  const monthStart = month.startOf('month');
  const monthEnd = month.endOf('month');

  return (
    (weekStart.isSameOrAfter(monthStart, 'day') &&
      weekStart.isSameOrBefore(monthEnd, 'day')) ||
    (weekEnd.isSameOrAfter(monthStart, 'day') &&
      weekEnd.isSameOrBefore(monthEnd, 'day'))
  );
};
