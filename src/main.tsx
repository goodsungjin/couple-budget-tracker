import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import LoginPage from './pages/auth/LoginPage';
import { colorVars } from './shared/lib/vanilla-extract/color.css.ts';
import AuthGuard from './shared/ui/auth-guard/AuthGuard.tsx';
import './styles/initialize.css';
import './styles/reset.css';
import { BrowserRouter, Route, Routes } from 'react-router';
import { QueryProvider } from './shared/lib/react-query/reactQuery.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

rootElement.className = colorVars;
createRoot(rootElement).render(
  <BrowserRouter basename="/">
    <QueryProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/:ledgerId/*"
          element={
            <AuthGuard>
              <App />
            </AuthGuard>
          }
        />
      </Routes>
    </QueryProvider>
  </BrowserRouter>
);
