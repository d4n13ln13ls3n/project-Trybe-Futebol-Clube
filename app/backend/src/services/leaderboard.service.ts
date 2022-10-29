/* eslint-disable class-methods-use-this */
import { Leaderboard, Match, Team } from '../interfaces';
import MatchModel from '../database/models/Matches';
import Teams from '../database/models/Teams';
import getTeamData from '../utils/helperGeneralLeaderboard';
import getTeamDataHome from '../utils/helperHomeLeaderboard';
import getTeamDataAway from '../utils/helperAwayLeaderboard';

export default class MatchService {
  async getHomeLeaderboard(): Promise<Leaderboard[]> {
    const matches = await MatchModel.findAll({
      include: [
        { model: Teams,
          as: 'teamHome',
          attributes: { exclude: ['id'] },
        },
        { model: Teams,
          as: 'teamAway',
          attributes: { exclude: ['id'] },
        },
      ],
    });
    const teams = await Teams.findAll();
    const filteredMatches = matches.filter((match) => match.inProgress === false);
    const homeLeaderboard = getTeamDataHome(teams, filteredMatches);
    return homeLeaderboard;
  }

  async getAwayLeaderboard(matches: Match[], teams: Team[]): Promise<Leaderboard[]> {
    const awayLeaderboard = getTeamDataAway(teams, matches);
    return awayLeaderboard;
  }

  async getGeneralLeaderboard(matches: Match[], teams: Team[]): Promise<Leaderboard[]> {
    const generalLeaderboard = getTeamData(teams, matches);
    return generalLeaderboard;
  }
}

// const homeTeamsIds = getHomeTeamsIds(matches);
// const homeTeamsNames = await homeTeamsIds.map((homeTeamsId) => Teams.findByPk(homeTeamsId));
// const objectIds = homeTeamsIds.forEach((homeTeamsId) => [{ id: homeTeamsId }]);
// const objectNames = homeTeamsNames.forEach((homeTeamsName) => [{ teamName: homeTeamsName }]);
// const homeLeaderboard = await getTeamData(homeTeams, matches);
// return homeLeaderboard;
