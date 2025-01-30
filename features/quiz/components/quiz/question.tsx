/* eslint-disable sonarjs/no-duplicate-string */
import { CircleCheck, CircleX } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';

import { cn } from '@/lib/utils';

type QuestionProps = {
  question: string;
};

export const Question = ({ question }: QuestionProps) => {
  return (
    <div className="text-base">
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
      >
        {question}
      </ReactMarkdown>
    </div>
  );
};

type Props = {
  optionId: string;
  optionText: string;
  optionLetter: string;
  onSelect: (id: string) => void;
  status: 'correct' | 'wrong' | 'none';
  selectedOption?: string;
  answerId: string;
  disabled?: boolean;
  selected?: boolean;
};

export const OptionCard = ({
  optionId,
  optionText,
  onSelect,
  status,
  disabled,
  selected,
  answerId,
}: Props) => {
  return (
    <div
      onClick={() => onSelect(optionId)}
      aria-disabled={disabled}
      className={cn(
        'h-full cursor-pointer rounded-sm border border-primary/30 p-2 hover:bg-black/5 lg:p-4',
        selected &&
          status === 'correct' &&
          'border-green-700 bg-green-100 hover:bg-green-100',
        selected &&
          status === 'correct' &&
          'border-green-700 bg-green-100 hover:bg-green-100',
        selected &&
          status === 'wrong' &&
          'border-destructive bg-rose-100 hover:bg-rose-100',
        disabled && 'pointer-events-none',

        status === 'wrong' &&
          answerId === optionId &&
          'border-green-700 bg-green-100 hover:bg-green-100',

        status === 'wrong' &&
          answerId === optionId &&
          'border-green-700 bg-green-100 hover:bg-green-100'
      )}
    >
      <div className={cn('flex items-center space-x-3')}>
        <div
          className={cn(
            'aspect-square h-4 w-4 sm:h-5 sm:w-5 rounded-full border border-primary text-primary shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
          )}
        >
          <div className="flex w-full h-full items-center justify-center">
            {answerId === optionId &&
              status == 'wrong' && (
                <CircleCheck className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-green-500 text-white" />
              )}

            {selected && status === 'wrong' && (
              <CircleX className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-rose-500 text-white" />
            )}
            {selected && status === 'correct' && (
              <CircleCheck className="h-3.5 w-3.5 sm:h-5 sm:w-5 fill-green-500 text-white" />
            )}
          </div>
        </div>

        <p
          className={cn(
            'text-sm lg:text-base',
            selected &&
              status === 'correct' &&
              'text-primary',
            selected &&
              status === 'wrong' &&
              'text-rose-500'
          )}
        >
          <ReactMarkdown
            remarkPlugins={[remarkMath, remarkGfm]}
            rehypePlugins={[rehypeKatex]}
            className="font-semibold text-primary"
          >
            {optionText}
          </ReactMarkdown>
        </p>
      </div>
    </div>
  );
};
