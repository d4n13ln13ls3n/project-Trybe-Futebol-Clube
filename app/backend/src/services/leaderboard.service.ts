/* eslint-disable class-methods-use-this */
import { Leaderboard } from '../interfaces';
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

  async getAwayLeaderboard(): Promise<Leaderboard[]> {
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
    const awayLeaderboard = getTeamDataAway(teams, filteredMatches);
    return awayLeaderboard;
  }

  async getGeneralLeaderboard(): Promise<Leaderboard[]> {
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
    const generalLeaderboard = getTeamData(teams, filteredMatches);
    return generalLeaderboard;
  }
}
