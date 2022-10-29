import { Leaderboard, Match, Team } from '../interfaces';

function getTotalGamesHome(teamId: number, matches: Match[]) {
  let gamesPlayed = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId) gamesPlayed += 1;
  });
  return gamesPlayed;
}

function getTotalVictoriesHome(teamId: number, matches: Match[]) {
  let totalWins = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals > match.awayTeamGoals) totalWins += 1;
  });
  return totalWins;
}

function getTotalDrawsHome(teamId: number, matches: Match[]) {
  let totalTies = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals === match.awayTeamGoals) totalTies += 1;
  });
  return totalTies;
}

function getTotalLossesHome(teamId: number, matches: Match[]) {
  let totalLosses = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId && match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
  });
  return totalLosses;
}

function getTotalPointsHome(teamId: number, matches: Match[]) {
  const totalPoints = (getTotalVictoriesHome(teamId, matches) * 3)
  + (getTotalDrawsHome(teamId, matches));
  return totalPoints;
}

function getGoalsFavorHome(teamId: number, matches: Match[]) {
  let scoredGoals = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId) scoredGoals += match.homeTeamGoals;
  });
  return scoredGoals;
}

function getSufferedGoalsHome(teamId: number, matches: Match[]) {
  let sufferedGoals = 0;
  matches.forEach((match) => {
    if (match.homeTeam === teamId) sufferedGoals += match.awayTeamGoals;
  });
  return sufferedGoals;
}

function getGoalsSurplusHome(teamId: number, matches: Match[]) {
  const goalSurplus = getGoalsFavorHome(teamId, matches) - getSufferedGoalsHome(teamId, matches);
  return goalSurplus;
}

function getEfficiencyHome(teamId: number, matches: Match[]) {
  const totalPoints = getTotalPointsHome(teamId, matches);
  const totalGames = getTotalGamesHome(teamId, matches);
  const efficiency = (totalPoints / (totalGames * 3)) * 100;

  return efficiency;
}

function sortLeaderboardHome(leaderboard: Leaderboard[]) {
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

export function getHomeTeamsIds(matches: Match[]): number[] {
  const homeTeamsIds = matches.map((match) => match.homeTeam);
  return homeTeamsIds;
}

export default function getTeamDataHome(teams: Team[], matches: Match[]): Leaderboard[] {
  const teamsData = teams.map(({ id, teamName }) => {
    const teamData = {
      name: teamName,
      totalPoints: getTotalPointsHome(id, matches),
      totalGames: getTotalGamesHome(id, matches),
      totalVictories: getTotalVictoriesHome(id, matches),
      totalDraws: getTotalDrawsHome(id, matches),
      totalLosses: getTotalLossesHome(id, matches),
      goalsFavor: getGoalsFavorHome(id, matches),
      goalsOwn: getSufferedGoalsHome(id, matches),
      goalsBalance: getGoalsSurplusHome(id, matches),
      efficiency: getEfficiencyHome(id, matches),
    };
    return teamData;
  });
  return sortLeaderboardHome(teamsData);
}
