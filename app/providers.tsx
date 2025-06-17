'use client';

import type React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider } from 'wagmi';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';

import { config } from './wagmi';
import Header from './components/Header';
import Footer from './components/Footer';

const queryClient = new QueryClient();

// 只包含 Context Providers，不包含布局组件
export function ContextProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// 包含 Header 和 Footer 的布局组件
export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

// 保持向后兼容的 Providers 组件（如果其他地方有使用）
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ContextProviders>
      <Layout>{children}</Layout>
    </ContextProviders>
  );
}
