import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <meta httpEquiv="Content-Security-Policy" content="style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;" /> */}
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;
  let is404 = false;

  if (isRouteErrorResponse(error)) {
    is404 = error.status === 404;
    message = is404 ? "404" : "Error";
    details = is404
      ? "Sorry, the page you are looking for does not exist or has been deleted."
      : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  if (is404) {
    return (
      <main className="flex flex-col items-center justify-center min-h-[80vh] px-4 bg-gradient-to-br from-base-100 via-primary/10 to-secondary/10 dark:from-base-200 dark:via-primary/20 dark:to-secondary/20 transition-colors">
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
