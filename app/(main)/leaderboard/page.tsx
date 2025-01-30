import { LeaderBoard } from '@/features/leaderboard';
import { cookiesClient } from '@/utils/amplify-utils';

export default function Leaderboard() {
  const { data: leaderboard } =
    cookiesClient.models.UserScore.list();

  return <LeaderBoard leaderboard={leaderboard} />;
}
