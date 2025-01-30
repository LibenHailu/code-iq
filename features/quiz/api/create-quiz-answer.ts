import { useMutation } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';

import type { Schema } from '@/amplify/data/resource';
import { useToast } from '@/hooks/use-toast';

import { useQuizStore } from '../store/use-quiz-stat';
import { CreateQuizAnswer } from '../types';

type CreateQuizAnswerOptions = {
  data: CreateQuizAnswer;
};

const client = generateClient<Schema>();

export const createQuizAnswer = ({
  data,
}: CreateQuizAnswerOptions) => {
  return client.models.UserAnswer.create(data);
};

export const useCreateQuizAnswer = () => {
  const { toast } = useToast();
  const { addAnswer } = useQuizStore();
  const { mutate: submit, isPending } = useMutation({
    mutationFn: createQuizAnswer,
    onSuccess: (data) => {
      addAnswer(
        data.data?.questionId as string,
        data.data?.correctAnswer as string,
        data.data?.userAnswer
      );
    },
    onError: () => {
      toast({
        title: 'An error occurred',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  return { submit, isLoading: isPending };
};
