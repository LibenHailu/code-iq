import Image from 'next/image';

import {
  Avatar,
  AvatarImage,
} from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

import { UserScore } from '../../types';

type LeaderBoardProps = {
  leaderboard: UserScore[];
  myScore: UserScore & {
    rank: number;
  };
};
export const LeaderBoard = ({
  leaderboard,
  myScore,
}: LeaderBoardProps) => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex gap-x-2">
        <Image
          src="/leaderboard.svg"
          alt="Leaderboard"
          height={40}
          width={40}
        />
        <h1 className="font-bold text-lg my-6">
          Leaderboard
        </h1>
      </div>
      <Separator className="mb-4 h-0.5 rounded-full " />
      <div className="flex items-center w-full p-2 px-4 rounded-xl bg-gray-200/50">
        <p className="font-bold mr-4">
          {myScore.rank + 1}
        </p>
        <Avatar className="sm:block hidden border h-12 w-12 ml-3 mr-6">
          <AvatarImage
            src="/logo/logo.svg"
            className="object-cover"
          />
        </Avatar>
        <p className="font-medium flex-1">
          {myScore.userEmail}
        </p>
        <p className="text-muted-foreground">
          {myScore.score} Pts
        </p>
      </div>
      {leaderboard.map((userScore, index) => (
        <div
          key={userScore.userEmail}
          className="flex items-center w-full p-2 px-4 rounded-xl hover:bg-gray-200/50"
        >
          <p className="font-bold mr-4">{index + 1}</p>
          <Avatar className="sm:block hidden border h-12 w-12 ml-3 mr-6">
            <AvatarImage
              src="/logo/logo.svg"
              className="object-cover"
            />
          </Avatar>
          <p className="font-medium flex-1">
            {userScore.userEmail}
          </p>
          <p className="text-muted-foreground">
            {userScore.score} Pts
          </p>
        </div>
      ))}
    </div>
  );
};
