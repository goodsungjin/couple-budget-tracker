import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import weekOfYear from 'dayjs/plugin/weekOfYear';

// dayjs 플러그인 설정
dayjs.extend(weekOfYear);
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.locale('ko');

/**
 * 오늘 날짜를 반환
 */
export const getToday = (): dayjs.Dayjs => dayjs();

/**
 * 특정 날짜가 오늘인지 확인
 */
export const isToday = (date: dayjs.Dayjs): boolean => {
  return date.isSame(dayjs(), 'day');
};

/**
 * 두 날짜가 같은 날인지 확인
 */
export const isSameDay = (date1: dayjs.Dayjs, date2: dayjs.Dayjs): boolean => {
  return date1.isSame(date2, 'day');
};

/**
 * 두 날짜가 같은 월인지 확인
 */
export const isSameMonth = (
  date1: dayjs.Dayjs,
  date2: dayjs.Dayjs
): boolean => {
  return date1.isSame(date2, 'month');
};

/**
 * 두 날짜가 같은 주인지 확인
 */
export const isSameWeek = (date1: dayjs.Dayjs, date2: dayjs.Dayjs): boolean => {
  return date1.isSame(date2, 'week');
};

/**
 * 특정 날짜가 주말인지 확인 (토요일, 일요일)
 */
export const isWeekend = (date: dayjs.Dayjs): boolean => {
  const dayOfWeek = date.day();
  return dayOfWeek === 0 || dayOfWeek === 6; // 일요일(0) 또는 토요일(6)
};

/**
 * 날짜를 지정된 형식으로 포맷팅
 */
export const formatDate = (
  date: dayjs.Dayjs,
  format: string = 'YYYY-MM-DD'
): string => {
  return date.format(format);
};

/**
 * 월 이름을 한국어로 반환
 */
export const getMonthName = (date: dayjs.Dayjs): string => {
  return date.format('MMMM');
};

/**
 * 요일 이름을 한국어로 반환
 */
export const getDayName = (date: dayjs.Dayjs): string => {
  return date.format('dddd');
};

/**
 * 요일 이름을 짧게 반환 (월, 화, 수, ...)
 */
export const getShortDayName = (date: dayjs.Dayjs): string => {
  return date.format('ddd');
};

/**
 * 두 날짜 사이의 일수 계산
 */
export const getDaysBetween = (
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): number => {
  return endDate.diff(startDate, 'day');
};

/**
 * 특정 날짜가 주어진 범위 내에 있는지 확인
 */
export const isDateInRange = (
  date: dayjs.Dayjs,
  startDate: dayjs.Dayjs,
  endDate: dayjs.Dayjs
): boolean => {
  return (
    date.isSameOrAfter(startDate, 'day') && date.isSameOrBefore(endDate, 'day')
  );
};
