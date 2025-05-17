import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './app/app.css';
import { router } from './app/routes';

// 全局错误处理
const handleError = (error: Error) => {
  console.error('全局错误:', error);
};

// 添加全局错误处理
window.addEventListener('error', (event) => handleError(event.error));
window.addEventListener('unhandledrejection', (event) =>
  handleError(event.reason),
);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

// 为ImportMeta添加类型声明
declare global {
  interface ImportMeta {
    env: Record<string, any>;
  }
}

// 使用StrictMode仅在开发环境
if (import.meta.env.DEV) {
  root.render(
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>,
  );
} else {
  root.render(<RouterProvider router={router} />);
}
