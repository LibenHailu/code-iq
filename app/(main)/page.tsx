import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { AuthGetCurrentUserServer } from '@/utils/amplify-utils';
export default async function LandingPage() {
  const user = await AuthGetCurrentUserServer();
  return (
    <div className="max-w-[988px] mx-auto shrink-0 flex-1 w-full flex flex-col lg:flex-row items-center justify-center p-4 gap-2">
      <div className="relative w-[240px] h-[240px] lg:w-[424px] lg:h-[424px] mb-8 lg:mb-0">
        <Image src="/hero.svg" fill alt="Hero" />
      </div>
      <div className="flex flex-col items-center gap-y-8">
        <h1 className="text-xl lg:text-3xl font-bold max-w-[480px] text-center">
          Learn, practice, and master new skills with
          CodeIQ quizzes.
        </h1>
        <div className="flex flex-col items-center gap-y-3 max-w-[330px] w-full">
          {!user ? (
            <Button
              size="lg"
              variant="outline"
              className="w-full"
            >
              <Link href="/login">Get Started</Link>
            </Button>
          ) : (
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              asChild
            >
              <Link href="/home">Continue Learning</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
