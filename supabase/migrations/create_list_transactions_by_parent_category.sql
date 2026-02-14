-- parent 카테고리 ID로 거래를 조회하는 RPC 함수
-- parent 카테고리 자체에 직접 연결된 거래와 하위 카테고리에 연결된 거래를 모두 반환합니다.
CREATE OR REPLACE FUNCTION public.list_transactions_by_parent_category(
  p_ledger_id TEXT,
  p_parent_category_id TEXT,
  p_from TEXT DEFAULT NULL,
  p_to TEXT DEFAULT NULL,
  p_flow flow_type_enum DEFAULT NULL
)
RETURNS TABLE (
  id TEXT,
  ledger_id TEXT,
  occurred_on DATE,
  amount NUMERIC,
  signed_amount NUMERIC,
  currency TEXT,
  merchant TEXT,
  memo TEXT,
  category_id TEXT,
  category_parent_id TEXT,
  flow_type flow_type_enum,
  payment_method_id TEXT,
  created_by TEXT,
  created_at TIMESTAMPTZ,
  category_emoji TEXT,
  category_name TEXT,
  category_parent_name TEXT,
  created_by_name TEXT,
  payment_method_name TEXT
)
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$ 
BEGIN
  RETURN QUERY
  SELECT
    t.id::TEXT,
    t.ledger_id::TEXT,
    t.occurred_on,
    t.amount,
    t.signed_amount,
    t.currency,
    t.merchant,
    t.memo,
    t.category_id::TEXT,
    t.category_parent_id::TEXT,
    t.flow_type,
    t.payment_method_id::TEXT,
    t.created_by::TEXT,
    t.created_at,
    COALESCE(c.emoji, '') AS category_emoji,
    COALESCE(c.name, '') AS category_name,
    COALESCE(pc.name, '') AS category_parent_name,
    COALESCE(prof.display_name, '') AS created_by_name,
    COALESCE(pm.name, '') AS payment_method_name
  FROM v_transactions t
  LEFT JOIN categories c ON t.category_id = c.id
  LEFT JOIN categories pc ON t.category_parent_id = pc.id
  LEFT JOIN profiles prof ON t.created_by = prof.id
  LEFT JOIN payment_methods pm ON t.payment_method_id = pm.id
  WHERE t.ledger_id = p_ledger_id::UUID
    AND (
      -- parent 카테고리 자체에 직접 연결된 거래
      t.category_id = p_parent_category_id::UUID
      OR
      -- 하위 카테고리에 연결된 거래
      t.category_parent_id = p_parent_category_id::UUID
    )
    AND (p_from IS NULL OR t.occurred_on >= p_from::DATE)
    AND (p_to IS NULL OR t.occurred_on < p_to::DATE)
    AND (p_flow IS NULL OR t.flow_type = p_flow)
  ORDER BY t.occurred_on DESC;
END;
$$;

-- 함수 실행 권한 부여
GRANT EXECUTE ON FUNCTION public.list_transactions_by_parent_category TO authenticated;
GRANT EXECUTE ON FUNCTION public.list_transactions_by_parent_category TO anon;

