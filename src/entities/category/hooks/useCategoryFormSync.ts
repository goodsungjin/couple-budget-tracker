import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useRef } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { getListCategoriesQueryOptions } from '@/entities/category/apis/getListCategoriesQueryOptions';
import { resolveCategoryHierarchy } from '@/entities/category/lib/categoryUtils';
import type { Database } from '@/shared/lib/supabase/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

interface UseCategoryFormSyncOptions<
  T extends { categoryId?: string; flowType?: string; subcategoryId?: string },
> {
  form: UseFormReturn<T>;
  categoryId: string | null | undefined;
  ledgerId: string;
  enabled?: boolean;
}

/**
 * 카테고리 ID가 변경될 때 form을 자동으로 동기화하는 hook
 * 소분류 카테고리인 경우 상위 카테고리와 소분류를 자동으로 설정
 */
export function useCategoryFormSync<
  T extends { categoryId?: string; flowType?: string; subcategoryId?: string },
>({
  form,
  categoryId,
  ledgerId,
  enabled = true,
}: UseCategoryFormSyncOptions<T>) {
  const processedCategoryIdRef = useRef<string | null>(null);

  // 모든 flowType의 카테고리를 조회
  const { data: incomeCategories } = useQuery({
    ...getListCategoriesQueryOptions({
      ledgerId,
      flowType: 'income',
    }),
    enabled,
  });
  const { data: expenseCategories } = useQuery({
    ...getListCategoriesQueryOptions({
      ledgerId,
      flowType: 'expense',
    }),
    enabled,
  });
  const { data: savingCategories } = useQuery({
    ...getListCategoriesQueryOptions({
      ledgerId,
      flowType: 'saving',
    }),
    enabled,
  });

  // 모든 카테고리를 합치기
  const allCategories = useMemo(
    () =>
      [
        ...(incomeCategories || []),
        ...(expenseCategories || []),
        ...(savingCategories || []),
      ] as Category[],
    [incomeCategories, expenseCategories, savingCategories]
  );

  // categoryId prop이 변경되면 processedCategoryIdRef 초기화
  useEffect(() => {
    processedCategoryIdRef.current = null;
  }, [categoryId]);

  // categoryId가 변경되면 form 동기화
  useEffect(() => {
    if (!categoryId || allCategories.length === 0) return;
    // 이미 처리한 카테고리면 스킵
    if (processedCategoryIdRef.current === categoryId) return;

    const hierarchy = resolveCategoryHierarchy(categoryId, allCategories);

    form.setValue('categoryId' as any, hierarchy.topCategoryId as any);
    form.setValue('flowType' as any, hierarchy.flowType as any);

    if (hierarchy.subcategoryId) {
      form.setValue('subcategoryId' as any, hierarchy.subcategoryId as any);
    } else {
      // 소분류가 아닌 경우 subcategoryId 초기화
      form.setValue('subcategoryId' as any, undefined as any);
    }

    processedCategoryIdRef.current = categoryId;
  }, [categoryId, allCategories.length, form]);
}
