import type { Database } from '@/shared/lib/supabase/database.types';
import { supabase } from '@/shared/lib/supabase/supabase';

// 고정지출 리스트(관리 페이지용)
export async function listRecurringSeries(params: {
  ledgerId: string;
  year?: number; // 미지정 시 오늘 기준 월
  month?: number;
  onlyActive?: boolean; // default true
  search?: string | null;
  limit?: number; // default 100
  offset?: number; // default 0
}) {
  const { data, error } = await supabase.rpc('list_recurring_series', {
    p_ledger_id: params.ledgerId,
    p_year: params.year ?? undefined,
    p_month: params.month ?? undefined,
    p_only_active: params.onlyActive ?? true,
    p_search: params.search ?? undefined,
    p_limit: params.limit ?? 100,
    p_offset: params.offset ?? 0,
  });
  if (error) throw error;
  return data ?? [];
}

export async function listMonthActivity(params: {
  ledgerId: string;
  year: number;
  month: number;
  includeScheduled?: boolean; // default true
  includeSkipped?: boolean; // default false
}) {
  const { data, error } = await supabase.rpc('list_month_activity', {
    p_ledger_id: params.ledgerId,
    p_year: params.year,
    p_month: params.month,
    p_include_scheduled: params.includeScheduled ?? true,
    p_include_skipped: params.includeSkipped ?? false,
  });
  if (error) throw error;
  return data ?? [];
}

export async function listMonthActivityCompatible(params: {
  ledgerId: string;
  from: string;
  to: string;
  includeScheduled?: boolean; // default true
  includeSkipped?: boolean; // default false
}) {
  const { data, error } = await supabase.rpc('list_month_activity_compatible', {
    p_ledger_id: params.ledgerId,
    p_from: params.from,
    p_to: params.to,
    p_include_scheduled: params.includeScheduled ?? true,
    p_include_skipped: params.includeSkipped ?? false,
  });
  if (error) throw error;
  return data ?? [];
}

// 고정지출 시리즈 생성
export async function createSeries(params: {
  ledgerId: string;
  name: string;
  categoryId: string;
  amount: number;
  monthday: number; // 1~31
  startOn: string; // 'YYYY-MM-DD'
  paymentMethodId?: string;
  currency?: string; // 기본 KRW
  endOn?: string | null; // 기간형이면 지정
  autoPost?: boolean; // 미래 자동등록
  notes?: string | null;
  autoMaterialize?: boolean; // 기간형 전량 생성
  backfillPostMode?: Database['public']['Enums']['backfill_post_mode_enum'];
}) {
  const { data, error } = await supabase.rpc('create_recurring_series', {
    p_ledger_id: params.ledgerId,
    p_name: params.name,
    p_category_id: params.categoryId,
    p_amount: params.amount,
    p_monthday: params.monthday,
    p_start_on: params.startOn,
    p_payment_method_id: params.paymentMethodId ?? undefined,
    p_currency: params.currency ?? 'KRW',
    p_end_on: params.endOn ?? undefined,
    p_auto_post: params.autoPost ?? false,
    p_notes: params.notes ?? undefined,
    p_auto_materialize: params.autoMaterialize ?? true,
    p_backfill_post_mode: params.backfillPostMode ?? 'past_and_today',
  });
  if (error) throw error;
  return data as string; // series id
}

// 고정지출 시리즈 수정
export async function updateSeries(
  seriesId: string,
  patch: Partial<{
    name: string;
    categoryId: string;
    paymentMethodId: string | undefined;
    amount: number;
    currency: string;
    monthday: number;
    startOn: string;
    endOn: string | undefined;
    autoPost: boolean;
    notes: string | undefined;
    windowStartOffsetDays: number;
    windowEndOffsetDays: number;
    autoPostPolicy: 'at_window_start' | 'at_window_end';
    amountMin: number | undefined;
    amountMax: number | undefined;
    autoMaterialize: boolean;
    backfillPostMode: 'none' | 'past' | 'past_and_today';
  }>
) {
  const { error } = await supabase.rpc('update_recurring_series', {
    p_series_id: seriesId,
    p_name: patch.name ?? undefined,
    p_category_id: patch.categoryId ?? undefined,
    p_payment_method_id: patch.paymentMethodId ?? undefined,
    p_amount: patch.amount ?? undefined,
    p_currency: patch.currency ?? undefined,
    p_monthday: patch.monthday ?? undefined,
    p_start_on: patch.startOn ?? undefined,
    p_end_on: patch.endOn ?? undefined,
    p_auto_post: patch.autoPost ?? undefined,
    p_notes: patch.notes ?? undefined,
    p_window_start_offset_days: patch.windowStartOffsetDays ?? undefined,
    p_window_end_offset_days: patch.windowEndOffsetDays ?? undefined,
    p_auto_post_policy: patch.autoPostPolicy ?? undefined,
    p_amount_min: patch.amountMin ?? undefined,
    p_amount_max: patch.amountMax ?? undefined,
    p_auto_materialize: patch.autoMaterialize ?? undefined,
    p_backfill_post_mode: patch.backfillPostMode ?? undefined,
  });
  if (error) throw error;
}

// 월별 회차 조회(보장 후 조회)
export async function listOccurrencesMonthAuto(params: {
  ledgerId: string;
  year: number;
  month: number;
  status?: Database['public']['Enums']['occurrence_status_enum'];
}) {
  const { data, error } = await supabase.rpc('list_occurrences_month_auto', {
    p_ledger_id: params.ledgerId,
    p_year: params.year,
    p_month: params.month,
    p_status: params.status,
  });
  if (error) throw error;
  return data ?? [];
}

// 회차 등록
export async function postOccurrence(occurrenceId: string) {
  const { data, error } = await supabase.rpc('post_occurrence', {
    p_occurrence_id: occurrenceId,
  });
  if (error) throw error;
  return data;
}

// 회차 스킵
export async function skipOccurrence(occurrenceId: string) {
  const { data, error } = await supabase.rpc('skip_occurrence', {
    p_occurrence_id: occurrenceId,
  });
  if (error) throw error;
  return data;
}

// 회차 되돌리기
export async function unpostOccurrence(occurrenceId: string) {
  const { data, error } = await supabase.rpc('unpost_occurrence', {
    p_occurrence_id: occurrenceId,
  });
  if (error) throw error;
  return data;
}

// 자동등록: 서버 크론(매일 09:05 KST 같은 시간)에 실행
// export async function autoPostDue(ledgerId: string) {
//   const { data, error } = await supabase.rpc('auto_post_due', {
//     p_ledger_id: ledgerId,
//   });
//   if (error) throw error;
//   return data;
// }
