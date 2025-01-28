'use client';

import { useTransition } from 'react';

import { Course } from '../../types';

import { CourseCard } from './course-card';

type Props = {
  courses: Course[];
  activeCourseId?: string; // infer from schema
};
export const CourseList = ({
  courses,
  activeCourseId,
}: Props) => {
  // const router = useRouter()
  const [pending, startTransition] = useTransition();

  const onClick = (id: string) => {
    // if (pending) return

    // if (id === activeCourseId) {
    //     return router.push("/learn")
    // }

    startTransition(() => {
      // add topic to users progress
      console.log(id);
    });
  };

  return (
    <div className="pt-6 grid grid-cols-2 lg:grid-cols-[repeat(auto-fill,_minmax(210px,_1fr))] gap-4">
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
