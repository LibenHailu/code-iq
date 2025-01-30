import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Page from '../app/(main)/home/page';

jest.mock('@/utils/amplify-utils', () => ({
  AuthGetCurrentUserServer: jest.fn().mockResolvedValue({
    signInDetails: { loginId: 'test@example.com' },
  }),
  cookiesClient: {
    models: {
      ActiveCourse: {
        listActiveCourseByUserEmail: jest
          .fn()
          .mockResolvedValue({
            data: [
              {
                course: jest
                  .fn()
                  .mockResolvedValue({
                    data: {
                      title: 'Mock Course',
                      id: '1',
                    },
                  }),
              },
            ],
          }),
      },
      Course: {
        list: jest.fn().mockResolvedValue({
          data: [
            { id: '1', title: 'Course 1' },
            { id: '2', title: 'Course 2' },
            { id: '3', title: 'Course 3' },
            { id: '4', title: 'Course 4' },
          ],
        }),
      },
    },
  },
}));

describe('Home Page Component', () => {
  it('renders the welcome message', async () => {
    render(<Page />);
    const welcomeMessage = await screen.findByText(
      /Welcome to CodeIQ/i
    );
    expect(welcomeMessage).toBeInTheDocument();
  });

  it('renders the active course title', async () => {
    render(<Page />);
    const courseTitle =
      await screen.findByText(/Mock Course/i);
    expect(courseTitle).toBeInTheDocument();
  });

  it('renders a list of courses', async () => {
    render(<Page />);
    const courseList = await screen.findAllByRole(
      'heading',
      { level: 3 }
    );
    expect(courseList).toHaveLength(4);
  });

  it('renders the "Continue" button for active course', async () => {
    render(<Page />);
    const continueButton = await screen.findByRole(
      'link',
      { name: /Continue/i }
    );
    expect(continueButton).toBeInTheDocument();
  });
});
