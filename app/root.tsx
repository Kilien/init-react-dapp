import {
  isRouteErrorResponse,
  Outlet,
  useRouteError,
  useNavigate,
} from 'react-router-dom';
import React, { Suspense, useEffect } from 'react';
import { ContextProviders, Layout } from './providers';
import '@rainbow-me/rainbowkit/styles.css';
import { ToastContainer } from 'react-toastify';

export default function App() {
  return (
    <ContextProviders>
      <Layout>
        <Suspense
          fallback={
            <div className="flex min-h-screen items-center justify-center">
              loading...
            </div>
          }
        >
          <Outlet />

          <ToastContainer
            position="top-center"
            autoClose={5000}
            hideProgressBar
            theme="colored"
          />
        </Suspense>
      </Layout>
    </ContextProviders>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  const navigate = useNavigate();

  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      is404 = true;
    }
    message = `${error.status} ${error.statusText}`;
    details = error.data?.message || details;
  } else if (error instanceof Error) {
    details = error.message;
  }

  // 404错误直接重定向到首页
  useEffect(() => {
    if (is404) {
      navigate('/', { replace: true });
    }
  }, [is404, navigate]);

  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-8">
      <div className="text-center">
        <h1 className="mb-2 text-5xl font-bold text-red-500">{message}</h1>
        <p className="mb-6 text-lg opacity-70">{details}</p>
        <a
          href="/"
          className="rounded bg-blue-500 px-6 py-2 text-white hover:bg-blue-600"
        >
          Back to Home
        </a>
      </div>
    </main>
  );
}
