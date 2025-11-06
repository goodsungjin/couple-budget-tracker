import { useQuery } from '@tanstack/react-query';
import { useEffect } from 'react';
import { Outlet, Route, Routes, useNavigate, useParams } from 'react-router';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { TransactionPage } from '@/pages/transaction/TransactionPage';
import * as css from './App.css';
import { getLedgerListQueryOptions } from './entities/ledger/apis/getLedgerLitsQueryOptions';
import { HomePage } from './pages/home/HomePage';
import { ErrorBoundary } from './shared/ui/error-boundary/ErrorBoundary';
import { Flex } from './shared/ui/flex/Flex';
import { Header } from './shared/ui/header/Header';
import { SideMenu } from './shared/ui/side-menu/SideMenu';
import { ToastProvider } from './shared/ui/toast/ToastProvider';

function App() {
  const { ledgerId } = useParams<{ ledgerId: string }>();
  const navigate = useNavigate();

  const { data: ledgers } = useQuery(getLedgerListQueryOptions());

  useEffect(() => {
    if (!ledgers) return;

    // ledgerId가 없는 경우 (루트 경로)
    if (!ledgerId) {
      if (ledgers.length > 0) {
        navigate(`/${ledgers[0].id}/dashboard`, { replace: true });
      }
      return;
    }

    // ledgerId가 있지만 유효하지 않은 경우
    const isValidLedger = ledgers.some((ledger) => ledger.id === ledgerId);
    if (!isValidLedger && ledgers.length > 0) {
      navigate(`/${ledgers[0].id}/dashboard`, { replace: true });
    }
  }, [ledgers, ledgerId, navigate]);

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        // 에러 리포팅 서비스에 전송
        console.error('Application Error:', error, errorInfo);
        // TODO: Sentry, LogRocket 등 에러 리포팅 서비스 연동
      }}
    >
      <ToastProvider>
        <Flex direction="column" height="100vh" width="100vw">
          <Header ledgerId={ledgerId} />

          <Flex flex={1} className={css.body}>
            <SideMenu ledgerId={ledgerId || ''} />

            <Outlet context={{ ledgerId }} />

            {/* <Routes>
              <Route path="home" element={<HomePage />} />

              <Route
                path="transaction"
                element={<TransactionPage ledgerId={ledgerId || ''} />}
              />

              <Route
                path="dashboard"
                element={<DashboardPage ledgerId={ledgerId || ''} />}
              />
            </Routes> */}
          </Flex>
        </Flex>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default App;
