'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { icons, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

import { Logo } from './logo';
import { NavBarIcon, NavBarItem } from './navbar-item';

export const MobileNavbar = () => {
  const pathname = usePathname();
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

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

  if (!isMounted) {
    return null;
  }

  type RouteObject = {
    leading: keyof typeof icons;
    href: string;
    label: string;
    active: boolean;
  };

  const routes: RouteObject[] = [
    {
      leading: 'House',
      href: '/home',
      label: 'Home',
      active: pathname === `/home`,
    },
    {
      leading: 'FileQuestion',
      href: '/quizzes',
      label: 'Quizzes',
      active: pathname.startsWith(`/quizzes`),
    },
    {
      leading: 'Flame',
      href: '/leaderboard',
      label: 'Leaderboard',
      active: pathname === `/leaderboard`,
    },
  ];

  return (
    <>
      {isAuthenticated ? (
        <>
          <Button
            onClick={() => setIsOpen(true)}
            className="block md:hidden mr-2"
            variant="outline"
            size="sm"
          >
            <Menu className="h-4 w-4" />
          </Button>
          <Sheet
            open={isOpen}
            onOpenChange={() => setIsOpen(false)}
          >
            <SheetContent
              side="left"
              className="p-2 pt-10"
            >
              <div className="fixed md:border-r w-56 h-full md:pt-6 pt-4 overflow-y-hidden bg-background z-20">
                <div className="font-normal text-xs text-muted-foreground flex items-center mb-1">
                  <span className="pl-4">Menu</span>
                </div>
                <div className="py-4">
                  <nav className="flex flex-col pl-4 gap-1 md:gap-2 ">
                    {routes.map((route) => (
                      <NavBarItem
                        key={route.href}
                        href={route.href}
                        iconName={route.leading}
                        active={route.active}
                        label={route.label}
                        renderNavBarItem={(
                          props,
                          state
                        ) =>
                          state.isHovered ||
                          state.active ? (
                            <NavBarIcon
                              {...props}
                              className={cn(
                                props.className,
                                'text-primary'
                              )}
                              strokeWidth={3}
                            />
                          ) : (
                            <NavBarIcon {...props} />
                          )
                        }
                      />
                    ))}
                  </nav>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </>
      ) : (
        <div className="block md:hidden mr-2">
          <Logo />
        </div>
      )}
    </>
  );
};
