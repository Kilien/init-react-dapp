import { isRouteErrorResponse, Outlet, useRouteError } from 'react-router-dom';
import React, { Suspense } from 'react';
import { ContextProviders, Layout } from './providers';
import '@rainbow-me/rainbowkit/styles.css';
import { Bounce, ToastContainer } from 'react-toastify';

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
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Bounce}
          />
        </Suspense>
      </Layout>
    </ContextProviders>
  );
}

// 提取错误信息处理逻辑到单独函数
const getErrorDetails = (errorToUse: unknown) => {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(errorToUse)) {
    is404 = errorToUse.status === 404;
    message = is404 ? '404' : 'Error';
    details = is404
      ? 'Sorry, the page you are looking for does not exist or has been deleted.'
      : errorToUse.statusText || details;
  } else if (import.meta.env.DEV && errorToUse && errorToUse instanceof Error) {
    details = (errorToUse as Error).message;
    stack = (errorToUse as Error).stack;
  }

  return { message, details, stack, is404 };
};

export function ErrorBoundary({ error }: { error?: unknown }) {
  const routeError = useRouteError();
  const errorToUse = error || routeError;
  const { message, details, stack, is404 } = getErrorDetails(errorToUse);

  if (is404) {
    return (
      <main className="from-base-100 via-primary/10 to-secondary/10 dark:from-base-200 dark:via-primary/20 dark:to-secondary/20 flex min-h-[100vh] flex-col items-center justify-center bg-gradient-to-br px-4 transition-colors">
        <div className="relative flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <h1 className="text-error animate-bounce-slow z-10 text-[8rem] font-extrabold drop-shadow-lg select-none md:text-[10rem]">
              404
            </h1>
          </div>
          <p className="text-base-content/70 mt-2 mb-8 text-xl font-medium md:text-2xl">
            {details}
          </p>
          <a
            href="/"
            className="btn btn-wide text-lg font-semibold shadow-xl transition-transform duration-200 hover:scale-105 hover:shadow-2xl"
          >
            Back to Home
          </a>
        </div>
        {stack && (
          <pre className="bg-base-200/80 rounded-box mt-8 w-full max-w-2xl overflow-x-auto p-4 text-left text-xs md:text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    );
  }

  return (
    <main className="bg-base-100 dark:bg-base-200 flex min-h-[60vh] flex-col items-center justify-center gap-8 transition-colors">
      <div className="text-center">
        <h1 className="text-error mb-2 text-5xl font-bold drop-shadow">
          {message}
        </h1>
        <p className="text-base-content/70 mb-6 text-lg">{details}</p>
        <a
          href="/"
          className="btn btn-wide shadow transition-transform hover:scale-105"
        >
          Back to Home
        </a>
      </div>
      {stack && (
        <pre className="bg-base-200 rounded-box mt-6 w-full max-w-2xl overflow-x-auto p-4 text-left">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
