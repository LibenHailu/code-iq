import { type Schema } from '@/amplify/data/resource';

export type Nullable<T> = T | null;

type CourseFromSchema = Schema['Course']['type'];

export type Course = Omit<
  Pick<CourseFromSchema, 'id' | 'title'>,
  'images'
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
