'use client';

import { useAuthenticator } from '@aws-amplify/ui-react';
import { generateClient } from 'aws-amplify/api';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { Schema } from '@/amplify/data/resource';

import { Course } from '../../types';

import { CourseCard } from './course-card';

type Props = {
  courses: Course[];
  activeCourseId?: string;
};

const client = generateClient<Schema>();

export const CourseList = ({
  courses,
  activeCourseId,
}: Props) => {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const { user } = useAuthenticator((context) => [
    context.user,
  ]);
  const onClick = (id: string) => {
    if (pending) return;

    if (id === activeCourseId) {
      return router.push(`/quizzes/${id}`);
    }

    startTransition(() => {
      // add topic to users progress
      client.models.ActiveCourse.list().then(
        (courses) => {
          if (courses.data) {
            client.models.ActiveCourse.update({
              id: courses.data[0]?.id as string,
              courseId: id,
            });
          } else {
            client.models.ActiveCourse.create({
              userEmail: user.signInDetails?.loginId,
              courseId: id,
            });
          }
        }
      );
    });

    return router.push(`/quizzes/${id}`);
  };

  return (
    <div className="pt-6 grid grid-cols-1 sm:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] gap-4">
      {courses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          onClick={onClick}
          disabled={pending}
          active={course.id === activeCourseId}
        />
      ))}
    </div>
  );
};
