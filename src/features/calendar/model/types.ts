import type { Dayjs } from 'dayjs';

/**
 * 캘린더의 각 날짜 정보를 나타내는 인터페이스
 */
export interface CalendarDay {
  /** dayjs 객체 */
  date: Dayjs;
  /** 현재 표시 중인 월의 날짜인지 여부 */
  isCurrentMonth: boolean;
  /** 오늘 날짜인지 여부 */
  isToday: boolean;
  /** 선택된 날짜인지 여부 */
  isSelected: boolean;
  /** 주말인지 여부 (토요일, 일요일) */
  isWeekend: boolean;
  /** 이전 월의 날짜인지 여부 */
  isPreviousMonth: boolean;
  /** 다음 월의 날짜인지 여부 */
  isNextMonth: boolean;
}

/**
 * 캘린더 뷰 모드
 */
export type CalendarViewMode = 'month' | 'week';

/**
 * 캘린더 상태를 관리하는 인터페이스
 */
export interface CalendarState {
  /** 현재 표시 중인 기준 날짜 */
  currentDate: Dayjs;
  /** 선택된 날짜 */
  selectedDate: Dayjs | null;
  /** 현재 뷰 모드 */
  viewMode: CalendarViewMode;
}

/**
 * 캘린더 네비게이션 방향
 */
export type CalendarNavigationDirection = 'prev' | 'next';

/**
 * 월별 캘린더 데이터
 */
export interface MonthCalendarData {
  /** 해당 월의 모든 날짜 배열 (6주 x 7일 = 42개) */
  days: CalendarDay[];
  /** 해당 월의 첫 번째 날 */
  firstDay: Dayjs;
  /** 해당 월의 마지막 날 */
  lastDay: Dayjs;
  /** 해당 월의 주차 수 */
  weekCount: number;
}

/**
 * 주별 캘린더 데이터
 */
export interface WeekCalendarData {
  /** 해당 주의 모든 날짜 배열 (7개) */
  days: CalendarDay[];
  /** 해당 주의 첫 번째 날 */
  firstDay: Dayjs;
  /** 해당 주의 마지막 날 */
  lastDay: Dayjs;
  /** 해당 주의 주차 번호 */
  weekNumber: number;
}

/**
 * 캘린더 이벤트 (향후 확장용)
 */
export interface CalendarEvent {
  id: string;
  title: string;
  date: Dayjs;
  startTime?: Dayjs;
  endTime?: Dayjs;
  isAllDay?: boolean;
}
