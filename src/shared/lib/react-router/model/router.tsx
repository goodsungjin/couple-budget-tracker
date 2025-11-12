import { createBrowserRouter } from 'react-router';
import LoginPage from '@/pages/auth/LoginPage';
import { DashboardPage } from '@/pages/ledgers/[ledger-id]/dashboard/DashboardPage';
import { HomePage } from '@/pages/ledgers/[ledger-id]/home/HomePage';
import PageLedgers from '@/pages/ledgers/[ledger-id]/PageLedgers';
import { TransactionPage } from '@/pages/ledgers/[ledger-id]/transaction/TransactionPage';
import { defaultLoader } from '@/shared/lib/react-router/model/NotAllowUrlLoader';

export const browserRouter = createBrowserRouter([
  {
    path: '/',
    loader: defaultLoader,
    element: null,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/:ledgerId/*',
    element: <PageLedgers />,
    children: [
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'transaction',
        element: <TransactionPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
    ],
  },
]);
