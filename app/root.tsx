import { isRouteErrorResponse, Outlet, useRouteError } from 'react-router-dom';
import React, { Suspense } from 'react';

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-screen">
          loading...
        </div>
      }
    >
      <Outlet />
    </Suspense>
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
      <main className="flex flex-col items-center justify-center min-h-[100vh] px-4 bg-gradient-to-br from-base-100 via-primary/10 to-secondary/10 dark:from-base-200 dark:via-primary/20 dark:to-secondary/20 transition-colors">
        <div className="relative flex flex-col items-center">
          <div className="relative flex items-center justify-center">
            <h1 className="text-[8rem] md:text-[10rem] font-extrabold text-error drop-shadow-lg z-10 select-none animate-bounce-slow">
              404
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-base-content/70 mb-8 mt-2 font-medium">
            {details}
          </p>
          <a
            href="/"
            className="btn btn-wide shadow-xl text-lg font-semibold transition-transform hover:scale-105 hover:shadow-2xl duration-200"
          >
            Back to Home
          </a>
        </div>
        {stack && (
          <pre className="w-full max-w-2xl p-4 overflow-x-auto bg-base-200/80 rounded-box text-left mt-8 text-xs md:text-sm">
            <code>{stack}</code>
          </pre>
        )}
      </main>
    );
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-[60vh] gap-8 bg-base-100 dark:bg-base-200 transition-colors">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-error mb-2 drop-shadow">
          {message}
        </h1>
        <p className="text-lg text-base-content/70 mb-6">{details}</p>
        <a
          href="/"
          className="btn  btn-wide shadow hover:scale-105 transition-transform"
        >
          Back to Home
        </a>
      </div>
      {stack && (
        <pre className="w-full max-w-2xl p-4 overflow-x-auto bg-base-200 rounded-box text-left mt-6">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
