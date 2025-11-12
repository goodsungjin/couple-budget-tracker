import { Outlet, useParams } from 'react-router';
import { ErrorBoundary } from '@/shared/ui/error-boundary/ErrorBoundary';
import { Flex } from '@/shared/ui/flex/Flex';
import { Header } from '@/shared/ui/header/Header';
import { LedgersSideMenu } from '@/widgets/ledgers-side-menu/ui/LedgersSideMenu';
import { ToastProvider } from '../../../shared/ui/toast/ToastProvider';
import * as css from './PageLedgers.css.ts';

function PageLedgers() {
  const { ledgerId } = useParams<{ ledgerId: string }>();

  return (
    <ErrorBoundary
      onError={(error, errorInfo) => {
        console.error('Application Error:', error, errorInfo);
      }}
    >
      <ToastProvider>
        <Flex direction="column" height="100vh" width="100vw">
          <Header ledgerId={ledgerId} />

          <Flex flex={1} className={css.body}>
            <LedgersSideMenu ledgerId={ledgerId || ''} />

            <Outlet context={{ ledgerId }} />
          </Flex>
        </Flex>
      </ToastProvider>
    </ErrorBoundary>
  );
}

export default PageLedgers;
