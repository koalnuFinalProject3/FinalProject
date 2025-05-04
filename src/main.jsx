import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import router from './router.jsx';
import { RouterProvider } from 'react-router-dom';

// toastify import
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        theme="colored"
      />
    </QueryClientProvider>
  // </StrictMode>
);
