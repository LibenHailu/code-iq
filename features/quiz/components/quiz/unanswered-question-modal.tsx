'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { useRouter } from 'next/navigation';
import {
  Dispatch,
  SetStateAction,
  TransitionStartFunction,
  useEffect,
  useState,
} from 'react';
import { useMedia } from 'react-use';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import { useCreateSubmitQuiz } from '../../api/create-submit-exam';
import { useQuizStore } from '../../store/use-quiz-stat';

type Props = {
  startTransition: TransitionStartFunction;
  setActiveIndex: Dispatch<SetStateAction<number>>;
  open: boolean;
  close: () => void;
};
export const UnansweredQuestionModal = ({
  startTransition,
  open,
  close,
}: Props) => {
  const [isClient, setIsClient] = useState(false);
  const { user } = useAuthenticator((context) => [
    context.user,
  ]);
  const createSubmitQuiz = useCreateSubmitQuiz();
  const { answers } = useQuizStore();
  const isMobile = useMedia('(max-width: 1024px)');
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const onSubmitHandler = () => {
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
      startTransition(() => {
        createSubmitQuiz.submit({
          data: {
            userEmail: user.signInDetails
              ?.loginId as string,
            score: calculatedScore,
          },
        });
        router.replace('/quizzes');
      });
    } catch (error) {
      console.error(error);
    } finally {
      close();
    }
  };

  return (
    <Dialog open={open} onOpenChange={close}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            You have unanswered questions
          </DialogTitle>
          <DialogDescription className="text-base">
            Are you sure do you want to submit.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mb-4">
          <div className="flex w-full gap-x-2 justify-end">
            <Button
              variant="default"
              className="w-fit"
              size={isMobile ? 'sm' : 'lg'}
              onClick={onSubmitHandler}
              disabled={createSubmitQuiz.isLoading}
            >
              Submit
            </Button>
            <Button
              variant="destructive"
              className="w-fit"
              size={isMobile ? 'sm' : 'lg'}
              onClick={() => close()}
              disabled={createSubmitQuiz.isLoading}
            >
              Cancel
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
