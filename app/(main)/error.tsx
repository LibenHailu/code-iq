'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

import { Button } from '@/components/ui/button';

// eslint-disable-next-line sonarjs/no-globals-shadowing
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <X className="w-8 h-8 text-primary mx-auto" />
          <h2 className="mt-6 text-center text-lg font-semibold md:text-xl">
            Oh no, something went wrong!
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
            Oops! Something went wrong. Please try again.
          </p>
        </div>
        <div className="mt-5">
          <Button
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium "
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
