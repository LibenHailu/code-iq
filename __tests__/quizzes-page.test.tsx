import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import QuizzesPage from '../app/(main)/quizzes/page'; // Adjust the import path as necessary

// Mock the external dependencies
jest.mock('@/utils/amplify-utils', () => ({
  AuthGetCurrentUserServer: jest.fn().mockResolvedValue({
    signInDetails: { loginId: 'test@example.com' },
  }),
  cookiesClient: {
    models: {
      Course: {
        list: jest.fn().mockResolvedValue({
          data: [
            { id: '1', title: 'Course 1' },
            { id: '2', title: 'Course 2' },
          ],
        }),
      },
      ActiveCourse: {
        listActiveCourseByUserEmail: jest
          .fn()
          .mockResolvedValue({
            data: [{ courseId: '1' }],
          }),
      },
    },
  },
}));

describe('Quizzes Page Component', () => {
  it('renders the page title', async () => {
    render(<QuizzesPage />);
    const pageTitle =
      await screen.findByText(/Choose a topic/i);
    expect(pageTitle).toBeInTheDocument();
  });

  it('renders the list of courses with the active course highlighted', async () => {
    render(<QuizzesPage />);
    const course1 = await screen.findByText(/Course 1/i);
    expect(course1).toBeInTheDocument();

    const course2 = await screen.findByText(/Course 2/i);
    expect(course2).toBeInTheDocument();

    const activeCourse = await screen.findByText(
      /Course 1 \(Active\)/i
    );
    expect(activeCourse).toBeInTheDocument();
  });
});
