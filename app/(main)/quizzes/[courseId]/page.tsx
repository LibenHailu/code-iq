'use client';
import { Quiz, useQuestions } from '@/features/quiz';

import Loading from '../../loading';

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
      <div className="flex h-full w-full items-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Quiz questions={data} />
    </>
  );
}
