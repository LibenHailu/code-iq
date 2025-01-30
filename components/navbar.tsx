'use client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { signOut } from 'aws-amplify/auth';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  useEffect,
  useState,
  useTransition,
} from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { Logo } from './logo';
import { MobileNavbar } from './mobile-navbar';
import { Skeleton } from './ui/skeleton';

export const Navbar = () => {
  const { authStatus } = useAuthenticator((context) => [
    context.authStatus,
    context.user,
  ]);

  const [isAuthenticated, setIsAuthenticated] =
    useState<boolean>(false);

  useEffect(() => {
    if (authStatus !== 'configuring') {
      setIsAuthenticated(authStatus === 'authenticated');
    }
  }, [authStatus]);

  const [isPending, startTransition] = useTransition();

  const router = useRouter();
  const pathname = usePathname();

  const routes = [
    {
      href: '/',
      label: 'Home',
      active: pathname === `/`,
    },
    {
      href: '/quizzes',
      label: 'Quizzes',
      active: pathname.startsWith('/quizzes'),
    },
    {
      href: '/leaderboard',
      label: 'Leaderboard',
      active: pathname === `/leaderboard`,
    },
  ];

  if (authStatus === 'configuring') {
    return (
      <div className="fixed z-50 top-0 px-4 w-full  border-b shadow-sm  backdrop-filter backdrop-blur-lg">
        <div className="max-w-[1308px] flex h-14 items-center mx-auto">
          <Skeleton className="h-9 w-9 md:hidden" />
          <div className="md:flex hidden items-center space-x-4 ">
            <Skeleton className="h-9 w-10" />
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-16" />
            <Skeleton className="h-9 w-20 " />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Skeleton className="h-9 w-28" />
          </div>
        </div>
      </div>
    );
  }

  const getClassName = (active: boolean) => {
    return cn(
      'text-sm font-medium transition-colors hover:text-primary',
      active
        ? 'text-black dark:text-white '
        : ' text-muted-foreground'
    );
  };

  return (
    <nav className="fixed z-50 top-0 px-4 w-full border-b shadow-sm  backdrop-filter backdrop-blur-lg">
      <div className="max-w-[1308px] flex h-14 items-center mx-auto">
        <MobileNavbar />
        <div className="hidden md:flex">
          <Logo />
          <nav className="flex items-center space-x-4 lg:space-x-4">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={getClassName(route.active)}
              >
                {route.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              size="sm"
              variant="outline"
              className="w-full"
              onClick={() =>
                startTransition(async () => {
                  await signOut();
                  router.push('/login');
                })
              }
            >
              {isPending ? (
                <Loader2 className="animate-spin w-4 h-4 mx-4" />
              ) : (
                <p>Logout</p>
              )}
            </Button>
          ) : (
            <Button size="sm" variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
};
