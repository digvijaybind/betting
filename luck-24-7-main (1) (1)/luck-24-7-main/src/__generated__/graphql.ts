/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Association = {
  __typename?: 'Association';
  code?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  parent?: Maybe<Scalars['String']>;
};

export type AssociationListApiResponse = {
  __typename?: 'AssociationListAPIResponse';
  associations?: Maybe<Array<Maybe<Association>>>;
  nextPageKey?: Maybe<Scalars['Int']>;
  previousPageKey?: Maybe<Scalars['Int']>;
};

/** Used for fetching your Auth Token.This Auth Token value must be set as a header with the key 'rs-token' in all queries */
export type AuthApiResponse = {
  __typename?: 'AuthAPIResponse';
  expires?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['String']>;
};

export type AutomaticBetOdds = {
  __typename?: 'AutomaticBetOdds';
  decimal?: Maybe<Array<Maybe<BetOddsItem>>>;
  fractional?: Maybe<Array<Maybe<BetOddsItemInFraction>>>;
};

export type AutomaticResultPrediction = {
  __typename?: 'AutomaticResultPrediction';
  percentage?: Maybe<Array<Maybe<ResultPredictionItem>>>;
};

export type BallsBreakup = {
  __typename?: 'BallsBreakup';
  balls?: Maybe<Scalars['Int']>;
  dotBalls?: Maybe<Scalars['Int']>;
  noBalls?: Maybe<Scalars['Int']>;
  wides?: Maybe<Scalars['Int']>;
};

export type Batsman = {
  __typename?: 'Batsman';
  ballCount?: Maybe<Scalars['Int']>;
  isDotBall?: Maybe<Scalars['Boolean']>;
  isFour?: Maybe<Scalars['Boolean']>;
  isSix?: Maybe<Scalars['Boolean']>;
  player?: Maybe<CricketPlayerProfile>;
  runs?: Maybe<Scalars['Int']>;
};

export type BatsmanPerformance = {
  __typename?: 'BatsmanPerformance';
  average?: Maybe<Scalars['Float']>;
  balls?: Maybe<Scalars['Int']>;
  boundaries?: Maybe<Scalars['Int']>;
  key?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
};

export type BatsmanScoreBreakup = {
  __typename?: 'BatsmanScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  dotBalls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
};

export type BatsmanWithoutPlayerProfile = {
  __typename?: 'BatsmanWithoutPlayerProfile';
  ballCount?: Maybe<Scalars['Int']>;
  isDotBall?: Maybe<Scalars['Boolean']>;
  isFour?: Maybe<Scalars['Boolean']>;
  isSix?: Maybe<Scalars['Boolean']>;
  playerKey?: Maybe<Scalars['String']>;
  runs?: Maybe<Scalars['Int']>;
};

export enum BattingStyle {
  LeftHand = 'leftHand',
  RightHand = 'rightHand'
}

export type BetOddsItem = {
  __typename?: 'BetOddsItem';
  team?: Maybe<Team>;
  value?: Maybe<Scalars['Float']>;
};

export type BetOddsItemInFraction = {
  __typename?: 'BetOddsItemInFraction';
  denominator?: Maybe<Scalars['Int']>;
  numerator?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  value?: Maybe<Scalars['String']>;
};

export type Bowler = {
  __typename?: 'Bowler';
  ballCount?: Maybe<Scalars['Int']>;
  extras?: Maybe<Scalars['Int']>;
  isWicket?: Maybe<Scalars['Boolean']>;
  player?: Maybe<CricketPlayerProfile>;
  runs?: Maybe<Scalars['Int']>;
};

