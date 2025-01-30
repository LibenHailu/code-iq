import {
  LeaderBoard,
  UserScore,
} from '@/features/leaderboard';
import {
  AuthGetCurrentUserServer,
  cookiesClient,
} from '@/utils/amplify-utils';

export default async function Leaderboard() {
  const user = await AuthGetCurrentUserServer();
  const { data: leaderboard } =
    (await cookiesClient.models.UserScore.list({
      selectionSet: ['userEmail', 'score'],
    })) as { data: UserScore[] };

  leaderboard.sort((a, b) => b.score - a.score);
  const myScoreIndex = leaderboard.findIndex(
    (userScore) =>
      userScore.userEmail === user?.signInDetails?.loginId
  );

  const myScore =
    myScoreIndex == -1
      ? {
          userEmail:
            user?.signInDetails?.loginId || 'unknown',
          score: 0,
          rank: leaderboard.length,
        }
      : {
          ...leaderboard[myScoreIndex],
          rank: myScoreIndex,
        };
  return (
    <>
      <LeaderBoard
        leaderboard={leaderboard.slice(0, 11)}
        myScore={myScore}
      />
    </>
  );
}
