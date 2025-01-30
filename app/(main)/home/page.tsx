import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';
import { CourseList } from '@/features/quiz';
import {
  AuthGetCurrentUserServer,
  cookiesClient,
} from '@/utils/amplify-utils';

export default async function Home() {
  const user = await AuthGetCurrentUserServer();
  const { data: activeCourse } =
    await cookiesClient.models.ActiveCourse.listActiveCourseByUserEmail(
      {
        userEmail: user?.signInDetails?.loginId,
      }
    );

  const { data: courseData } =
    await activeCourse[0].course();

  const { data: courses } =
    await cookiesClient.models.Course.list({
      selectionSet: ['id', 'title'],
      limit: 4,
    });

  return (
    <div className="flex w-full flex-col gap-y-6">
      <h1 className="text-lg font-medium">
        Welcome to CodeIQ
      </h1>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center flex-wrap space-y-4">
            <div>
              <h3 className="font-medium">
                {courseData
                  ? courseData.title
                  : 'Select a topic to practice'}
              </h3>
              <p className="text-sm">
                {courseData
                  ? 'Continue studying to enhance your skills.'
                  : 'Choose a subject to enhance your skills.'}
              </p>
            </div>
            <Button asChild>
              {courseData ? (
                <Link href={`quizzes/${courseData.id}`}>
                  Continue
                </Link>
              ) : (
                <Link href={`quizzes`}>Start</Link>
              )}
            </Button>
          </div>
        </CardHeader>
      </Card>
      <div className="flex justify-between flex-wrap items-center">
        <h2 className="text-lg font-medium">
          Topic preview
        </h2>
        <Button variant="outline" asChild>
          <Link href="/quizzes">
            View all
            <ArrowRight />
          </Link>
        </Button>
      </div>
      <CourseList courses={courses} />
    </div>
  );
}
