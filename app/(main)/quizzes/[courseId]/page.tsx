'use client';
import { Loader2 } from 'lucide-react';

import { Quiz, useQuestions } from '@/features/quiz';

export default function QuizPage({
  params: { courseId },
}: {
  params: { courseId: string };
}) {
  const { data, isLoading, error } = useQuestions({
    courseId: courseId,
  });

  if (error) {
    throw new Error('Something went wrong');
  }

  if (isLoading || !data) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Quiz questions={data} />
    </>
  );
}
