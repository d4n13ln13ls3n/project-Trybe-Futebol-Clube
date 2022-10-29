import { Leaderboard, Match, Team } from '../interfaces';

function getTotalGamesAway(teamId: number, matches: Match[]) {
  let gamesPlayed = 0;
  matches.forEach((match) => {
    if (match.awayTeam === teamId) gamesPlayed += 1;
  });
  return gamesPlayed;
}

function getTotalVictoriesAway(teamId: number, matches: Match[]) {
  let totalWins = 0;
  matches.forEach((match) => {
    if (match.awayTeam === teamId && match.awayTeamGoals > match.homeTeamGoals) totalWins += 1;
  });
  return totalWins;
}

function getTotalDrawsAway(teamId: number, matches: Match[]) {
  let totalTies = 0;
  matches.forEach((match) => {
    if (match.awayTeam === teamId && match.awayTeamGoals === match.homeTeamGoals) totalTies += 1;
  });
  return totalTies;
}

function getTotalLossesAway(teamId: number, matches: Match[]) {
  let totalLosses = 0;
  matches.forEach((match) => {
    if (match.awayTeam === teamId && match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
  });
  return totalLosses;
}

function getTotalPointsAway(teamId: number, matches: Match[]) {
  const totalPoints = (getTotalVictoriesAway(teamId, matches) * 3)
  + (getTotalDrawsAway(teamId, matches));
  return totalPoints;
}

function getGoalsFavorAway(teamId: number, matches: Match[]) {
  let scoredGoals = 0;
  matches.forEach((match) => {
    if (match.awayTeam === teamId) scoredGoals += match.awayTeamGoals;
  });
  return scoredGoals;
}

function getSufferedGoalsAway(teamId: number, matches: Match[]) {
  let sufferedGoals = 0;
  matches.forEach((match) => {
    if (match.awayTeam === teamId) sufferedGoals += match.homeTeamGoals;
  });
  return sufferedGoals;
}

function getGoalsSurplusAway(teamId: number, matches: Match[]) {
  const goalSurplus = getGoalsFavorAway(teamId, matches) - getSufferedGoalsAway(teamId, matches);
  return goalSurplus;
}

function getEfficiencyAway(teamId: number, matches: Match[]) {
  const totalPoints = getTotalPointsAway(teamId, matches);
  const totalGames = getTotalGamesAway(teamId, matches);
  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return efficiency;
}

function sortLeaderboardAway(leaderboard: Leaderboard[]) {
  const sortLeaderboard = leaderboard.sort((team1, team2) => {
    if (team1.totalPoints !== team2.totalPoints) return team2.totalPoints - team1.totalPoints;
    if (team1.totalVictories !== team2.totalVictories) {
      return team2.totalVictories - team1.totalVictories;
    }
    if (team1.goalsBalance !== team2.goalsBalance) return team2.goalsBalance - team1.goalsBalance;
    if (team1.goalsFavor !== team2.goalsFavor) return team2.goalsFavor - team1.goalsFavor;
    return team2.goalsOwn - team1.goalsOwn;
  });
  return sortLeaderboard;
}

export function getAwayTeamsIds(matches: Match[]): number[] {
  const awayTeamsIds = matches.map((match) => match.awayTeam);
  return awayTeamsIds;
}

export default function getTeamDataAway(teams: Team[], matches: Match[]): Leaderboard[] {
  const teamsData = teams.map(({ id, teamName }) => {
    const teamData = {
      name: teamName,
      totalPoints: getTotalPointsAway(id, matches),
      totalGames: getTotalGamesAway(id, matches),
      totalVictories: getTotalVictoriesAway(id, matches),
      totalDraws: getTotalDrawsAway(id, matches),
      totalLosses: getTotalLossesAway(id, matches),
      goalsFavor: getGoalsFavorAway(id, matches),
      goalsOwn: getSufferedGoalsAway(id, matches),
      goalsBalance: getGoalsSurplusAway(id, matches),
      efficiency: getEfficiencyAway(id, matches),
    };
    return teamData;
  });
  return sortLeaderboardAway(teamsData);
}
