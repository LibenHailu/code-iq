import { useMutation } from '@tanstack/react-query';
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'next/navigation';

import type { Schema } from '@/amplify/data/resource';
import { useToast } from '@/hooks/use-toast';

import { useQuizStore } from '../store/use-quiz-stat';

type CreateSubmitQuizOptions = {
  data: {
    score: number;
    userEmail: string;
  };
};

const client = generateClient<Schema>();

export const createSubmitQuiz = ({
  data,
}: CreateSubmitQuizOptions) => {
  return client.models.UserScore.listUserScoreByUserEmail(
    {
      userEmail: data.userEmail,
    }
  ).then((userScore) => {
    if (userScore.data.length > 0) {
      return client.models.UserScore.update({
        id: userScore.data[0].id,
        score:
          Number(userScore?.data[0]?.score) + data.score,
      });
    } else {
      return client.models.UserScore.create(data);
    }
  });
};

export const useCreateSubmitQuiz = () => {
  const { toast } = useToast();
  const { resetAnswers } = useQuizStore();
  const router = useRouter();
  const { mutate: submit, isPending } = useMutation({
    mutationFn: createSubmitQuiz,
    onSuccess: (data) => {
      router.replace(`/quizzes`);
      resetAnswers();
      toast({
        title: 'Quiz Completed!',
        description: `Congratulations! You have successfully completed the quiz. your current score is ${data?.data?.score}.`,
      });
    },
    onError: (err) => {
      console.log(err);
      toast({
        title: 'An error occurred',
        description: 'Something went wrong',
        variant: 'destructive',
      });
    },
  });

  return { submit, isLoading: isPending };
};
