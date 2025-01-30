'use client';

import { Check } from 'lucide-react';
import Image from 'next/image';

import { cn } from '@/lib/utils';

type Props = {
  title: string;
  id: string;
  onClick: (id: string) => void;
  disabled?: boolean;
  active?: boolean;
};
export function CourseCard({
  title,
  id,
  onClick,
  disabled,
  active,
}: Props) {
  return (
    <div
      onClick={() => onClick(id)}
      className={cn(
        'h-full border  rounded-xl hover:bg-black/5 cursor-pointer active:border-b-2 flex flex-col items-center justify-between p-3 pb-6 min-h-[150px] min-w-[200px]',
        disabled && 'pointer-events-none opacity-50'
      )}
    >
      <div className="min-h-[24px] w-full flex items-center justify-end">
        {active && (
          <div className="rounded-md bg-green-500 flex items-center justify-center p-1.5">
            <Check className="text-white stroke-[4] h-3 w-3" />
          </div>
        )}
      </div>
      <Image
        src="/logo/logo.svg"
        alt={title}
        height={70}
        width={93.33}
      />

      <p className="text-center mt-3 text-sm font-medium">
        {title}
      </p>
    </div>
  );
}
