export type TeamType = {
  key: string;
  code: string;
  name: string;
  country_code: string | null;
};

export type MatchFormat =
  | 'test'
  | 'oneday'
  | 't20'
  | 't10'
  | '100-ball'
  | '60-ball';

export type GenderType = 'male' | 'female';

export type MatchType = {
  key: string;
  name: string;
  short_name: string;
  sub_title?: string;
  status: 'completed' | 'not_started' | 'started';
  start_at: number;
  tournament: {
    key: string;
    name: string;
    short_name: string;
  };
  winner: 'a' | 'b' | null;
  teams: {
    a: TeamType;
    b: TeamType;
  };
  gender: GenderType;
  format: MatchFormat;
};
