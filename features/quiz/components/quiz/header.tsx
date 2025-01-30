import { useAuthenticator } from '@aws-amplify/ui-react';
import { Dispatch, SetStateAction } from 'react';
import { useMedia } from 'react-use';

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

import { useCreateSubmitQuiz } from '../../api/create-submit-exam';
import { useQuizStore } from '../../store/use-quiz-stat';
import { Question } from '../../types';

type Props = {
  activeIndex: number;
  questions: Question[];
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export const Header = ({
  activeIndex,
  questions,
  setOpen,
}: Props) => {
  const isMobile = useMedia('(max-width: 1024px)');
  const { answers } = useQuizStore();
  const { user } = useAuthenticator((context) => [
    context.user,
  ]);
  const createSubmitQuiz = useCreateSubmitQuiz();

  const handleSubmit = () => {
    if (Object.keys(answers).length !== 10) {
      setOpen(true);
    } else {
      const calculatedScore = Object.keys(answers).reduce(
        (acc, key) => {
          return (
            acc +
            (answers[key].correctAnswer ===
            answers[key].userAnswer
              ? 1
              : 0)
          );
        },
        0
      );

      try {
        createSubmitQuiz.submit({
          data: {
            userEmail: user.signInDetails
              ?.loginId as string,
            score: calculatedScore,
          },
        });
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <header className="mx-auto flex w-full max-w-[1140px] items-center gap-x-4 sm:gap-x-7 sm:px-6 py-[15px] sm:py-[20px]  lg:px-0 ">
      <div className="flex items-center text-sm">
        {activeIndex + 1}/{questions.length}
      </div>
      <Progress
        value={
          ((activeIndex + 1) / questions.length) * 100
        }
        className="flex-1"
      />
      <Button
        variant="outline"
        size={isMobile ? 'sm' : 'lg'}
        onClick={handleSubmit}
      >
        End Quiz
      </Button>
    </header>
  );
};
