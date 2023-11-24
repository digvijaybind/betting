import { PlayerBasicDetails } from './liveMatch';
export type StatusPreview =
  | 'scheduled'
  | 'pre_match'
  | 'in_play'
  | 'result'
  | 'drinks_break'
  | 'lunch_break'
  | 'dinner_break'
  | 'innings_break'
  | 'strategic_timeout'
  | 'stumps'
  | 'rain_delay'
  | 'start_delay'
  | 'ball_change'
  | 'player_injured'
  | 'abandoned'
  | 'canceled'
  | 'bad_light'
  | 'crowd_trouble'
  | 'bad_pitch_condition'
  | 'floodlight_failure'
  | 'play_suspended_unknown';
  
export type CreditType = {
  credits: {
    player_key: string;
    intelligent_rank: number;
    value: number;
    intelligent_score: number;
   //  tournamentPoints: number;
    tournament_points: number;
    last_updated: number;
  }[];
  players: {
    [key: string]: PlayerBasicDetails & {
      team_key: string;
    };
  };
  teams: {
    [key: string]: {
      key: string;
      code: string;
      name: string;
    };
  };
  last_updated: number;
  match: {
    match_meta: {
      status: 'not_started' | 'started' | 'completed';
      key: string;
      format: 'test' | 'oneday' | 't20' | 't10' | '100-ball' | '60-ball';
      start_at: number;
      status_overview: StatusPreview;
    };
  };
};
