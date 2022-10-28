// import { Leaderboard, MatchDTO, Team } from '../interfaces';

// function getTotalGames(teamId: number, matches: MatchDTO[]) {
//   let gamesPlayed = 0;
//   matches.forEach((match) => {
//     if (match.homeTeam === teamId || match.awayTeam === teamId) gamesPlayed += 1;
//   });
//   return gamesPlayed;
// }

// function getTotalVictories(teamId: number, matches: MatchDTO[]) {
//   let totalWins = 0;
//   matches.forEach((match) => {
//     if (match.homeTeam === teamId && match.homeTeamGoals > match.awayTeamGoals) totalWins += 1;
//     if (match.awayTeam === teamId && match.awayTeamGoals > match.homeTeamGoals) totalWins += 1;
//   });
//   return totalWins;
// }

// function getTotalDraws(teamId: number, matches: MatchDTO[]) {
//   let totalTies = 0;
//   matches.forEach((match) => {
//     if (match.homeTeam === teamId && match.homeTeamGoals === match.awayTeamGoals) totalTies += 1;
//     if (match.awayTeam === teamId && match.awayTeamGoals === match.homeTeamGoals) totalTies += 1;
//   });
//   return totalTies;
// }

// function getTotalLosses(teamId: number, matches: MatchDTO[]) {
//   let totalLosses = 0;
//   matches.forEach((match) => {
//     if (match.homeTeam === teamId && match.homeTeamGoals < match.awayTeamGoals) totalLosses += 1;
//     if (match.awayTeam === teamId && match.awayTeamGoals < match.homeTeamGoals) totalLosses += 1;
//   });
//   return totalLosses;
// }

// function getTotalPoints(teamId: number, matches: MatchDTO[]) {
//   const totalPoints = (getTotalVictories(teamId, matches) * 3) + (getTotalDraws(teamId, matches));
//   return totalPoints;
// }

// function getGoalsFavor(teamId: number, matches: MatchDTO[]) {
//   let scoredGoals = 0;
//   matches.forEach((match) => {
//     if (match.homeTeam === teamId) scoredGoals += match.homeTeamGoals;
//     if (match.awayTeam === teamId) scoredGoals += match.awayTeamGoals;
//   });
//   return scoredGoals;
// }

// function getSufferedGoals(teamId: number, matches: MatchDTO[]) {
//   let sufferedGoals = 0;
//   matches.forEach((match) => {
//     if (match.homeTeam === teamId) sufferedGoals += match.awayTeamGoals;
//     if (match.awayTeam === teamId) sufferedGoals += match.homeTeamGoals;
//   });
//   return sufferedGoals;
// }

// function getGoalsSurplus(teamId: number, matches: MatchDTO[]) {
//   const goalSurplus = getGoalsFavor(teamId, matches) - getSufferedGoals(teamId, matches);
//   return goalSurplus;
// }

// function getEfficiency(teamId: number, matches: MatchDTO[]) {
//   const totalPoints = getTotalPoints(teamId, matches);
//   const totalGames = getTotalGames(teamId, matches);
//   const efficiency = (totalPoints / (totalGames * 3)) * 100;

//   return efficiency;
// }

// function sortLeaderboard(leaderboard: Leaderboard[]) {
//   const sortLeaderboard = leaderboard.sort((team1, team2) => {
//     if (team1.totalPoints !== team2.totalPoints) return team2.totalPoints - team1.totalPoints;
//     if (team1.totalVictories !== team2.totalVictories) {
//       return team2.totalVictories - team1.totalVictories;
//     }
//     if (team1.goalsBalance !== team2.goalsBalance) return team2.goalsBalance - team1.goalsBalance;
//     if (team1.goalsFavor !== team2.goalsFavor) return team2.goalsFavor - team1.goalsFavor;
//     return team2.goalsOwn - team1.goalsOwn;
//   });
//   return sortLeaderboard;
// }

// fazer função pra listar hometeams and awayteams

// export default function getTeamData(teams: Team[], matches: MatchDTO[]): Leaderboard {
//   const teamsData = teams.map(({ id, teamName }) => {
//     const teamData = {
//       name: teamName,
//       totalPoints: getTotalPoints(id, matches),
//       totalGames: getTotalGames(id, matches),
//       totalVictories: getTotalVictories(id, matches),
//       totalDraws: getTotalDraws(id, matches),
//       totalLosses: getTotalLosses(id, matches),
//       goalsFavor: getGoalsFavor(id, matches),
//       goalsOwn: getSufferedGoals(id, matches),
//       goalsBalance: getGoalsSurplus(id, matches),
//       efficiency: getEfficiency(id, matches),
//     };
//     return teamData;
//   });
// return teamsData;
// }
