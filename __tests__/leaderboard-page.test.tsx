import { render, screen } from '@testing-library/react';

import '@testing-library/jest-dom';
import Leaderboard from '../app/(main)/leaderboard/page'; // Adjust the import path as necessary

// Mock the dependencies
jest.mock('@/utils/amplify-utils', () => ({
  AuthGetCurrentUserServer: jest.fn().mockResolvedValue({
    signInDetails: { loginId: 'test@example.com' },
  }),
  cookiesClient: {
    models: {
      UserScore: {
        list: jest.fn().mockResolvedValue({
          data: [
            {
              userEmail: 'user1@example.com',
              score: 100,
            },
            { userEmail: 'user2@example.com', score: 90 },
            { userEmail: 'test@example.com', score: 80 },
          ],
        }),
      },
    },
  },
}));

describe('Leaderboard Page Component', () => {
  it('renders the leaderboard with user scores', async () => {
    render(<Leaderboard />);

    // Check for the leaderboard title
    const leaderboardTitle =
      await screen.findByText(/Leaderboard/i);
    expect(leaderboardTitle).toBeInTheDocument();

    // Check for user scores
    const user1Score = await screen.findByText(
      /user1@example.com: 100/i
    );
    expect(user1Score).toBeInTheDocument();

    const user2Score = await screen.findByText(
      /user2@example.com: 90/i
    );
    expect(user2Score).toBeInTheDocument();

    // Check for the current user's score and rank
    const myScore = await screen.findByText(
      /My Score: 80, Rank: 2/i
    );
    expect(myScore).toBeInTheDocument();
  });
});
