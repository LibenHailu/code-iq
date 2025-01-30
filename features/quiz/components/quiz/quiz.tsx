'use client';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  useEffect,
  useState,
  useTransition,
} from 'react';
import ReactMarkdown from 'react-markdown';
import { useMedia } from 'react-use';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

import { useCreateQuizAnswer } from '../../api/create-quiz-answer';
import { useCreateSubmitQuiz } from '../../api/create-submit-exam';
import { useQuizStore } from '../../store/use-quiz-stat';
import { Question as QuestionType } from '../../types';

import { Header } from './header';
import { OptionCard, Question } from './question';
import { UnansweredQuestionModal } from './unanswered-question-modal';

export type QuizProps = {
  questions: QuestionType[];
};

export const Quiz = ({ questions }: QuizProps) => {
  const isMobile = useMedia('(max-width: 1024px)');
  const [pending, startTransition] = useTransition();
  const [activeIndex, setActiveIndex] = useState(0);
  const { user } = useAuthenticator((context) => [
    context.user,
  ]);
  const { answers, resetAnswers } = useQuizStore();
  const [open, setOpen] = useState(false);

  const createSubmitQuiz = useCreateSubmitQuiz();

  useEffect(() => {
    if (!currentQuestion) return;

    if (!answers[currentQuestion.id]) {
      setStatus('none');
    } else if (
      answers[currentQuestion.id].correctAnswer ===
      answers[currentQuestion.id].userAnswer
    ) {
      setStatus('correct');
    } else {
      setStatus('wrong');
    }
    setSelectedOption(
      answers[currentQuestion.id]?.userAnswer
    );
  }, [activeIndex]);

  function handleKeyEvent(event: KeyboardEvent) {
    if (event.key === 'ArrowLeft') {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (event.key === 'ArrowRight') {
      setActiveIndex((prev) =>
        Math.min(questions.length - 1, prev + 1)
      );
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', handleKeyEvent);
    resetAnswers();
    return () =>
      window.removeEventListener(
        'keydown',
        handleKeyEvent
      );
  }, []);

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

  const [selectedOption, setSelectedOption] =
    useState<string>();
  const [status, setStatus] = useState<
    'correct' | 'wrong' | 'none'
  >('none');
  const currentQuestion =
    questions[activeIndex === -1 ? 0 : activeIndex];

  const onNext = () => {
    setActiveIndex(activeIndex + 1);
  };

  const onPrev = () => {
    setActiveIndex(Math.max(activeIndex - 1, 0));
  };

  const createExamAnswer = useCreateQuizAnswer();

  const onSelect = (id: string) => {
    if (status !== 'none') return;

    setSelectedOption(id);

    if (currentQuestion.correctAnswer === id) {
      startTransition(() => {
        createExamAnswer.submit({
          data: {
            correctAnswer:
              currentQuestion.correctAnswer as string,
            questionId: currentQuestion.id,
            userAnswer: id,
            userEmail: user.signInDetails
              ?.loginId as string,
          },
        });
        setStatus('correct');
      });
    } else {
      startTransition(() => {
        createExamAnswer.submit({
          data: {
            correctAnswer:
              currentQuestion.correctAnswer as string,
            questionId: currentQuestion.id,
            userAnswer: id,
            userEmail: user.signInDetails
              ?.loginId as string,
          },
        });
        setStatus('wrong');
      });
    }
  };
  const btnClass =
    'rounded-sm bg-primary/90 hover:bg-primary/80';
  return (
    <>
      <UnansweredQuestionModal
        startTransition={startTransition}
        setActiveIndex={setActiveIndex}
        open={open}
        close={() => setOpen(false)}
      />
      <div className="flex-1 max-w-[1140px] mx-auto">
        <Header
          activeIndex={activeIndex}
          questions={questions}
          setOpen={setOpen}
        />
        <div className="w-full flex-1">
          <div className="flex h-full items-center justify-center">
            <div className="flex w-full flex-col gap-y-4 sm:px-6 lg:px-0">
              <p className="text-sm text-muted-foreground">
                Question {activeIndex + 1}
              </p>
              <Question
                question={
                  currentQuestion.description as string
                }
              />
              <div>
                <div className="space-y-2 md:space-y-3 lg:space-y-4">
                  <OptionCard
                    optionId={'choiceA'}
                    optionLetter="A"
                    optionText={
                      currentQuestion.choiceA as string
                    }
                    onSelect={onSelect}
                    status={status}
                    selected={
                      selectedOption === 'choiceA'
                    }
                    disabled={pending}
                    answerId={
                      currentQuestion.correctAnswer as string
                    }
                    selectedOption={selectedOption}
                  />
                  <OptionCard
                    optionId={'choiceB'}
                    optionLetter="B"
                    optionText={
                      currentQuestion.choiceB as string
                    }
                    onSelect={onSelect}
                    status={status}
                    selected={
                      selectedOption === 'choiceB'
                    }
                    disabled={pending}
                    answerId={
                      currentQuestion.correctAnswer as string
                    }
                    selectedOption={selectedOption}
                  />
                  <OptionCard
                    optionId={'choiceC'}
                    optionLetter="C"
                    optionText={
                      currentQuestion.choiceC as string
                    }
                    onSelect={onSelect}
                    status={status}
                    selected={
                      selectedOption === 'choiceC'
                    }
                    disabled={pending}
                    answerId={
                      currentQuestion.correctAnswer as string
                    }
                    selectedOption={selectedOption}
                  />
                  <OptionCard
                    optionId={'choiceD'}
                    optionLetter="D"
                    optionText={
                      currentQuestion.choiceD as string
                    }
                    onSelect={onSelect}
                    status={status}
                    selected={
                      selectedOption === 'choiceD'
                    }
                    disabled={pending}
                    answerId={
                      currentQuestion.correctAnswer as string
                    }
                    selectedOption={selectedOption}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-2 mt-2">
                <Button
                  onClick={onPrev}
                  className={cn(btnClass)}
                  size={isMobile ? 'sm' : 'lg'}
                  disabled={pending || activeIndex === 0}
                >
                  <div className="flex items-center justify-center gap-x-1">
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </div>
                </Button>
                <Button
                  onClick={onNext}
                  className={cn(
                    btnClass,
                    activeIndex ===
                      questions.length - 1 && 'hidden'
                  )}
                  size={isMobile ? 'sm' : 'lg'}
                  disabled={
                    pending ||
                    activeIndex === questions.length - 1
                  }
                >
                  <div className="flex items-center justify-center gap-x-1">
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </Button>

                <Button
                  onClick={handleSubmit}
                  className={cn(
                    btnClass,
                    activeIndex !==
                      questions.length - 1 && 'hidden'
                  )}
                  size={isMobile ? 'sm' : 'lg'}
                  disabled={pending}
                >
                  Submit
                </Button>
              </div>
              {status !== 'none' && (
                <Card>
                  <CardHeader>
                    <p className="text-base font-semibold">
                      Explanation
                    </p>
                    <p>Correct option</p>
                    <p className="font-semibold">
                      {
                        currentQuestion[
                          currentQuestion.correctAnswer as keyof QuestionType
                        ]
                      }
                    </p>
                  </CardHeader>
                  <CardContent>
                    <ReactMarkdown
                      remarkPlugins={[
                        remarkMath,
                        remarkGfm,
                      ]}
                      rehypePlugins={[rehypeKatex]}
                    >
                      {currentQuestion.explanation}
                    </ReactMarkdown>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
