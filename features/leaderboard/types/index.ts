import type { Schema } from '@/amplify/data/resource';

export type UserScoreSchema = Schema['UserScore']['type'];

export type UserScore = Pick<
  UserScoreSchema,
  'userEmail' | 'score'
>;
