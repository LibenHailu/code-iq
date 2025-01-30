import { create } from 'zustand';

type Answer = {
  correctAnswer: string;
  userAnswer: string;
};

type QuizState = {
  answers: Record<string, Answer>;
  resetAnswers: () => void;
  addAnswer: (
    questionId: string,
    correctAnswer: string,
    userAnswer: string
  ) => void;
};

export const useQuizStore = create<QuizState>((set) => ({
  answers: {},
  resetAnswers: () => set({ answers: {} }),
  addAnswer: (questionId, correctAnswer, userAnswer) =>
    set((state) => ({
      answers: {
        ...state.answers,
        [questionId]: { correctAnswer, userAnswer },
      },
    })),
}));
