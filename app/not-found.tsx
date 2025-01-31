import { X } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <X className="w-8 h-8 text-primary mx-auto" />
          <h2 className="mt-6 text-center text-lg font-semibold md:text-xl">
            Oops! Page not found
          </h2>
          <p className="mt-2 text-center text-sm font-medium text-muted-foreground">
            It seems the page you&apos;re looking for
            doesn&apos;t exist or has been moved.
          </p>
        </div>
        <div className="mt-5">
          <Button className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium ">
            <Link href="/">Go to homepage</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
