// import { Request } from 'express';

export interface AuthenticationCredentials {
  email: string;
  password: string;
}

export interface CreateUserRequestBody {
  username: string;
  classe: string;
  level: number;
  password: string;
}

export interface User {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

export interface Team {
  id: number;
  teamName: string;
}

export interface TeamPayload {
  teamName: string;
}

export interface JWTPayload {
  id: number;
  username: string;
}

export interface Match {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface MatchDTO {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string;
  }
}

export interface MatchPayload {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export interface Filter {
  inProgress: boolean;
}

export interface Leaderboard {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
}

export interface ScorePayload {
  homeTeamGoals: number;
  awayTeamGoals: number;
}
