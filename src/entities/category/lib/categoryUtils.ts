import type { Database } from '@/shared/lib/supabase/database.types';

type Category = Database['public']['Tables']['categories']['Row'];

/**
 * 카테고리 ID가 소분류인지 확인
 */
export function isSubcategory(
  categoryId: string,
  allCategories: Category[]
): boolean {
  const category = allCategories.find((cat) => cat.id === categoryId);
  return category?.parent_id !== null;
}

/**
 * 카테고리 ID로 카테고리 찾기
 */
export function findCategoryById(
  categoryId: string,
  allCategories: Category[]
): Category | null {
  return allCategories.find((cat) => cat.id === categoryId) || null;
}

/**
 * 소분류 카테고리인 경우 상위 카테고리 정보 반환
 * @returns { topCategoryId: string, subcategoryId: string | null, flowType: FlowType }
 */
export function resolveCategoryHierarchy(
  categoryId: string,
  allCategories: Category[]
): {
  topCategoryId: string;
  subcategoryId: string | null;
  flowType: 'income' | 'expense' | 'saving';
} {
  const category = findCategoryById(categoryId, allCategories);

  if (!category) {
    // 카테고리를 찾을 수 없으면 기본값 반환
    return {
      topCategoryId: categoryId,
      subcategoryId: null,
      flowType: 'expense',
    };
  }

  const isSub = category.parent_id !== null;

  if (isSub && category.parent_id) {
    // 소분류인 경우
    const parentCategory = findCategoryById(category.parent_id, allCategories);
    return {
      topCategoryId: category.parent_id,
      subcategoryId: category.id,
      flowType: (parentCategory?.flow_type || 'expense') as
        | 'income'
        | 'expense'
        | 'saving',
    };
  } else {
    // 상위 카테고리인 경우
    return {
      topCategoryId: category.id,
      subcategoryId: null,
      flowType: (category.flow_type || 'expense') as
        | 'income'
        | 'expense'
        | 'saving',
    };
  }
}
