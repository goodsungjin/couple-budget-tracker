-- 함수가 존재하는지 확인
SELECT 
  proname as function_name,
  pronargs as num_args,
  proargnames as arg_names
FROM pg_proc 
WHERE proname = 'list_transactions_by_parent_category';

-- 함수가 없으면 생성
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_proc 
    WHERE proname = 'list_transactions_by_parent_category'
    AND pronamespace = (SELECT oid FROM pg_namespace WHERE nspname = 'public')
  ) THEN
    -- parent 카테고리 ID로 거래를 조회하는 RPC 함수
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
        t.id,
        t.ledger_id,
        t.occurred_on,
        t.amount,
        t.signed_amount,
        t.currency,
        t.merchant,
        t.memo,
        t.category_id,
        t.category_parent_id,
        t.flow_type,
        t.payment_method_id,
        t.created_by,
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
      WHERE t.ledger_id = p_ledger_id
        AND (
          t.category_id = p_parent_category_id
          OR
          t.category_parent_id = p_parent_category_id
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
    
    RAISE NOTICE 'Function list_transactions_by_parent_category created successfully';
  ELSE
    RAISE NOTICE 'Function list_transactions_by_parent_category already exists';
  END IF;
END $$;

