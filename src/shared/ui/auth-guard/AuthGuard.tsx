import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getSessionQueryOptions } from '@/entities/auth/apis/getSessionQueryOptions';
import { getLedgerListQueryOptions } from '@/entities/ledger/apis/getLedgerLitsQueryOptions';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard = ({ children }: AuthGuardProps) => {
  const { data: session } = useSuspenseQuery({
    ...getSessionQueryOptions(),
    select: (data) => data.data.session,
  });
  const navigate = useNavigate();

  const { refetch: refetchLedgers } = useQuery(getLedgerListQueryOptions());

  useEffect(() => {
    if (!session) {
      navigate('/login', { replace: true });
      return;
    }

    // 로그인된 상태에서 ledgerId가 없거나 유효하지 않은 경우
    const currentPath = window.location.pathname;
    const pathSegments = currentPath.split('/').filter(Boolean);

    if (pathSegments.length === 0 || pathSegments[0] === 'login') {
      // 기본 경로로 접근한 경우 첫 번째 ledger로 리다이렉트
      const init = async () => {
        const { data: ledgers } = await refetchLedgers();
        if (ledgers && ledgers.length > 0) {
          navigate(`/${ledgers[0].id}/dashboard`, { replace: true });
        }
      };
      init();
    }
  }, [session, navigate, refetchLedgers]);

  if (!session) {
    return null; // 로그인 페이지로 리다이렉트 중
  }

  return <>{children}</>;
};

export default AuthGuard;
