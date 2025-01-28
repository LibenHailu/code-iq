'use client';
import { LucideProps, icons } from 'lucide-react';
import Link from 'next/link';
import React, { ReactElement, useState } from 'react';

import { cn } from '@/lib/utils';

type NavBarItemProps = {
  renderNavBarItem: (
    props: NavBarIconProps,
    state: NavBarIconState
  ) => ReactElement;
  label: string;
  iconName: keyof typeof icons;
  href: string;
  active: boolean;
};
const NavBarItem: React.FC<NavBarItemProps> = ({
  renderNavBarItem,
  label,
  active,
  href,
  iconName,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const defaultNavBarItemParams: NavBarIconProps = {
    icon: iconName,
    className: 'w-3 h-3 md:w-4 md:h-4',
    strokeWidth: 2,
  };
  return (
    <Link
      href={href}
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      className={cn(
        'flex gap-4 py-1 justify-start items-center text-sm',
        'md:text-sm font-medium transition-colors',
        active || isHovered
          ? 'text-muted-foreground font-bold lg:border-r-[3px] lg:border-primary'
          : 'text-muted-foreground'
      )}
    >
      {renderNavBarItem(defaultNavBarItemParams, {
        isHovered,
        active,
      })}
      {label}
    </Link>
  );
};

interface NavBarIconProps extends LucideProps {
  icon: keyof typeof icons;
  className: string;
  strokeWidth: number;
}

type NavBarIconState = {
  isHovered: boolean;
  active: boolean;
};

const NavBarIcon: React.FC<NavBarIconProps> = React.memo(
  ({ icon, ...props }) => {
    const LucideIcon = icons[icon];
    return <LucideIcon {...props} />;
  }
);

NavBarIcon.displayName = 'NavBarIcon';

export { NavBarItem, NavBarIcon };