export type BowlerPerformance = {
  __typename?: 'BowlerPerformance';
  balls?: Maybe<Scalars['Int']>;
  economy?: Maybe<Scalars['Float']>;
  key?: Maybe<Scalars['String']>;
  runs?: Maybe<Scalars['Int']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type BowlerScoreBallsBreakup = {
  __typename?: 'BowlerScoreBallsBreakup';
  dotBalls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  noBalls?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  wides?: Maybe<Scalars['Int']>;
};

export type BowlerScoreBreakup = {
  __typename?: 'BowlerScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  ballsBreakup?: Maybe<BowlerScoreBallsBreakup>;
  economy?: Maybe<Scalars['Float']>;
  extras?: Maybe<Scalars['Int']>;
  maidenOvers?: Maybe<Scalars['Int']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  runs?: Maybe<Scalars['Int']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type BowlerWithoutPlayerProfile = {
  __typename?: 'BowlerWithoutPlayerProfile';
  ballCount?: Maybe<Scalars['Int']>;
  extras?: Maybe<Scalars['Int']>;
  isWicket?: Maybe<Scalars['Boolean']>;
  playerKey?: Maybe<Scalars['String']>;
  runs?: Maybe<Scalars['Int']>;
};

export enum BowlingArm {
  LeftArm = 'leftArm',
  RightArm = 'rightArm'
}

export enum BowlingPace {
  Fast = 'fast',
  FastMedium = 'fastMedium',
  Medium = 'medium',
  MediumFast = 'mediumFast',
  Slow = 'slow'
}

export type BowlingStyle = {
  __typename?: 'BowlingStyle';
  arm?: Maybe<BowlingArm>;
  bowlingType?: Maybe<BowlingType>;
  pace?: Maybe<BowlingPace>;
};

export enum BowlingType {
  LegBreak = 'legBreak',
  OffBreak = 'offBreak',
  Orthodox = 'orthodox',
  WristSpin = 'wristSpin'
}

export type CompetitionBase = {
  __typename?: 'CompetitionBase';
  code?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CounterItem = {
  __typename?: 'CounterItem';
  count?: Maybe<Scalars['Int']>;
  headToHead?: Maybe<Scalars['Int']>;
};

export type Country = {
  __typename?: 'Country';
  code?: Maybe<Scalars['String']>;
  isRegion?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  officialName?: Maybe<Scalars['String']>;
  shortCode?: Maybe<Scalars['String']>;
};

export type CountryListApiResponse = {
  __typename?: 'CountryListAPIResponse';
  countries?: Maybe<Array<Maybe<Country>>>;
  nextPageKey?: Maybe<Scalars['Int']>;
  previousPageKey?: Maybe<Scalars['Int']>;
};

export type CricketBall = {
  __typename?: 'CricketBall';
  ballType?: Maybe<CricketBallType>;
  batsman?: Maybe<Batsman>;
  battingTeam?: Maybe<Team>;
  bowler?: Maybe<Bowler>;
  comment?: Maybe<Scalars['String']>;
  entryTime?: Maybe<Scalars['Float']>;
  fielders?: Maybe<Array<Maybe<Fielder>>>;
  innings?: Maybe<CricketInningsIndex>;
  key?: Maybe<Scalars['String']>;
  nonStriker?: Maybe<CricketPlayerProfile>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  teamScore?: Maybe<TeamScore>;
  wicket?: Maybe<Wicket>;
};

export enum CricketBallType {
  Bye = 'bye',
  LegBye = 'legBye',
  NoBall = 'noBall',
  Normal = 'normal',
  Wide = 'wide'
}

export type CricketBallWithoutPlayerProfile = {
  __typename?: 'CricketBallWithoutPlayerProfile';
  ballType?: Maybe<CricketBallType>;
  batsman?: Maybe<BatsmanWithoutPlayerProfile>;
  battingTeam?: Maybe<MatchTeamIndex>;
  bowler?: Maybe<BowlerWithoutPlayerProfile>;
  comment?: Maybe<Scalars['String']>;
  entryTime?: Maybe<Scalars['Float']>;
  fielders?: Maybe<Array<Maybe<FielderWithoutPlayerProfile>>>;
  innings?: Maybe<CricketInningsIndex>;
  key?: Maybe<Scalars['String']>;
  nonStrikerKey?: Maybe<Scalars['String']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  teamScore?: Maybe<TeamScore>;
  wicket?: Maybe<WicketWithoutPlayerProfile>;
};

export enum CricketBatOrBowl {
  Bat = 'bat',
  Bowl = 'bowl'
}

export type CricketBatsmanScoreBreakup = {
  __typename?: 'CricketBatsmanScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  dotBalls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
};

export type CricketBatsmenPerformance = {
  __typename?: 'CricketBatsmenPerformance';
  overall?: Maybe<Array<Maybe<BatsmanPerformance>>>;
  teamAgainst?: Maybe<Array<Maybe<BatsmanPerformance>>>;
  tournament?: Maybe<Array<Maybe<BatsmanPerformance>>>;
  venue?: Maybe<Array<Maybe<BatsmanPerformance>>>;
};

export type CricketBowlerPerformance = {
  __typename?: 'CricketBowlerPerformance';
  overall?: Maybe<Array<Maybe<BowlerPerformance>>>;
  teamAgainst?: Maybe<Array<Maybe<BowlerPerformance>>>;
  tournament?: Maybe<Array<Maybe<BowlerPerformance>>>;
  venue?: Maybe<Array<Maybe<BowlerPerformance>>>;
};

export type CricketBowlerScoreBreakup = {
  __typename?: 'CricketBowlerScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  ballsBreakup?: Maybe<OversSummaryBallsBreakup>;
  economy?: Maybe<Scalars['Float']>;
  extras?: Maybe<Scalars['Int']>;
  maidenOvers?: Maybe<Scalars['Int']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  runs?: Maybe<Scalars['Int']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type CricketExtraRunsBreakup = {
  __typename?: 'CricketExtraRunsBreakup';
  bye?: Maybe<Scalars['Int']>;
  extra?: Maybe<Scalars['Int']>;
  legBye?: Maybe<Scalars['Int']>;
  noBall?: Maybe<Scalars['Int']>;
  penalty?: Maybe<Scalars['Int']>;
  wide?: Maybe<Scalars['Int']>;
};

export type CricketFeaturedMatchLiveState = {
  __typename?: 'CricketFeaturedMatchLiveState';
  battingTeam?: Maybe<Team>;
  bowler?: Maybe<CricketPlayerProfile>;
  bowlingTeam?: Maybe<Team>;
  innings?: Maybe<CricketInningsIndex>;
  matchBreak?: Maybe<MatchBreak>;
  nonStriker?: Maybe<CricketPlayerProfile>;
  recentOvers?: Maybe<Array<Maybe<RecentOver>>>;
  recentOversRepr?: Maybe<Array<Maybe<RecentOverRepr>>>;
  requiredScore?: Maybe<RequiredScore>;
  score?: Maybe<Score>;
  striker?: Maybe<CricketPlayerProfile>;
};

export type CricketFeaturedMatchPlayer = {
  __typename?: 'CricketFeaturedMatchPlayer';
  player?: Maybe<CricketPlayerProfile>;
  score?: Maybe<Array<Maybe<CricketFeaturedMatchPlayerScore>>>;
};

export type CricketFeaturedMatchPlayerDismissal = {
  __typename?: 'CricketFeaturedMatchPlayerDismissal';
  msg?: Maybe<Scalars['String']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  teamRuns?: Maybe<Scalars['Int']>;
  wicketNumber?: Maybe<Scalars['Int']>;
};

export type CricketFeaturedMatchPlayerScore = {
  __typename?: 'CricketFeaturedMatchPlayerScore';
  batting?: Maybe<FeaturedMatchPlayerBattingScore>;
  bowling?: Maybe<FeaturedMatchPlayerBowlingScore>;
  fielding?: Maybe<FeaturedMatchPlayerFieldingScore>;
  inningsStr?: Maybe<Scalars['String']>;
};

export type CricketFeaturedMatchesApiResponse = {
  __typename?: 'CricketFeaturedMatchesAPIResponse';
  matches?: Maybe<Array<Maybe<CricketMatchSummary>>>;
};

export type CricketFeaturedMatchesTwoApiResponse = {
  __typename?: 'CricketFeaturedMatchesTwoAPIResponse';
  matches?: Maybe<Array<Maybe<CricketMatchBasic>>>;
};

/** When ODI and T20 matches end in a tie, the superovers are played to determine the winner as per ICC rules. The keys of Superover have the batting team name followed by Superover for first Super Over and Batting Team, Superover and Superover number from second superover and so on */
export enum CricketInningsIndex {
  A1 = 'a1',
  A2 = 'a2',
  ASuperover = 'aSuperover',
  ASuperover2 = 'aSuperover2',
  ASuperover3 = 'aSuperover3',
  ASuperover4 = 'aSuperover4',
  ASuperover5 = 'aSuperover5',
  ASuperover6 = 'aSuperover6',
  ASuperover7 = 'aSuperover7',
  ASuperover8 = 'aSuperover8',
  ASuperover9 = 'aSuperover9',
  ASuperover10 = 'aSuperover10',
  ASuperover11 = 'aSuperover11',
  B1 = 'b1',
  B2 = 'b2',
  BSuperover = 'bSuperover',
  BSuperover2 = 'bSuperover2',
  BSuperover3 = 'bSuperover3',
  BSuperover4 = 'bSuperover4',
  BSuperover5 = 'bSuperover5',
  BSuperover6 = 'bSuperover6',
  BSuperover7 = 'bSuperover7',
  BSuperover8 = 'bSuperover8',
  BSuperover9 = 'bSuperover9',
  BSuperover10 = 'bSuperover10',
  BSuperover11 = 'bSuperover11'
}

export type CricketMatchApiResponse = {
  __typename?: 'CricketMatchAPIResponse';
  association?: Maybe<Association>;
  completedDateApproximate?: Maybe<Scalars['Float']>;
  dataReview?: Maybe<CricketMatchDataReview>;
  estimatedEndDate?: Maybe<Scalars['Float']>;
  format?: Maybe<CricketMatchFormat>;
  gender?: Maybe<Gender>;
  key?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Scalars['String']>>>;
  metricGroup?: Maybe<MetricGroup>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
  play?: Maybe<CricketMatchPlayDetail>;
  playStatus?: Maybe<CricketMatchPlayStatus>;
  players?: Maybe<Array<Maybe<CricketMatchPlayer>>>;
  shortName?: Maybe<Scalars['String']>;
  sport?: Maybe<SystemSports>;
  squad?: Maybe<CricketMatchSquad>;
  /** This has the Epoch timestamp (in seconds) of the expected start date of the match */
  startAt?: Maybe<Scalars['Float']>;
  startAtLocal?: Maybe<Scalars['Float']>;
  status?: Maybe<MatchStatus>;
  subTitle?: Maybe<Scalars['String']>;
  teams?: Maybe<CricketTeams>;
  title?: Maybe<Scalars['String']>;
  toss?: Maybe<CricketMatchToss>;
  tournament?: Maybe<TournamentBase>;
  umpires?: Maybe<MatchUmpires>;
  venue?: Maybe<Venue>;
  winner?: Maybe<Team>;
};

export type CricketMatchBasic = {
  __typename?: 'CricketMatchBasic';
  association?: Maybe<Association>;
  format?: Maybe<CricketMatchFormat>;
  gender?: Maybe<Gender>;
  key?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Scalars['String']>>>;
  metricGroup?: Maybe<MetricGroup>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  sport?: Maybe<SystemSports>;
  startAt?: Maybe<Scalars['Float']>;
  status?: Maybe<MatchStatus>;
  subTitle?: Maybe<Scalars['String']>;
  teams?: Maybe<CricketTeams>;
  tournament?: Maybe<TournamentBase>;
  venue?: Maybe<Venue>;
  winner?: Maybe<Team>;
};

export enum CricketMatchBreakType {
  Day = 'day',
  Drinks = 'drinks',
  Innings = 'innings',
  Lunch = 'lunch',
  Other = 'other'
}

export type CricketMatchDataReview = {
  __typename?: 'CricketMatchDataReview';
  goodToClose?: Maybe<Scalars['Boolean']>;
  note?: Maybe<Scalars['String']>;
  players?: Maybe<Scalars['Boolean']>;
  playingXi?: Maybe<Scalars['Boolean']>;
  pom?: Maybe<Scalars['Boolean']>;
  result?: Maybe<Scalars['Boolean']>;
  schedule?: Maybe<Scalars['Boolean']>;
  score?: Maybe<Scalars['Boolean']>;
  scoreReviewedBallIndex?: Maybe<ScoreReviewedBallIndex>;
  teamA?: Maybe<Scalars['Boolean']>;
  teamB?: Maybe<Scalars['Boolean']>;
  venue?: Maybe<Scalars['Boolean']>;
};

export enum CricketMatchFormat {
  Oneday = 'oneday',
  T10 = 't10',
  T20 = 't20',
  Test = 'test'
}

export type CricketMatchInnings = {
  __typename?: 'CricketMatchInnings';
  ballsBreakup?: Maybe<BallsBreakup>;
  extraRuns?: Maybe<CricketExtraRunsBreakup>;
  index?: Maybe<CricketInningsIndex>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  score?: Maybe<ScoreBreakup>;
  scoreStr?: Maybe<Scalars['String']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type CricketMatchInningsDetail = {
  __typename?: 'CricketMatchInningsDetail';
  ballsBreakup?: Maybe<BallsBreakup>;
  battingOrder?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  bowlingOrder?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  extraRuns?: Maybe<CricketExtraRunsBreakup>;
  index?: Maybe<CricketInningsIndex>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  partnerships?: Maybe<Array<Maybe<CricketMatchPartnership>>>;
  score?: Maybe<ScoreBreakup>;
  scoreStr?: Maybe<Scalars['String']>;
  wicketOrder?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  wickets?: Maybe<Scalars['Int']>;
};

export type CricketMatchInsight = {
  __typename?: 'CricketMatchInsight';
  player?: Maybe<CricketMatchPlayerInsightsItem>;
  team?: Maybe<Array<Maybe<CricketTeamInsightsItem>>>;
};

/** This is available until the match completes after this it becomes null */
export type CricketMatchLiveState = {
  __typename?: 'CricketMatchLiveState';
  battingTeam?: Maybe<Team>;
  bowler?: Maybe<CricketPlayerProfile>;
  bowlingTeam?: Maybe<Team>;
  innings?: Maybe<CricketInningsIndex>;
  lastBall?: Maybe<CricketBall>;
  matchBreak?: Maybe<MatchBreak>;
  nonStriker?: Maybe<CricketPlayerProfile>;
  /** Contains the last few overs of a match - This is available until the match completes */
  recentOvers?: Maybe<Array<Maybe<RecentOver>>>;
  /** The recent_overs_repr property provides a list of outcomes of the deliveries bowled in the last 3 overs. Outcomes like 'r', 'b', 'w' and 'e' refers to the number of runs, boundaries, wickets and extras like no ball, wide, leg bye and byes respectively. */
  recentOversRepr?: Maybe<Array<Maybe<RecentOverRepr>>>;
  recentPlayers?: Maybe<CricketMatchRecentPlayers>;
  requiredScore?: Maybe<RequiredScore>;
  score?: Maybe<Score>;
  striker?: Maybe<CricketPlayerProfile>;
};

export type CricketMatchMeta = {
  __typename?: 'CricketMatchMeta';
  format?: Maybe<CricketMatchFormat>;
  key?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Float']>;
  status?: Maybe<MatchStatus>;
};

export type CricketMatchOdds = {
  __typename?: 'CricketMatchOdds';
  /** This is available to predict the probability of teams winning in the match in fractional and decimal values. */
  betOdds?: Maybe<MatchBetOdds>;
  meta?: Maybe<CricketMatchMeta>;
  resultPrediction?: Maybe<MatchResultPrediction>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type CricketMatchPartnership = {
  __typename?: 'CricketMatchPartnership';
  beginOvers?: Maybe<Array<Maybe<Scalars['Int']>>>;
  endOvers?: Maybe<Array<Maybe<Scalars['Int']>>>;
  isCompleted?: Maybe<Scalars['Boolean']>;
  playerA?: Maybe<CricketPlayerProfile>;
  playerAScore?: Maybe<CricketMatchPartnershipScoreBreakup>;
  playerB?: Maybe<CricketPlayerProfile>;
  playerBScore?: Maybe<CricketMatchPartnershipScoreBreakup>;
  score?: Maybe<CricketMatchPartnershipTotalScoreBreakup>;
};

export type CricketMatchPartnershipScoreBreakup = {
  __typename?: 'CricketMatchPartnershipScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
};

export type CricketMatchPartnershipTotalScoreBreakup = {
  __typename?: 'CricketMatchPartnershipTotalScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  runRate?: Maybe<Scalars['Float']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
};

export type CricketMatchPlay = {
  __typename?: 'CricketMatchPlay';
  dayNumber?: Maybe<Scalars['Int']>;
  firstBatting?: Maybe<Team>;
  inningsOrder?: Maybe<Array<Maybe<CricketInningsIndex>>>;
  live?: Maybe<CricketFeaturedMatchLiveState>;
  oversPerInnings?: Maybe<Array<Maybe<Scalars['Int']>>>;
  reducedOvers?: Maybe<Array<Maybe<Scalars['Int']>>>;
  result?: Maybe<CricketMatchResult>;
  target?: Maybe<Target>;
};

export type CricketMatchPlayDetail = {
  __typename?: 'CricketMatchPlayDetail';
  dayNumber?: Maybe<Scalars['Int']>;
  firstBatting?: Maybe<Team>;
  innings?: Maybe<Array<Maybe<CricketMatchInningsDetail>>>;
  inningsOrder?: Maybe<Array<Maybe<CricketInningsIndex>>>;
  live?: Maybe<CricketMatchLiveState>;
  oversPerInnings?: Maybe<Array<Maybe<Scalars['Int']>>>;
  reducedOvers?: Maybe<Array<Maybe<Scalars['Int']>>>;
  result?: Maybe<CricketMatchResult>;
  target?: Maybe<Target>;
};

export enum CricketMatchPlayStatus {
  Abandoned = 'abandoned',
  BadLight = 'badLight',
  BadPitchCondition = 'badPitchCondition',
  BallChange = 'ballChange',
  Canceled = 'canceled',
  CrowdTrouble = 'crowdTrouble',
  DrinksBreak = 'drinksBreak',
  FloodlightFailure = 'floodlightFailure',
  InPlay = 'inPlay',
  InningsBreak = 'inningsBreak',
  LunchBreak = 'lunchBreak',
  PlaySuspendedUnknown = 'playSuspendedUnknown',
  PlayerInjured = 'playerInjured',
  PreMatch = 'preMatch',
  RainDelay = 'rainDelay',
  Result = 'result',
  Scheduled = 'scheduled',
  StartDelay = 'startDelay',
  StrategicTimeout = 'strategicTimeout',
  Stumps = 'stumps'
}

export type CricketMatchPlayer = {
  __typename?: 'CricketMatchPlayer';
  player?: Maybe<CricketPlayerProfile>;
  score?: Maybe<Array<Maybe<CricketMatchPlayerScore>>>;
};

export type CricketMatchPlayerDismissal = {
  __typename?: 'CricketMatchPlayerDismissal';
  ball?: Maybe<CricketBall>;
  msg?: Maybe<Scalars['String']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  teamRuns?: Maybe<Scalars['Int']>;
  wicketNumber?: Maybe<Scalars['Int']>;
};

export type CricketMatchPlayerInsightsItem = {
  __typename?: 'CricketMatchPlayerInsightsItem';
  batsman?: Maybe<CricketBatsmenPerformance>;
  bowler?: Maybe<CricketBowlerPerformance>;
};

export type CricketMatchPlayerScore = {
  __typename?: 'CricketMatchPlayerScore';
  batting?: Maybe<PlayerBattingScore>;
  bowling?: Maybe<PlayerBowlingScore>;
  fielding?: Maybe<PlayerFieldingScore>;
  inningsStr?: Maybe<Scalars['String']>;
};

export type CricketMatchRecentPlayers = {
  __typename?: 'CricketMatchRecentPlayers';
  bowler?: Maybe<RecentPlayerBowlingStats>;
  nonStriker?: Maybe<RecentPlayerBattingStats>;
  prevOverBowler?: Maybe<RecentPlayerBowlingStats>;
  striker?: Maybe<RecentPlayerBattingStats>;
};

export type CricketMatchResult = {
  __typename?: 'CricketMatchResult';
  msg?: Maybe<Scalars['String']>;
  pom?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  resultType?: Maybe<CricketMatchResultType>;
  winner?: Maybe<Team>;
};

export enum CricketMatchResultType {
  Draw = 'draw',
  Runs = 'runs',
  Walkover = 'walkover',
  Wickets = 'wickets'
}

export type CricketMatchReviewItem = {
  __typename?: 'CricketMatchReviewItem';
  dataReview?: Maybe<CricketMatchDataReview>;
  matchMeta?: Maybe<FantasyCricketMatchMeta>;
  status?: Maybe<MatchStatus>;
  statusOverview?: Maybe<CricketMatchPlayStatus>;
};

export type CricketMatchSquad = {
  __typename?: 'CricketMatchSquad';
  a?: Maybe<CricketSquad>;
  b?: Maybe<CricketSquad>;
};

export type CricketMatchSummary = {
  __typename?: 'CricketMatchSummary';
  association?: Maybe<Association>;
  format?: Maybe<CricketMatchFormat>;
  gender?: Maybe<Gender>;
  key?: Maybe<Scalars['String']>;
  messages?: Maybe<Array<Maybe<Scalars['String']>>>;
  metricGroup?: Maybe<MetricGroup>;
  name?: Maybe<Scalars['String']>;
  notes?: Maybe<Array<Maybe<Scalars['String']>>>;
  play?: Maybe<CricketMatchPlay>;
  playStatus?: Maybe<CricketMatchPlayStatus>;
  players?: Maybe<Array<Maybe<CricketFeaturedMatchPlayer>>>;
  shortName?: Maybe<Scalars['String']>;
  sport?: Maybe<SystemSports>;
  startAt?: Maybe<Scalars['Float']>;
  startAtLocal?: Maybe<Scalars['Float']>;
  status?: Maybe<MatchStatus>;
  subTitle?: Maybe<Scalars['String']>;
  teams?: Maybe<CricketTeams>;
  title?: Maybe<Scalars['String']>;
  toss?: Maybe<CricketMatchToss>;
  tournament?: Maybe<TournamentBase>;
  venue?: Maybe<Venue>;
  winner?: Maybe<Team>;
};

export type CricketMatchToss = {
  __typename?: 'CricketMatchToss';
  called?: Maybe<Team>;
  elected?: Maybe<CricketBatOrBowl>;
  winner?: Maybe<Team>;
};

export type CricketOverIndex = {
  __typename?: 'CricketOverIndex';
  innings?: Maybe<CricketInningsIndex>;
  overNumber?: Maybe<Scalars['Int']>;
};

export type CricketPlayerBattingBest = {
  __typename?: 'CricketPlayerBattingBest';
  balls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  matchKey?: Maybe<Scalars['String']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
  teamAgainst?: Maybe<Scalars['String']>;
};

export type CricketPlayerBattingStats = {
  __typename?: 'CricketPlayerBattingStats';
  average?: Maybe<Scalars['Float']>;
  balls?: Maybe<Scalars['Int']>;
  best?: Maybe<CricketPlayerBattingBest>;
  doubleHundreds?: Maybe<Scalars['Int']>;
  fifties?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  highScore?: Maybe<Scalars['Int']>;
  hundreds?: Maybe<Scalars['Int']>;
  innings?: Maybe<Scalars['Int']>;
  matches?: Maybe<Scalars['Int']>;
  notOuts?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
  thirties?: Maybe<Scalars['Int']>;
};

export type CricketPlayerBowlingBest = {
  __typename?: 'CricketPlayerBowlingBest';
  balls?: Maybe<Scalars['Int']>;
  countries?: Maybe<Scalars['Int']>;
  economy?: Maybe<Scalars['Float']>;
  matchKey?: Maybe<Scalars['String']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  runs?: Maybe<Scalars['Int']>;
  teamAgainst?: Maybe<Scalars['String']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type CricketPlayerBowlingStats = {
  __typename?: 'CricketPlayerBowlingStats';
  average?: Maybe<Scalars['Float']>;
  balls?: Maybe<Scalars['Int']>;
  best?: Maybe<CricketPlayerBowlingBest>;
  economy?: Maybe<Scalars['Float']>;
  fiveWickets?: Maybe<Scalars['Int']>;
  fourWickets?: Maybe<Scalars['Int']>;
  innings?: Maybe<Scalars['Int']>;
  matches?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
  tenWickets?: Maybe<Scalars['Int']>;
  threeWickets?: Maybe<Scalars['Int']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type CricketPlayerFieldingStats = {
  __typename?: 'CricketPlayerFieldingStats';
  catches?: Maybe<Scalars['Int']>;
  runoutAssists?: Maybe<Scalars['Int']>;
  runouts?: Maybe<Scalars['Int']>;
  stumping?: Maybe<Scalars['Int']>;
};

export type CricketPlayerProfile = {
  __typename?: 'CricketPlayerProfile';
  battingStyle?: Maybe<BattingStyle>;
  bowlingStyle?: Maybe<BowlingStyle>;
  dateOfBirth?: Maybe<Scalars['Float']>;
  gender?: Maybe<Gender>;
  jerseyName?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nationality?: Maybe<Country>;
  roles?: Maybe<Array<Maybe<CricketPlayerRole>>>;
  seasonalRole?: Maybe<CricketPlayerRole>;
  skills?: Maybe<Array<Maybe<CricketPlayerSkill>>>;
};

export type CricketPlayerProfileWithTeam = {
  __typename?: 'CricketPlayerProfileWithTeam';
  dateOfBirth?: Maybe<Scalars['Float']>;
  gender?: Maybe<Gender>;
  jerseyName?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nationality?: Maybe<Country>;
  seasonalRole?: Maybe<CricketPlayerRole>;
  team?: Maybe<Team>;
};

export enum CricketPlayerRole {
  AllRounder = 'allRounder',
  Batsman = 'batsman',
  Bowler = 'bowler',
  Keeper = 'keeper'
}

export enum CricketPlayerSkill {
  Bat = 'bat',
  Bowl = 'bowl',
  Keep = 'keep'
}

export type CricketPlayerTournamentStats = {
  __typename?: 'CricketPlayerTournamentStats';
  batting?: Maybe<CricketPlayerBattingStats>;
  bowling?: Maybe<CricketPlayerBowlingStats>;
  fielding?: Maybe<CricketPlayerFieldingStats>;
  player?: Maybe<CricketPlayerProfile>;
};

export type CricketSquad = {
  __typename?: 'CricketSquad';
  captain?: Maybe<CricketPlayerProfile>;
  keeper?: Maybe<CricketPlayerProfile>;
  players?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  playingXi?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  replacements?: Maybe<Array<Maybe<PlayerReplacements>>>;
};

export type CricketTeamInsightsItem = {
  __typename?: 'CricketTeamInsightsItem';
  key?: Maybe<Scalars['String']>;
  overall?: Maybe<TeamInsightItem>;
  teamAgainst?: Maybe<TeamInsightItem>;
  tournament?: Maybe<TournamentInsightItem>;
  venue?: Maybe<TeamInsightItem>;
};

export type CricketTeams = {
  __typename?: 'CricketTeams';
  a?: Maybe<Team>;
  b?: Maybe<Team>;
};

export type CricketTournament = {
  __typename?: 'CricketTournament';
  associationKey?: Maybe<Scalars['String']>;
  competition?: Maybe<CompetitionBase>;
  countries?: Maybe<Array<Maybe<Country>>>;
  formats?: Maybe<Array<Maybe<CricketMatchFormat>>>;
  gender?: Maybe<Gender>;
  isDateConfirmed?: Maybe<Scalars['Boolean']>;
  isVenueConfirmed?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  lastScheduledMatchDate?: Maybe<Scalars['Float']>;
  metricGroup?: Maybe<MetricGroup>;
  name?: Maybe<Scalars['String']>;
  pointSystem?: Maybe<TournamentPointSystem>;
  shortName?: Maybe<Scalars['String']>;
  sport?: Maybe<SystemSports>;
  startDate?: Maybe<Scalars['Float']>;
};

export type CricketTournamentApiResponse = {
  __typename?: 'CricketTournamentAPIResponse';
  rounds?: Maybe<Array<Maybe<CricketTournamentRound>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  tournament?: Maybe<CricketTournament>;
};

export type CricketTournamentBattingStats = {
  __typename?: 'CricketTournamentBattingStats';
  bestBatting?: Maybe<Array<Maybe<CricketTournamentPlayerStatsItemScore>>>;
  bestStrikeRate?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValueFloat>>>;
  mostFifties?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostFours?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostFoursByInnings?: Maybe<Array<Maybe<CricketTournamentPlayerStatsItemMatch>>>;
  mostHundreds?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostRuns?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostSixes?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostSixesByInnings?: Maybe<Array<Maybe<CricketTournamentPlayerStatsItemMatch>>>;
  mostThirties?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
};

export type CricketTournamentBowlingStats = {
  __typename?: 'CricketTournamentBowlingStats';
  bestBowling?: Maybe<Array<Maybe<CricketTournamentPlayerStatsItemWickets>>>;
  bestEconomy?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValueFloat>>>;
  bestEconomyByInnings?: Maybe<Array<Maybe<CricketTournamentPlayerStatsItemMatchFloat>>>;
  mostDotBalls?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostDotBallsByInnings?: Maybe<Array<Maybe<CricketTournamentPlayerStatsItemMatch>>>;
  mostFiveWickets?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostFourWickets?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostMaidens?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostRuns?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostWickets?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
};

export type CricketTournamentCounter = {
  __typename?: 'CricketTournamentCounter';
  completedMatches?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  pendingMatches?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type CricketTournamentFieldingStats = {
  __typename?: 'CricketTournamentFieldingStats';
  mostCatches?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostDismissals?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostRunoutAssists?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostRunouts?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
  mostStumpings?: Maybe<Array<Maybe<CricketTournamentPlayerStatsValue>>>;
};

export type CricketTournamentGroupPoints = {
  __typename?: 'CricketTournamentGroupPoints';
  group?: Maybe<TournamentGroupBase>;
  points?: Maybe<Array<Maybe<CricketTournamentTeamPoints>>>;
};

export type CricketTournamentPlayerStats = {
  __typename?: 'CricketTournamentPlayerStats';
  batting?: Maybe<CricketTournamentBattingStats>;
  bowling?: Maybe<CricketTournamentBowlingStats>;
  fielding?: Maybe<CricketTournamentFieldingStats>;
};

export type CricketTournamentPlayerStatsItemMatch = {
  __typename?: 'CricketTournamentPlayerStatsItemMatch';
  matchKey?: Maybe<Scalars['String']>;
  player?: Maybe<CricketPlayerProfileWithTeam>;
  rank?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  teamAgainst?: Maybe<Team>;
  value?: Maybe<Scalars['Int']>;
};

export type CricketTournamentPlayerStatsItemMatchFloat = {
  __typename?: 'CricketTournamentPlayerStatsItemMatchFloat';
  matchKey?: Maybe<Scalars['String']>;
  player?: Maybe<CricketPlayerProfileWithTeam>;
  rank?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  teamAgainst?: Maybe<Team>;
  value?: Maybe<Scalars['Float']>;
};

export type CricketTournamentPlayerStatsItemScore = {
  __typename?: 'CricketTournamentPlayerStatsItemScore';
  balls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  matchKey?: Maybe<Scalars['String']>;
  player?: Maybe<CricketPlayerProfileWithTeam>;
  rank?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  strikeRate?: Maybe<Scalars['Float']>;
  team?: Maybe<Team>;
  teamAgainst?: Maybe<Team>;
};

export type CricketTournamentPlayerStatsItemWickets = {
  __typename?: 'CricketTournamentPlayerStatsItemWickets';
  balls?: Maybe<Scalars['Int']>;
  dotBalls?: Maybe<Scalars['Int']>;
  economy?: Maybe<Scalars['Float']>;
  matchKey?: Maybe<Scalars['String']>;
  player?: Maybe<CricketPlayerProfileWithTeam>;
  rank?: Maybe<Scalars['Int']>;
  runs?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  teamAgainst?: Maybe<Team>;
  value?: Maybe<Scalars['Int']>;
};

export type CricketTournamentPlayerStatsValue = {
  __typename?: 'CricketTournamentPlayerStatsValue';
  player?: Maybe<CricketPlayerProfileWithTeam>;
  rank?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  value?: Maybe<Scalars['Int']>;
};

export type CricketTournamentPlayerStatsValueFloat = {
  __typename?: 'CricketTournamentPlayerStatsValueFloat';
  player?: Maybe<CricketPlayerProfileWithTeam>;
  rank?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  value?: Maybe<Scalars['Float']>;
};

export type CricketTournamentRound = {
  __typename?: 'CricketTournamentRound';
  format?: Maybe<CricketMatchFormat>;
  groups?: Maybe<Array<Maybe<TournamentGroup>>>;
  havePoints?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type CricketTournamentRoundPoints = {
  __typename?: 'CricketTournamentRoundPoints';
  groups?: Maybe<Array<Maybe<CricketTournamentGroupPoints>>>;
  tournamentRound?: Maybe<TournamentRoundBase>;
};

export type CricketTournamentTeam = {
  __typename?: 'CricketTournamentTeam';
  captains?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  keepers?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  players?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  playersByFormat?: Maybe<PlayersByFormat>;
};

export type CricketTournamentTeamPoints = {
  __typename?: 'CricketTournamentTeamPoints';
  draw?: Maybe<Scalars['Int']>;
  lost?: Maybe<Scalars['Int']>;
  netRunRate?: Maybe<Scalars['Float']>;
  noResult?: Maybe<Scalars['Int']>;
  played?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Float']>;
  positionInTable?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  tied?: Maybe<Scalars['Int']>;
  won?: Maybe<Scalars['Int']>;
};

export type CricketTournamentTeamStats = {
  __typename?: 'CricketTournamentTeamStats';
  highestTeamTotals?: Maybe<Array<Maybe<CricketTournamentTeamTotalStats>>>;
  largestWinningMargin?: Maybe<CricketTournamentTeamWinningStats>;
  lowestTeamTotals?: Maybe<Array<Maybe<CricketTournamentTeamTotalStats>>>;
  smallestWinningMargin?: Maybe<CricketTournamentTeamWinningStats>;
};

export type CricketTournamentTeamStatsItem = {
  __typename?: 'CricketTournamentTeamStatsItem';
  matchKey?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  teamLost?: Maybe<Team>;
  teamWon?: Maybe<Team>;
  value?: Maybe<Scalars['Int']>;
};

export type CricketTournamentTeamTotalStats = {
  __typename?: 'CricketTournamentTeamTotalStats';
  matchKey?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  team?: Maybe<Team>;
  teamAgainst?: Maybe<Team>;
  value?: Maybe<Scalars['Int']>;
};

export type CricketTournamentTeamWinningStats = {
  __typename?: 'CricketTournamentTeamWinningStats';
  byRuns?: Maybe<Array<Maybe<CricketTournamentTeamStatsItem>>>;
  byWickets?: Maybe<Array<Maybe<CricketTournamentTeamStatsItem>>>;
};

export enum CricketWicketType {
  AbsentHurt = 'absentHurt',
  Bowled = 'bowled',
  Caught = 'caught',
  HandledTheBall = 'handledTheBall',
  HitTheBallTwice = 'hitTheBallTwice',
  HitWicket = 'hitWicket',
  Lbw = 'lbw',
  ObstructingTheField = 'obstructingTheField',
  Retired = 'retired',
  RunOut = 'runOut',
  Stumped = 'stumped',
  TimedOut = 'timedOut'
}

export type FantasyCricketMatchMeta = {
  __typename?: 'FantasyCricketMatchMeta';
  format?: Maybe<CricketMatchFormat>;
  key?: Maybe<Scalars['String']>;
  startAt?: Maybe<Scalars['Float']>;
  status?: Maybe<MatchStatus>;
  statusOverview?: Maybe<CricketMatchPlayStatus>;
};

export type FantasyMatchCreditsApiResponse = {
  __typename?: 'FantasyMatchCreditsAPIResponse';
  credits?: Maybe<Array<Maybe<FantasyPlayerCredits>>>;
  lastUpdated?: Maybe<Scalars['Float']>;
  match?: Maybe<CricketMatchReviewItem>;
  players?: Maybe<Array<Maybe<CricketPlayerProfileWithTeam>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type FantasyMatchPointsApiResponse = {
  __typename?: 'FantasyMatchPointsAPIResponse';
  lastUpdated?: Maybe<Scalars['Float']>;
  match?: Maybe<CricketMatchReviewItem>;
  metrics?: Maybe<Array<Maybe<FantasyPointsMetric>>>;
  players?: Maybe<Array<Maybe<CricketPlayerProfileWithTeam>>>;
  points?: Maybe<Array<Maybe<FantasyPlayerPoints>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type FantasyPlayerCredits = {
  __typename?: 'FantasyPlayerCredits';
  intelligentRank?: Maybe<Scalars['Int']>;
  intelligentScore?: Maybe<Scalars['Float']>;
  lastUpdated?: Maybe<Scalars['Float']>;
  performance?: Maybe<Array<Maybe<PlayerFantasyPerformanceBase>>>;
  player?: Maybe<CricketPlayerProfileWithTeam>;
  tournamentPoints?: Maybe<Scalars['Float']>;
  value?: Maybe<Scalars['Float']>;
};

export type FantasyPlayerPoints = {
  __typename?: 'FantasyPlayerPoints';
  lastUpdated?: Maybe<Scalars['Float']>;
  player?: Maybe<CricketPlayerProfileWithTeam>;
  points?: Maybe<Scalars['Float']>;
  pointsBreakup?: Maybe<Array<Maybe<PointsBreakup>>>;
  pointsStr?: Maybe<Scalars['String']>;
  rank?: Maybe<Scalars['Int']>;
  tournamentPoints?: Maybe<Scalars['Float']>;
};

export type FantasyPointsMetric = {
  __typename?: 'FantasyPointsMetric';
  helpText?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
};

export type FeaturedMatchPlayerBattingScore = {
  __typename?: 'FeaturedMatchPlayerBattingScore';
  dismissal?: Maybe<CricketFeaturedMatchPlayerDismissal>;
  score?: Maybe<BatsmanScoreBreakup>;
};

export type FeaturedMatchPlayerBowlingScore = {
  __typename?: 'FeaturedMatchPlayerBowlingScore';
  score?: Maybe<BowlerScoreBreakup>;
};

export type FeaturedMatchPlayerFieldingScore = {
  __typename?: 'FeaturedMatchPlayerFieldingScore';
  catches?: Maybe<Scalars['Int']>;
  runouts?: Maybe<Scalars['Int']>;
  stumpings?: Maybe<Scalars['Int']>;
};

export type FeaturedTournamentsFiltersInput = {
  completed?: InputMaybe<Scalars['Boolean']>;
  excludeTours?: InputMaybe<Scalars['Boolean']>;
  live?: InputMaybe<Scalars['Boolean']>;
  upcoming?: InputMaybe<Scalars['Boolean']>;
};

export type Fielder = {
  __typename?: 'Fielder';
  isAssists?: Maybe<Scalars['Boolean']>;
  isCatch?: Maybe<Scalars['Boolean']>;
  isRunOut?: Maybe<Scalars['Boolean']>;
  isStumps?: Maybe<Scalars['Boolean']>;
  player?: Maybe<CricketPlayerProfile>;
};

export type FielderWithoutPlayerProfile = {
  __typename?: 'FielderWithoutPlayerProfile';
  isAssists?: Maybe<Scalars['Boolean']>;
  isCatch?: Maybe<Scalars['Boolean']>;
  isRunOut?: Maybe<Scalars['Boolean']>;
  isStumps?: Maybe<Scalars['Boolean']>;
  playerKey?: Maybe<Scalars['String']>;
};

export enum Gender {
  Female = 'female',
  Male = 'male'
}

export type GroupedTournamentApiResponse = {
  __typename?: 'GroupedTournamentAPIResponse';
  associationKey?: Maybe<Scalars['String']>;
  competitionKey?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
  stages?: Maybe<Array<Maybe<GroupedTournamentStage>>>;
  teams?: Maybe<Array<Maybe<Team>>>;
  tournaments?: Maybe<Array<Maybe<Tournament>>>;
};

export type GroupedTournamentStage = {
  __typename?: 'GroupedTournamentStage';
  name?: Maybe<Scalars['String']>;
  tournaments?: Maybe<Array<Maybe<Tournament>>>;
};

export type MatchBallByBallApiResponse = {
  __typename?: 'MatchBallByBallAPIResponse';
  nextOverIndex?: Maybe<CricketOverIndex>;
  nextOverKey?: Maybe<Scalars['String']>;
  over?: Maybe<Over>;
  previousOverIndex?: Maybe<CricketOverIndex>;
  previousOverKey?: Maybe<Scalars['String']>;
};

export type MatchBetOdds = {
  __typename?: 'MatchBetOdds';
  automatic?: Maybe<AutomaticBetOdds>;
};

export type MatchBreak = {
  __typename?: 'MatchBreak';
  durationNote?: Maybe<Scalars['String']>;
  reason?: Maybe<CricketMatchBreakType>;
};

export type MatchOddsApiResponse = {
  __typename?: 'MatchOddsAPIResponse';
  match?: Maybe<CricketMatchOdds>;
};

export type MatchOversSummaryApiResponse = {
  __typename?: 'MatchOversSummaryAPIResponse';
  nextPageIndex?: Maybe<CricketOverIndex>;
  nextPageKey?: Maybe<Scalars['String']>;
  previousPageIndex?: Maybe<CricketOverIndex>;
  previousPageKey?: Maybe<Scalars['String']>;
  summaries?: Maybe<Array<Maybe<OverSummary>>>;
};

export enum MatchPlayerReplacementReason {
  ConcussionSubstitute = 'concussion_substitute',
  Covid = 'covid',
  Supersub = 'supersub'
}

export type MatchResultPrediction = {
  __typename?: 'MatchResultPrediction';
  automatic?: Maybe<AutomaticResultPrediction>;
};

export enum MatchStatus {
  Completed = 'completed',
  NotStarted = 'notStarted',
  Started = 'started'
}

export enum MatchTeamIndex {
  A = 'a',
  B = 'b'
}

/** Umpires who are officiating the match. As of now this is provided only for IPL Matches */
export type MatchUmpires = {
  __typename?: 'MatchUmpires';
  matchReferee?: Maybe<Array<Maybe<UmpireProfileSchema>>>;
  matchUmpires?: Maybe<Array<Maybe<UmpireProfileSchema>>>;
  reserveUmpires?: Maybe<Array<Maybe<UmpireProfileSchema>>>;
  tvUmpires?: Maybe<Array<Maybe<UmpireProfileSchema>>>;
};

export enum MetricGroup {
  /** MG100 provides data such as partnerships, recent overs and many more as ball by ball coverage */
  Mg100 = 'MG100',
  Mg100B = 'MG100B',
  /** MG101 is a scorecard based coverage that does not provide ball by ball data */
  Mg101 = 'MG101'
}

export type Mutation = {
  __typename?: 'Mutation';
  auth?: Maybe<AuthApiResponse>;
};


export type MutationAuthArgs = {
  api_key: Scalars['String'];
};

export type Over = {
  __typename?: 'Over';
  balls?: Maybe<Array<Maybe<CricketBallWithoutPlayerProfile>>>;
  index?: Maybe<CricketOverIndex>;
};

export type OverSummary = {
  __typename?: 'OverSummary';
  bowlers?: Maybe<Array<Maybe<OverSummaryBowlerWithoutPlayerProfile>>>;
  index?: Maybe<CricketOverIndex>;
  matchScore?: Maybe<OverSummaryScore>;
  runs?: Maybe<Scalars['Int']>;
  strikers?: Maybe<Array<Maybe<Striker>>>;
  wickets?: Maybe<Scalars['Int']>;
};

export type OverSummaryBowlerWithoutPlayerProfile = {
  __typename?: 'OverSummaryBowlerWithoutPlayerProfile';
  playerKey?: Maybe<Scalars['String']>;
  score?: Maybe<CricketBowlerScoreBreakup>;
};

export type OverSummaryScore = {
  __typename?: 'OverSummaryScore';
  reqBalls?: Maybe<Scalars['Int']>;
  reqRunRate?: Maybe<Scalars['Float']>;
  reqRuns?: Maybe<Scalars['Int']>;
  runRate?: Maybe<Scalars['Float']>;
  runs?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type OversSummaryBallsBreakup = {
  __typename?: 'OversSummaryBallsBreakup';
  dotBalls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  noBalls?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
  wides?: Maybe<Scalars['Int']>;
};

export type PlayerBattingScore = {
  __typename?: 'PlayerBattingScore';
  dismissal?: Maybe<CricketMatchPlayerDismissal>;
  score?: Maybe<BatsmanScoreBreakup>;
};

export type PlayerBowlingScore = {
  __typename?: 'PlayerBowlingScore';
  score?: Maybe<BowlerScoreBreakup>;
};

export type PlayerFantasyPerformanceBase = {
  __typename?: 'PlayerFantasyPerformanceBase';
  matchKey?: Maybe<Scalars['String']>;
  matchRank?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Float']>;
};

export type PlayerFieldingScore = {
  __typename?: 'PlayerFieldingScore';
  catches?: Maybe<Scalars['Int']>;
  runouts?: Maybe<Scalars['Int']>;
  stumpings?: Maybe<Scalars['Int']>;
};

export type PlayerReplacements = {
  __typename?: 'PlayerReplacements';
  inInnings?: Maybe<Scalars['Boolean']>;
  playerIn?: Maybe<CricketPlayerProfile>;
  playerOut?: Maybe<CricketPlayerProfile>;
  replacementReason?: Maybe<MatchPlayerReplacementReason>;
};

export type PlayersByFormat = {
  __typename?: 'PlayersByFormat';
  hundredBall?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  oneday?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  sixtyBall?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  t10?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  t20?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
  test?: Maybe<Array<Maybe<CricketPlayerProfile>>>;
};

export type PointsBreakup = {
  __typename?: 'PointsBreakup';
  metricRuleIndex?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Float']>;
  pointsStr?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  association_featured_tournaments?: Maybe<Array<Maybe<CricketTournament>>>;
  associations?: Maybe<AssociationListApiResponse>;
  associations_by_country?: Maybe<AssociationListApiResponse>;
  countries?: Maybe<CountryListApiResponse>;
  fantasy_match_credits?: Maybe<FantasyMatchCreditsApiResponse>;
  fantasy_match_points?: Maybe<FantasyMatchPointsApiResponse>;
  featured_matches?: Maybe<CricketFeaturedMatchesApiResponse>;
  featured_matches_2?: Maybe<CricketFeaturedMatchesTwoApiResponse>;
  featured_tournaments?: Maybe<Array<Maybe<CricketTournament>>>;
  grouped_tournament?: Maybe<GroupedTournamentApiResponse>;
  grouped_tournament_player_stats?: Maybe<TournamentPlayerStatsApiResponse>;
  grouped_tournament_stats?: Maybe<TournamentStatsApiResponse>;
  match?: Maybe<CricketMatchApiResponse>;
  match_ball_by_ball?: Maybe<MatchBallByBallApiResponse>;
  match_overs_summary?: Maybe<MatchOversSummaryApiResponse>;
  tournament?: Maybe<CricketTournamentApiResponse>;
  tournament_featured_matches?: Maybe<TournamentFeaturedMatchesApiResponse>;
  tournament_featured_matches_2?: Maybe<TournamentFeaturedMatchesTwoApiResponse>;
  tournament_fixtures?: Maybe<TournamentFixturesApiResponse>;
  tournament_player_stats?: Maybe<TournamentPlayerStatsApiResponse>;
  tournament_stats?: Maybe<TournamentStatsApiResponse>;
  tournament_table?: Maybe<TournamentTableApiResponse>;
  tournament_team?: Maybe<TournamentTeamApiResponse>;
};


export type QueryAssociation_Featured_TournamentsArgs = {
  filters?: InputMaybe<FeaturedTournamentsFiltersInput>;
  key: Scalars['String'];
};


export type QueryAssociationsArgs = {
  page_key?: InputMaybe<Scalars['Int']>;
};


export type QueryAssociations_By_CountryArgs = {
  country_code?: InputMaybe<Scalars['String']>;
  international?: InputMaybe<Scalars['Boolean']>;
  page_key?: InputMaybe<Scalars['String']>;
};


export type QueryCountriesArgs = {
  page_key?: InputMaybe<Scalars['Int']>;
};


export type QueryFantasy_Match_CreditsArgs = {
  key: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
};


export type QueryFantasy_Match_PointsArgs = {
  key: Scalars['String'];
  model?: InputMaybe<Scalars['String']>;
};


export type QueryGrouped_TournamentArgs = {
  key: Scalars['String'];
};


export type QueryGrouped_Tournament_Player_StatsArgs = {
  key: Scalars['String'];
  player_key: Scalars['String'];
};


export type QueryGrouped_Tournament_StatsArgs = {
  key: Scalars['String'];
};


export type QueryMatchArgs = {
  key: Scalars['String'];
};


export type QueryMatch_Ball_By_BallArgs = {
  key: Scalars['String'];
  over_key?: InputMaybe<Scalars['String']>;
};


export type QueryMatch_Overs_SummaryArgs = {
  key: Scalars['String'];
  page_key?: InputMaybe<Scalars['String']>;
};


export type QueryTournamentArgs = {
  key: Scalars['String'];
};


export type QueryTournament_Featured_MatchesArgs = {
  key: Scalars['String'];
};


export type QueryTournament_Featured_Matches_2Args = {
  key: Scalars['String'];
};


export type QueryTournament_FixturesArgs = {
  key: Scalars['String'];
};


export type QueryTournament_Player_StatsArgs = {
  key: Scalars['String'];
  player_key: Scalars['String'];
};


export type QueryTournament_StatsArgs = {
  key: Scalars['String'];
};


export type QueryTournament_TableArgs = {
  key: Scalars['String'];
};


export type QueryTournament_TeamArgs = {
  key: Scalars['String'];
  team_key: Scalars['String'];
};

export type RecentOver = {
  __typename?: 'RecentOver';
  balls?: Maybe<Array<Maybe<CricketBall>>>;
  overnumber?: Maybe<Scalars['Int']>;
};

export type RecentOverRepr = {
  __typename?: 'RecentOverRepr';
  ballRepr?: Maybe<Array<Maybe<Scalars['String']>>>;
  overNumber?: Maybe<Scalars['Int']>;
};

export type RecentPlayerBattingStats = {
  __typename?: 'RecentPlayerBattingStats';
  key: Scalars['String'];
  name: Scalars['String'];
  stats: CricketBatsmanScoreBreakup;
};

export type RecentPlayerBowlingStats = {
  __typename?: 'RecentPlayerBowlingStats';
  key: Scalars['String'];
  name: Scalars['String'];
  stats: CricketBowlerScoreBreakup;
};

export type RequiredScore = {
  __typename?: 'RequiredScore';
  balls?: Maybe<Scalars['Int']>;
  runRate?: Maybe<Scalars['Float']>;
  runs?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
};

export type ResultCounterItem = {
  __typename?: 'ResultCounterItem';
  loss?: Maybe<CounterItem>;
  win?: Maybe<CounterItem>;
};

export type ResultPredictionItem = {
  __typename?: 'ResultPredictionItem';
  team?: Maybe<Team>;
  value?: Maybe<Scalars['Float']>;
};

export type Score = {
  __typename?: 'Score';
  balls?: Maybe<Scalars['Int']>;
  msgLeadBy?: Maybe<Scalars['String']>;
  msgTrailBy?: Maybe<Scalars['String']>;
  overs?: Maybe<Array<Maybe<Scalars['Int']>>>;
  runRate?: Maybe<Scalars['Float']>;
  runs?: Maybe<Scalars['Int']>;
  title?: Maybe<Scalars['String']>;
  wickets?: Maybe<Scalars['Int']>;
};

export type ScoreBreakup = {
  __typename?: 'ScoreBreakup';
  balls?: Maybe<Scalars['Int']>;
  dotBalls?: Maybe<Scalars['Int']>;
  fours?: Maybe<Scalars['Int']>;
  runRate?: Maybe<Scalars['Float']>;
  runs?: Maybe<Scalars['Int']>;
  sixes?: Maybe<Scalars['Int']>;
};

export type ScoreReviewedBallIndex = {
  __typename?: 'ScoreReviewedBallIndex';
  ballIndex?: Maybe<Array<Maybe<Scalars['Int']>>>;
  innings?: Maybe<CricketInningsIndex>;
};

export type Striker = {
  __typename?: 'Striker';
  isDismissed?: Maybe<Scalars['Boolean']>;
  playerKey?: Maybe<Scalars['String']>;
  score?: Maybe<CricketBatsmanScoreBreakup>;
};

export enum SystemSports {
  Cricket = 'cricket',
  Football = 'football',
  Kabaddi = 'kabaddi'
}

export type Target = {
  __typename?: 'Target';
  balls?: Maybe<Scalars['Int']>;
  dlApplied?: Maybe<Scalars['Boolean']>;
  runs?: Maybe<Scalars['Int']>;
};

export type Team = {
  __typename?: 'Team';
  code?: Maybe<Scalars['String']>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TeamInsightItem = {
  __typename?: 'TeamInsightItem';
  highScore?: Maybe<Scalars['Int']>;
  lowScore?: Maybe<Scalars['Int']>;
  result?: Maybe<ResultCounterItem>;
};

export type TeamScore = {
  __typename?: 'TeamScore';
  ballCount?: Maybe<Scalars['Int']>;
  extras?: Maybe<Scalars['Int']>;
  isWicket?: Maybe<Scalars['Boolean']>;
  runs?: Maybe<Scalars['Int']>;
};

export type Tournament = {
  __typename?: 'Tournament';
  associationKey?: Maybe<Scalars['String']>;
  competition?: Maybe<CompetitionBase>;
  countries?: Maybe<Array<Maybe<Country>>>;
  gender?: Maybe<Gender>;
  isDateConfirmed?: Maybe<Scalars['Boolean']>;
  isVenueConfirmed?: Maybe<Scalars['Boolean']>;
  key?: Maybe<Scalars['String']>;
  lastScheduledMatchDate?: Maybe<Scalars['Float']>;
  metricGroup?: Maybe<MetricGroup>;
  name?: Maybe<Scalars['String']>;
  pointSystem?: Maybe<TournamentPointSystem>;
  shortName?: Maybe<Scalars['String']>;
  sport?: Maybe<SystemSports>;
  startDate?: Maybe<Scalars['Float']>;
};

export type TournamentBase = {
  __typename?: 'TournamentBase';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  shortName?: Maybe<Scalars['String']>;
};

export type TournamentFeaturedMatchesApiResponse = {
  __typename?: 'TournamentFeaturedMatchesAPIResponse';
  intelligentOrder?: Maybe<Array<Maybe<CricketMatchSummary>>>;
  matches?: Maybe<Array<Maybe<CricketMatchSummary>>>;
};

export type TournamentFeaturedMatchesTwoApiResponse = {
  __typename?: 'TournamentFeaturedMatchesTwoAPIResponse';
  intelligentOrder?: Maybe<Array<Maybe<CricketMatchBasic>>>;
  matches?: Maybe<Array<Maybe<CricketMatchBasic>>>;
};

export type TournamentFixturesApiResponse = {
  __typename?: 'TournamentFixturesAPIResponse';
  matches?: Maybe<Array<Maybe<CricketMatchBasic>>>;
  nextPageKey?: Maybe<Scalars['String']>;
  previousPageKey?: Maybe<Scalars['String']>;
};

export type TournamentGroup = {
  __typename?: 'TournamentGroup';
  key?: Maybe<Scalars['String']>;
  matches?: Maybe<Array<Maybe<TournamentMatch>>>;
  name?: Maybe<Scalars['String']>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type TournamentGroupBase = {
  __typename?: 'TournamentGroupBase';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TournamentInsightItem = {
  __typename?: 'TournamentInsightItem';
  highScore?: Maybe<Scalars['Int']>;
  lowScore?: Maybe<Scalars['Int']>;
  points?: Maybe<Scalars['Float']>;
  result?: Maybe<ResultCounterItem>;
};

export type TournamentMatch = {
  __typename?: 'TournamentMatch';
  detail?: Maybe<CricketMatchApiResponse>;
  key?: Maybe<Scalars['String']>;
};

export type TournamentPlayerStatsApiResponse = {
  __typename?: 'TournamentPlayerStatsAPIResponse';
  dataReview?: Maybe<TournamentStatsDataReview>;
  stats?: Maybe<CricketPlayerTournamentStats>;
};

export enum TournamentPointSystem {
  NoPoints = 'noPoints',
  RoundBased = 'roundBased',
  TournamentBased = 'tournamentBased'
}

export type TournamentRoundBase = {
  __typename?: 'TournamentRoundBase';
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type TournamentStatsApiResponse = {
  __typename?: 'TournamentStatsAPIResponse';
  counter?: Maybe<CricketTournamentCounter>;
  dataReview?: Maybe<TournamentStatsDataReview>;
  player?: Maybe<CricketTournamentPlayerStats>;
  players?: Maybe<Array<Maybe<CricketPlayerProfileWithTeam>>>;
  team?: Maybe<CricketTournamentTeamStats>;
  teams?: Maybe<Array<Maybe<Team>>>;
};

export type TournamentStatsDataReview = {
  __typename?: 'TournamentStatsDataReview';
  lastUpdated?: Maybe<Scalars['Float']>;
  notes?: Maybe<Scalars['String']>;
};

export type TournamentTableApiResponse = {
  __typename?: 'TournamentTableAPIResponse';
  rounds?: Maybe<Array<Maybe<CricketTournamentRoundPoints>>>;
  tournament?: Maybe<TournamentBase>;
};

export type TournamentTeamApiResponse = {
  __typename?: 'TournamentTeamAPIResponse';
  team?: Maybe<Team>;
  tournament?: Maybe<TournamentBase>;
  tournamentTeam?: Maybe<CricketTournamentTeam>;
};

export type UmpireProfileSchema = {
  __typename?: 'UmpireProfileSchema';
  key?: Maybe<Scalars['String']>;
  legalName?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  nationality?: Maybe<Country>;
};

export type Venue = {
  __typename?: 'Venue';
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Country>;
  key?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
};

export type Wicket = {
  __typename?: 'Wicket';
  player?: Maybe<CricketPlayerProfile>;
  wicketType?: Maybe<CricketWicketType>;
};

export type WicketWithoutPlayerProfile = {
  __typename?: 'WicketWithoutPlayerProfile';
  playerKey?: Maybe<Scalars['String']>;
  wicketType?: Maybe<CricketWicketType>;
};

export type CompletedMatchQueryVariables = Exact<{
  match_key: Scalars['String'];
}>;


export type CompletedMatchQuery = { __typename?: 'Query', match?: { __typename?: 'CricketMatchAPIResponse', key?: string | null, status?: MatchStatus | null, teams?: { __typename?: 'CricketTeams', a?: { __typename?: 'Team', code?: string | null, name?: string | null } | null, b?: { __typename?: 'Team', code?: string | null, name?: string | null } | null } | null, winner?: { __typename?: 'Team', name?: string | null, code?: string | null } | null, play?: { __typename?: 'CricketMatchPlayDetail', result?: { __typename?: 'CricketMatchResult', msg?: string | null } | null, innings?: Array<{ __typename?: 'CricketMatchInningsDetail', wickets?: number | null, overs?: Array<number | null> | null, score?: { __typename?: 'ScoreBreakup', runs?: number | null } | null } | null> | null } | null } | null };

export type MatchCompltedDataQueryVariables = Exact<{
  match_key: Scalars['String'];
}>;


export type MatchCompltedDataQuery = { __typename?: 'Query', match?: { __typename?: 'CricketMatchAPIResponse', key?: string | null, startAt?: number | null, status?: MatchStatus | null, teams?: { __typename?: 'CricketTeams', a?: { __typename?: 'Team', code?: string | null, name?: string | null } | null, b?: { __typename?: 'Team', code?: string | null, name?: string | null } | null } | null, tournament?: { __typename?: 'TournamentBase', name?: string | null } | null, winner?: { __typename?: 'Team', name?: string | null, code?: string | null } | null } | null };

export type CreditQueryQueryVariables = Exact<{
  match_key: Scalars['String'];
}>;


export type CreditQueryQuery = { __typename?: 'Query', fantasy_match_credits?: { __typename?: 'FantasyMatchCreditsAPIResponse', teams?: Array<{ __typename?: 'Team', key?: string | null, code?: string | null, name?: string | null } | null> | null, players?: Array<{ __typename?: 'CricketPlayerProfileWithTeam', key?: string | null, name?: string | null, seasonalRole?: CricketPlayerRole | null, team?: { __typename?: 'Team', code?: string | null, key?: string | null, name?: string | null } | null } | null> | null, credits?: Array<{ __typename?: 'FantasyPlayerCredits', tournamentPoints?: number | null, value?: number | null, player?: { __typename?: 'CricketPlayerProfileWithTeam', key?: string | null } | null } | null> | null } | null };


export const CompletedMatchDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CompletedMatch"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"match_key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"match"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"match_key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"a"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"b"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"winner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}},{"kind":"Field","name":{"kind":"Name","value":"play"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"result"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"msg"}}]}},{"kind":"Field","name":{"kind":"Name","value":"innings"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"score"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"runs"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wickets"}},{"kind":"Field","name":{"kind":"Name","value":"overs"}}]}}]}}]}}]}}]} as unknown as DocumentNode<CompletedMatchQuery, CompletedMatchQueryVariables>;
export const MatchCompltedDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"MatchCompltedData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"match_key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"match"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"match_key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"startAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"a"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"b"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"tournament"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"winner"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"code"}}]}}]}}]}}]} as unknown as DocumentNode<MatchCompltedDataQuery, MatchCompltedDataQueryVariables>;
export const CreditQueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"CreditQuery"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"match_key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"fantasy_match_credits"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"match_key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"teams"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"players"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"team"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"code"}},{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"seasonalRole"}}]}},{"kind":"Field","name":{"kind":"Name","value":"credits"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tournamentPoints"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]}}]} as unknown as DocumentNode<CreditQueryQuery, CreditQueryQueryVariables>;