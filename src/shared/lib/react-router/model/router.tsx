import { createBrowserRouter } from 'react-router';
import App from '@/App';
import LoginPage from '@/pages/auth/LoginPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { HomePage } from '@/pages/home/HomePage';
import { TransactionPage } from '@/pages/transaction/TransactionPage';
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
    element: <App />,
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
