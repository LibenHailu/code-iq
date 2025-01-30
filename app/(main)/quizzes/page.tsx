import { CourseList } from '@/features/quiz';
import {
  AuthGetCurrentUserServer,
  cookiesClient,
} from '@/utils/amplify-utils';

export default async function QuizzesPage() {
  const user = await AuthGetCurrentUserServer();
  const { data: courses } =
    await cookiesClient.models.Course.list({
      selectionSet: ['id', 'title'],
    });

  const { data: activeCourse } =
    await cookiesClient.models.ActiveCourse.listActiveCourseByUserEmail(
      {
        userEmail: user?.signInDetails?.loginId,
        selectionSet: ['courseId'],
      }
    );

  return (
    <div className="h-full w-full">
      <h1 className="text-xl font-bold">
        Choose a topic
      </h1>
      <CourseList
        courses={courses}
        activeCourseId={
          activeCourse && activeCourse[0].courseId
        }
      />
    </div>
  );
}
