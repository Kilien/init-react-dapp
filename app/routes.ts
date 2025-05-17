import { createBrowserRouter } from 'react-router-dom';
import App, { ErrorBoundary } from './root';
import React from 'react';

// 懒加载页面组件
const HomePage = React.lazy(() => import('./routes/home'));
const TestPage = React.lazy(() => import('./routes/test'));

// 创建路由配置
const routes = [
  {
    path: '/',
    element: React.createElement(App),
    errorElement: React.createElement(ErrorBoundary),
    children: [
      {
        index: true,
        element: React.createElement(
          React.Suspense,
          { fallback: React.createElement('div', null, 'loading...') },
          React.createElement(HomePage),
        ),
      },
      {
        path: 'test',
        element: React.createElement(
          React.Suspense,
          { fallback: React.createElement('div', null, 'loading...') },
          React.createElement(TestPage),
        ),
      },
    ],
  },
];

// 创建路由器
export const router = createBrowserRouter(routes);
