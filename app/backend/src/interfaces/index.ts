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
  inProgress: number;
}

export interface MatchDTO {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: number;
  teamHome: {
    teamName: string;
  },
  teamAway: {
    teamName: string;
  }
}
