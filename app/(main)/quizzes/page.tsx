import { CourseList } from '@/features/course';
import { cookiesClient } from '@/utils/amplify-utils';

export default async function QuizzesPage() {
  const { data: courses } =
    await cookiesClient.models.Course.list();

  return (
    <div className="h-full w-full">
      <h1 className="text-xl font-bold">Choose Topic</h1>

      <CourseList
        courses={courses}
        activeCourseId="123"
      />
    </div>
  );
}
