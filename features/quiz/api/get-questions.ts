import { useQuery } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';

import type { Schema } from '@/amplify/data/resource';

type GetQuestionsOptions = {
  courseId: string;
};

const client = generateClient<Schema>();

export const getQuestions = async ({
  courseId,
}: GetQuestionsOptions) => {
  const res =
    await client.models.Question.listQuestionByCourseId({
      courseId,
    });

  return (
    res.data
      // eslint-disable-next-line sonarjs/pseudo-random
      .sort(() => (Math.random() > 0.5 ? 1 : -1))
      .slice(0, 10)
  );
};

export const useQuestions = ({
  courseId,
}: GetQuestionsOptions) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['quiz', courseId],
    queryFn: () => getQuestions({ courseId }),
    enabled: !!courseId,
  });
  return {
    data,
    isLoading,
    error,
  };
};
