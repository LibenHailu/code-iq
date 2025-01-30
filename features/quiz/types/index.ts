import { type Schema } from '@/amplify/data/resource';

export type Nullable<T> = T | null;

type CourseFromSchema = Schema['Course']['type'];

export type QuestionSchema = Schema['Question']['type'];

export type Question = Pick<
  QuestionSchema,
  | 'choiceA'
  | 'choiceB'
  | 'choiceC'
  | 'choiceD'
  | 'correctAnswer'
  | 'courseId'
  | 'description'
  | 'explanation'
  | 'id'
>;

export type CreateQuizAnswer = {
  questionId?: string;
  userAnswer?: string;
  correctAnswer?: string;
  userEmail?: string;
};

export type Course = Omit<
  Pick<CourseFromSchema, 'id' | 'title'>,
  'images' | 'activeCourse'
> & {
  //   images: CourseImage;
  mainImageS3Key: Nullable<string>;
};

// type ImageFromSchema = Schema['CourseImage']['type'];

// export type CourseImage = Partial<
//   Pick<
//     ImageFromSchema,
//     'id' | 's3Key' | 'alt' | 'courseId'
//   >
// > & {
//   s3Key: Nullable<string>;
// };

export type Message = {
  type: 'error' | 'success';
  content: string;
};
