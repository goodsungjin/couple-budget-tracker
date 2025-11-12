import { createRoot } from 'react-dom/client';
import { colorVars } from './shared/lib/vanilla-extract/color.css.ts';
import './styles/initialize.css';
import './styles/reset.css';
import './main.css';
import { RouterProvider } from 'react-router';
import { browserRouter } from '@/shared/lib/react-router/model/router.tsx';
import { QueryProvider } from './shared/lib/react-query/reactQuery.tsx';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

rootElement.className = colorVars;
createRoot(rootElement).render(
  <QueryProvider>
    <RouterProvider router={browserRouter} />
  </QueryProvider>
);
