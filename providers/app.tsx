'use client';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { Toaster } from '@/components/ui/toaster';
import { queryClient } from '@/lib/react-query';

type AppProviderProps = { children: ReactNode };
export const AppProvider = ({
  children,
}: AppProviderProps) => {
  return (
    <ErrorBoundary
      fallback={
        <div className="w-full flex justify-center">
          Something went wrong!
        </div>
      }
      onError={console.error}
    >
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <main>
          {children}
          <ProgressBar
            height="4px"
            color="#080808"
            options={{ showSpinner: false }}
            shallowRouting
          />
          <Toaster />
        </main>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};
